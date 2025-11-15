Write-Host "=== VN TO YOU - Image Optimization Guide ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Current total image size: 77.54 MB (too large!)" -ForegroundColor Red
Write-Host "Target size: Under 20 MB" -ForegroundColor Green
Write-Host ""

Write-Host "Top 10 largest files:" -ForegroundColor Yellow
Get-ChildItem -Recurse assets/images/ -Include *.jpg,*.png | Sort-Object Length -Descending | Select-Object -First 10 | ForEach-Object {
    $sizeMB = [math]::Round($_.Length/1MB,2)
    Write-Host "   $($_.Name): $sizeMB MB" -ForegroundColor White
}

Write-Host ""
Write-Host "Quick optimization options:" -ForegroundColor Green
Write-Host "1. Online Tools:"
Write-Host "   - TinyPNG: https://tinypng.com/"
Write-Host "   - Squoosh: https://squoosh.app/"
Write-Host "2. Target sizes:"
Write-Host "   - Team photos: max 500KB each"
Write-Host "   - Article images: max 300KB each"
Write-Host ""

# Create optimization directories
$optimizedDir = "assets/images/optimized"
if (!(Test-Path $optimizedDir)) {
    New-Item -ItemType Directory -Path $optimizedDir -Force
    New-Item -ItemType Directory -Path "$optimizedDir/team" -Force
    New-Item -ItemType Directory -Path "$optimizedDir/articles" -Force
    New-Item -ItemType Directory -Path "$optimizedDir/general" -Force
    Write-Host "Created optimization folders" -ForegroundColor Green
}

Write-Host "Folders created for optimized images" -ForegroundColor Blue