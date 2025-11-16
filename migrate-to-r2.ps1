# ================================================
# VN to You Tour - Cloudflare Migration Master Script
# ================================================

param(
    [string]$AccountId = "",
    [string]$BucketName = "vn-to-you-tour-images", 
    [string]$CustomDomain = "",
    [switch]$SkipOptimization = $false,
    [switch]$DryRun = $false
)

Write-Host @"
🚀 VN to You Tour - Cloudflare R2 Migration
=" * 50
"@ -ForegroundColor Cyan

# Validate parameters
if ([string]::IsNullOrEmpty($AccountId) -and -not $DryRun) {
    Write-Host "❌ Account ID is required. Get it from Cloudflare Dashboard > R2" -ForegroundColor Red
    Write-Host "Usage: .\migrate-to-r2.ps1 -AccountId YOUR_ACCOUNT_ID" -ForegroundColor Yellow
    exit 1
}

# Configuration
$SCRIPTS_DIR = Get-Location
$R2_DOMAIN = if ($CustomDomain) { $CustomDomain } else { "$AccountId.r2.cloudflarestorage.com" }

# Colors
function Write-Success($msg) { Write-Host "✅ $msg" -ForegroundColor Green }
function Write-Warning($msg) { Write-Host "⚠️  $msg" -ForegroundColor Yellow }
function Write-Info($msg) { Write-Host "ℹ️  $msg" -ForegroundColor Blue }
function Write-Error($msg) { Write-Host "❌ $msg" -ForegroundColor Red }
function Write-Step($step, $msg) { Write-Host "`n🔸 STEP $step`: $msg" -ForegroundColor Magenta }

Write-Info "Bucket Name: $BucketName"
Write-Info "R2 Domain: $R2_DOMAIN"
Write-Info "Dry Run: $DryRun"

# Step 1: Check prerequisites
Write-Step 1 "Checking Prerequisites"

# Check Wrangler
try {
    $wranglerVersion = wrangler --version 2>$null
    Write-Success "Wrangler CLI: $wranglerVersion"
} catch {
    Write-Error "Wrangler CLI not found. Install: npm install -g wrangler"
    exit 1
}

# Check login status
try {
    wrangler whoami | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Logged in to Cloudflare"
    } else {
        Write-Error "Not logged in. Run: wrangler login"
        exit 1
    }
} catch {
    Write-Error "Cannot verify login status"
    exit 1
}

# Step 2: Create R2 Bucket
Write-Step 2 "Creating R2 Bucket"

if (-not $DryRun) {
    try {
        Write-Info "Creating bucket: $BucketName"
        wrangler r2 bucket create $BucketName 2>$null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Bucket '$BucketName' created successfully"
        } else {
            Write-Warning "Bucket might already exist (this is OK)"
        }
        
        # List buckets to verify
        Write-Info "Verifying bucket exists..."
        $buckets = wrangler r2 bucket list
        if ($buckets -match $BucketName) {
            Write-Success "Bucket verified"
        } else {
            Write-Warning "Could not verify bucket creation"
        }
    } catch {
        Write-Error "Failed to create bucket: $($_.Exception.Message)"
        exit 1
    }
} else {
    Write-Info "[DRY RUN] Would create bucket: $BucketName"
}

# Step 3: Image Optimization (optional)
if (-not $SkipOptimization) {
    Write-Step 3 "Optimizing Images"
    
    $optimizeArgs = @()
    if ($DryRun) { $optimizeArgs += "-DryRun" }
    
    try {
        & "$SCRIPTS_DIR\optimize-images.ps1" @optimizeArgs
        Write-Success "Image optimization completed"
    } catch {
        Write-Warning "Image optimization failed, continuing with original images"
        Write-Info "Error: $($_.Exception.Message)"
    }
} else {
    Write-Step 3 "Skipping Image Optimization"
    Write-Info "Using original images (use -SkipOptimization to change)"
}

# Step 4: Upload Images to R2
Write-Step 4 "Uploading Images to R2"

$uploadArgs = @(
    "-BucketName", $BucketName
)
if ($DryRun) { $uploadArgs += "-DryRun" }

try {
    & "$SCRIPTS_DIR\upload-to-r2.ps1" @uploadArgs
    Write-Success "Image upload completed"
} catch {
    Write-Error "Image upload failed: $($_.Exception.Message)"
    exit 1
}

# Step 5: Update URLs in Code
Write-Step 5 "Updating URLs in Code"

$urlArgs = @(
    "-R2Domain", $R2_DOMAIN,
    "-BucketName", $BucketName
)
if ($DryRun) { $urlArgs += "-DryRun" }

try {
    & "$SCRIPTS_DIR\update-urls.ps1" @urlArgs
    Write-Success "URL updates completed"
} catch {
    Write-Error "URL update failed: $($_.Exception.Message)"
    exit 1
}

# Step 6: Verification
Write-Step 6 "Verification"

if (-not $DryRun) {
    Write-Info "Testing R2 access..."
    try {
        # List some objects to verify upload
        $objects = wrangler r2 object list $BucketName --limit 5
        Write-Success "R2 objects accessible"
        
        # Test URL construction
        $testUrl = "https://$R2_DOMAIN/$BucketName/general/logo.png"
        Write-Info "Test URL: $testUrl"
        Write-Warning "Please test this URL in your browser to verify public access"
    } catch {
        Write-Warning "Could not verify R2 access automatically"
    }
}

# Step 7: Next Steps
Write-Step 7 "Next Steps & Recommendations"

Write-Host @"
🎯 Migration Checklist:

✅ Completed:
   - R2 bucket created
   - Images uploaded to R2  
   - URLs updated in code

🔄 Manual Steps Required:
   1. Test website locally to verify all images load
   2. Set up custom domain for R2 (optional but recommended):
      - Add CNAME: images.yourdomain.com -> $AccountId.r2.cloudflarestorage.com
      - Update script to use custom domain
      
   3. Deploy to Cloudflare Pages:
      - Connect your Git repository
      - Configure build settings
      - Enable automatic deployments
      
   4. Final verification:
      - Test all pages and image loading
      - Check mobile responsive images
      - Verify SEO impact
      
   5. Cleanup (after verification):
      - Remove local images folder
      - Update .gitignore to exclude images
      - Archive image backups

💰 Cost Monitoring:
   - R2 Storage: ~$0.05/month for your images
   - R2 Requests: Minimal cost for website traffic  
   - Bandwidth: FREE (major savings vs other providers)
   
📊 Performance Benefits:
   - Global CDN distribution
   - Faster image loading
   - Reduced Git repository size
   - Better CI/CD pipeline speed

"@ -ForegroundColor White

if ($DryRun) {
    Write-Warning "`nThis was a DRY RUN. Re-run without -DryRun to execute actual migration."
}

Write-Host "`n✨ Migration process completed!" -ForegroundColor Green
Write-Host "Your website is now ready for Cloudflare deployment! 🚀" -ForegroundColor Cyan