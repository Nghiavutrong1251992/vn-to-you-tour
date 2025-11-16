# ================================================
# VN to You Tour - Upload to R2 with Custom Domain
# ================================================

param(
    [string]$R2Domain = "pub-78ce1b03a58f41af8c07b897b9438589.r2.dev",
    [string]$SourcePath = "assets\images",
    [switch]$DryRun = $false
)

Write-Host "🚀 VN to You Tour - Upload to R2 Custom Domain" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Gray

# Colors
function Write-Success($msg) { Write-Host "✅ $msg" -ForegroundColor Green }
function Write-Warning($msg) { Write-Host "⚠️ $msg" -ForegroundColor Yellow }
function Write-Info($msg) { Write-Host "ℹ️ $msg" -ForegroundColor Blue }
function Write-Error($msg) { Write-Host "❌ $msg" -ForegroundColor Red }

Write-Info "Target R2 Domain: $R2Domain"
Write-Info "Source Path: $SourcePath"
Write-Info "Dry Run: $DryRun"

# Check if we can determine the bucket name from the custom domain
# For pub-* domains, we need to find the actual bucket name
Write-Warning "Note: With custom domain, we need to know the actual bucket name"
Write-Info "You can find bucket name in Cloudflare Dashboard > R2"

# Get image files
$imageExtensions = @('.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico')
$imageFiles = Get-ChildItem $SourcePath -Recurse -File | Where-Object {
    $imageExtensions -contains $_.Extension.ToLower()
}

Write-Info "Found $($imageFiles.Count) image files to upload"

# Calculate total size
$totalSizeMB = ($imageFiles | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Info "Total size: $([math]::Round($totalSizeMB, 2)) MB"

if ($DryRun) {
    Write-Host "`n📋 Files that would be uploaded:" -ForegroundColor Cyan
    foreach ($file in $imageFiles | Select-Object -First 10) {
        $relativePath = $file.FullName.Replace((Resolve-Path $SourcePath).Path + "\", "").Replace("\", "/")
        $finalUrl = "https://$R2Domain/$relativePath"
        Write-Host "  📤 $relativePath" -ForegroundColor Gray
        Write-Host "     → $finalUrl" -ForegroundColor Blue
    }
    
    if ($imageFiles.Count -gt 10) {
        Write-Host "  ... and $($imageFiles.Count - 10) more files" -ForegroundColor Gray
    }
    
    Write-Host "`n💡 To proceed with actual upload:" -ForegroundColor Cyan
    Write-Host "1. Find your bucket name in Cloudflare Dashboard" -ForegroundColor White
    Write-Host "2. Use: wrangler r2 object put BUCKET_NAME/path/to/image.jpg --file='local/path/image.jpg'" -ForegroundColor White
    Write-Host "3. Or use the upload-to-r2.ps1 script with correct bucket name" -ForegroundColor White
    
} else {
    Write-Error "Manual upload required!"
    Write-Host "`nTo upload manually:" -ForegroundColor Yellow
    Write-Host "1. Get your bucket name from Cloudflare Dashboard" -ForegroundColor White
    Write-Host "2. Run this command for each file:" -ForegroundColor White
    Write-Host "   wrangler r2 object put YOUR_BUCKET_NAME/path/image.jpg --file='assets/images/path/image.jpg'" -ForegroundColor Gray
    
    # Show example commands for first few files
    Write-Host "`n📋 Example commands:" -ForegroundColor Cyan
    foreach ($file in $imageFiles | Select-Object -First 5) {
        $relativePath = $file.FullName.Replace((Resolve-Path $SourcePath).Path + "\", "").Replace("\", "/")
        Write-Host "wrangler r2 object put YOUR_BUCKET_NAME/$relativePath --file='$($file.FullName)'" -ForegroundColor White
    }
    
    if ($imageFiles.Count -gt 5) {
        Write-Host "... and $($imageFiles.Count - 5) more files" -ForegroundColor Gray
    }
}

# Test URL access
Write-Host "`n🔍 Testing domain access..." -ForegroundColor Cyan
try {
    # Try to access the domain root
    $response = Invoke-WebRequest -Uri "https://$R2Domain" -Method Head -TimeoutSec 10 -ErrorAction SilentlyContinue
    Write-Success "Domain is accessible"
} catch {
    Write-Warning "Cannot test domain access (this might be normal)"
    Write-Info "Error: $($_.Exception.Message)"
}

Write-Host "`n📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Upload images using wrangler CLI or Dashboard" -ForegroundColor White  
Write-Host "2. Test image URLs: https://$R2Domain/path/to/image.jpg" -ForegroundColor White
Write-Host "3. Run URL update script: .\update-urls.ps1 -R2Domain $R2Domain" -ForegroundColor White
Write-Host "4. Test website with new image URLs" -ForegroundColor White

Write-Host "`n✨ Ready to proceed with R2 migration!" -ForegroundColor Green