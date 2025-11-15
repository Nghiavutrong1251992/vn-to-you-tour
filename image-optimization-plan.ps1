# VN TO YOU - Image optimization guide
Write-Host "VN TO YOU - Image Optimization Plan" -ForegroundColor Cyan
Write-Host "Current size: 77.54 MB -> Target: Under 20 MB" -ForegroundColor Yellow
Write-Host ""

# Show largest files
Write-Host "Largest files to optimize:" -ForegroundColor Red
$largestFiles = @(
    "thong.png - 5.68 MB",
    "intan.png - 4.33 MB", 
    "thanh-ngan.png - 1.87 MB",
    "ttaa-event-4.jpg - 1.85 MB",
    "ttaa-event-2.jpg - 1.77 MB"
)
$largestFiles | ForEach-Object { Write-Host "  $_" -ForegroundColor White }

Write-Host ""
Write-Host "SOLUTION 1: Online Tools (Recommended)" -ForegroundColor Green
Write-Host "1. Go to https://tinypng.com/"
Write-Host "2. Upload team photos one by one"
Write-Host "3. Download optimized versions"
Write-Host "4. Replace original files"
Write-Host ""

# Create optimized folders
$folders = @("assets/images/optimized", "assets/images/optimized/team", "assets/images/optimized/articles")
$folders | ForEach-Object {
    if (!(Test-Path $_)) {
        New-Item -ItemType Directory -Path $_ -Force | Out-Null
        Write-Host "Created: $_" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "SOLUTION 2: Basic PowerShell resize" -ForegroundColor Blue