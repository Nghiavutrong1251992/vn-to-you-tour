# Manual Image Optimization Guide for VN TO YOU Website

Write-Host "=== VN TO YOU - Image Optimization Guide ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "Current total image size: 77.54 MB (too large!)" -ForegroundColor Red
Write-Host "Target size: Under 20 MB" -ForegroundColor Green
Write-Host ""

Write-Host "📊 Largest files that need optimization:" -ForegroundColor Yellow

# Top 10 largest files
Get-ChildItem -Recurse assets/images/ -Include *.jpg,*.png | Sort-Object Length -Descending | Select-Object -First 10 | ForEach-Object {
    $sizeMB = [math]::Round($_.Length/1MB,2)
    Write-Host "   🔸 $($_.Name): $sizeMB MB" -ForegroundColor White
}

Write-Host ""
Write-Host "🛠️ Quick optimization options:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Online Tools (Recommended):" -ForegroundColor Cyan
Write-Host "   • TinyPNG: https://tinypng.com/ (PNG/JPG up to 5MB)" -ForegroundColor White
Write-Host "   • Squoosh: https://squoosh.app/ (Google tool, no size limit)" -ForegroundColor White
Write-Host "   • CompressJPEG: https://compressjpeg.com/" -ForegroundColor White
Write-Host ""
Write-Host "2. Batch Processing:" -ForegroundColor Cyan
Write-Host "   • Resize team photos to max 800x600px" -ForegroundColor White
Write-Host "   • Compress JPEG quality to 70-80%" -ForegroundColor White
Write-Host "   • Convert PNG to JPG if no transparency needed" -ForegroundColor White
Write-Host ""
Write-Host "3. Priority Files (optimize these first):" -ForegroundColor Cyan
Write-Host "   • thong.png (5.68 MB) -> should be ~500KB" -ForegroundColor White
Write-Host "   • intan.png (4.33 MB) -> should be ~400KB" -ForegroundColor White
Write-Host "   • thanh-ngan.png (1.87 MB) -> should be ~200KB" -ForegroundColor White
Write-Host "   • All TTAA event photos -> should be ~300KB each" -ForegroundColor White
Write-Host ""

# Create directories for organized optimization
$optimizedDir = "assets/images/optimized"
if (!(Test-Path $optimizedDir)) {
    New-Item -ItemType Directory -Path $optimizedDir -Force
    Write-Host "✅ Created 'optimized' folder for compressed images" -ForegroundColor Green
}

$teamDir = "$optimizedDir/team"
if (!(Test-Path $teamDir)) {
    New-Item -ItemType Directory -Path $teamDir -Force
}

$articlesDir = "$optimizedDir/articles"
if (!(Test-Path $articlesDir)) {
    New-Item -ItemType Directory -Path $articlesDir -Force
}

Write-Host ""
Write-Host "📁 Created optimization folders:" -ForegroundColor Blue
Write-Host "   • assets/images/optimized/team/" -ForegroundColor White
Write-Host "   • assets/images/optimized/articles/" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Next steps:" -ForegroundColor Magenta
Write-Host "1. Upload largest files to TinyPNG or Squoosh" -ForegroundColor White
Write-Host "2. Download optimized versions to 'optimized' folders" -ForegroundColor White
Write-Host "3. Update HTML file paths to use optimized images" -ForegroundColor White
Write-Host "4. Test website performance" -ForegroundColor White
Write-Host ""