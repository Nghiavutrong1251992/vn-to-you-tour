# ================================================
# VN to You Tour - Cloudflare R2 Upload Script
# ================================================

param(
    [string]$BucketName = "vn-to-you-tour-images",
    [string]$SourcePath = "assets\images",
    [switch]$DryRun = $false,
    [switch]$Optimize = $true
)

Write-Host "🚀 VN to You Tour - Cloudflare R2 Upload Script" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Gray

# Configuration
$BUCKET_NAME = $BucketName
$SOURCE_DIR = $SourcePath
$BACKUP_DIR = "images_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"

# Colors for output
function Write-Success($msg) { Write-Host "✅ $msg" -ForegroundColor Green }
function Write-Warning($msg) { Write-Host "⚠️  $msg" -ForegroundColor Yellow }
function Write-Error($msg) { Write-Host "❌ $msg" -ForegroundColor Red }
function Write-Info($msg) { Write-Host "ℹ️  $msg" -ForegroundColor Blue }

# Check if Wrangler is installed
try {
    $wranglerVersion = wrangler --version 2>$null
    Write-Success "Wrangler CLI detected: $wranglerVersion"
} catch {
    Write-Error "Wrangler CLI not found. Please install: npm install -g wrangler"
    exit 1
}

# Check if logged in
try {
    $whoami = wrangler whoami 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Not logged in to Cloudflare. Please run: wrangler login"
        Write-Info "Or set CLOUDFLARE_API_TOKEN environment variable"
        exit 1
    }
    Write-Success "Logged in to Cloudflare"
} catch {
    Write-Warning "Cannot verify Cloudflare login status"
}

# Function to get file size in MB
function Get-FileSizeMB($file) {
    return [math]::Round($file.Length / 1MB, 2)
}

# Function to optimize images (placeholder)
function Optimize-Image($filePath) {
    if (-not $Optimize) { return $filePath }
    
    Write-Info "Optimizing: $($filePath.Name)"
    # TODO: Add actual image optimization here
    # Could use ImageMagick, or online services
    return $filePath
}

# Create backup before upload
if (-not $DryRun) {
    Write-Info "Creating backup to: $BACKUP_DIR"
    Copy-Item $SOURCE_DIR $BACKUP_DIR -Recurse
    Write-Success "Backup created"
}

# Get all image files
$imageExtensions = @('.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico')
$imageFiles = Get-ChildItem $SOURCE_DIR -Recurse -File | Where-Object {
    $imageExtensions -contains $_.Extension.ToLower()
}

Write-Info "Found $($imageFiles.Count) image files"

# Calculate total size
$totalSizeMB = ($imageFiles | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Info "Total size: $([math]::Round($totalSizeMB, 2)) MB"

if ($totalSizeMB -gt 100) {
    Write-Warning "Large upload detected. This might take a while and could incur costs."
    $confirm = Read-Host "Continue? (y/N)"
    if ($confirm -ne 'y' -and $confirm -ne 'Y') {
        Write-Info "Upload cancelled"
        exit 0
    }
}

# Upload files
$successCount = 0
$errorCount = 0
$skippedCount = 0

Write-Host "`n🔄 Starting upload process..." -ForegroundColor Cyan

foreach ($file in $imageFiles) {
    try {
        # Calculate relative path from source directory
        $relativePath = $file.FullName.Replace((Resolve-Path $SOURCE_DIR).Path + "\", "").Replace("\", "/")
        $r2Path = $relativePath
        
        Write-Host "📤 Uploading: $relativePath" -ForegroundColor White
        
        if ($DryRun) {
            Write-Host "   [DRY RUN] Would upload to: $BUCKET_NAME/$r2Path" -ForegroundColor Gray
            $successCount++
            continue
        }
        
        # Optimize image if enabled
        $optimizedFile = Optimize-Image $file
        
        # Upload to R2
        $uploadCmd = "wrangler r2 object put $BUCKET_NAME/$r2Path --file=`"$($file.FullName)`""
        Invoke-Expression $uploadCmd
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "   Uploaded: $r2Path ($(Get-FileSizeMB $file) MB)"
            $successCount++
        } else {
            Write-Error "   Failed: $r2Path"
            $errorCount++
        }
        
        # Small delay to avoid rate limiting
        Start-Sleep -Milliseconds 100
        
    } catch {
        Write-Error "   Error uploading $($file.Name): $($_.Exception.Message)"
        $errorCount++
    }
}

# Summary
Write-Host "`n📊 Upload Summary:" -ForegroundColor Cyan
Write-Host "=" * 30 -ForegroundColor Gray
Write-Success "Successful uploads: $successCount"
if ($errorCount -gt 0) { Write-Error "Failed uploads: $errorCount" }
if ($skippedCount -gt 0) { Write-Warning "Skipped files: $skippedCount" }

if ($DryRun) {
    Write-Info "This was a dry run. No files were actually uploaded."
    Write-Info "Run without -DryRun to perform actual upload."
}

# Generate R2 URLs sample
Write-Host "`n🔗 Sample R2 URLs:" -ForegroundColor Cyan
Write-Host "After upload, your images will be accessible at:" -ForegroundColor Gray
Write-Host "https://[account-id].r2.cloudflarestorage.com/$BUCKET_NAME/[image-path]" -ForegroundColor White
Write-Host "`nExample:" -ForegroundColor Gray
Write-Host "https://[account-id].r2.cloudflarestorage.com/$BUCKET_NAME/general/logo.png" -ForegroundColor White

# Next steps
Write-Host "`n📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Verify uploads: wrangler r2 object list $BUCKET_NAME" -ForegroundColor White
Write-Host "2. Test access: Check if images load from R2 URLs" -ForegroundColor White
Write-Host "3. Update code: Replace local paths with R2 URLs" -ForegroundColor White
Write-Host "4. Setup custom domain (optional)" -ForegroundColor White
Write-Host "5. Delete local images after verification" -ForegroundColor White

Write-Host "`n✨ Upload completed!" -ForegroundColor Green