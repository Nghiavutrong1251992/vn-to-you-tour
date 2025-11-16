# Update all R2 URLs to use new dev domain
$oldDomain = "https://52f76a9022bb336e9432fc6604d2df7e.r2.cloudflarestorage.com/vntoyou-database"
$newDomain = "https://pub-1a7ccc534e4045ffbc5393ba23ff9588.r2.dev"

$files = @(
    "index.html",
    "includes\header.html", 
    "assets\js\data\articles-data.js",
    "assets\js\data\daily-tours-data.js",
    "assets\js\data\private-tours-data.js"
)

Write-Host "Updating R2 URLs in all files..." -ForegroundColor Yellow

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing: $file" -ForegroundColor Cyan
        $content = Get-Content $file -Raw
        $newContent = $content.Replace($oldDomain, $newDomain)
        Set-Content $file -Value $newContent -NoNewline
        Write-Host "  Updated URLs in $file" -ForegroundColor Green
    } else {
        Write-Host "  File not found: $file" -ForegroundColor Red
    }
}

Write-Host "All files updated successfully!" -ForegroundColor Green