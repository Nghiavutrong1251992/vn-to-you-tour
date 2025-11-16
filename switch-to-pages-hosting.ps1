# Chuyển từ R2 về Cloudflare Pages hosting
$oldDomain = "https://pub-1a7ccc534e4045ffbc5393ba23ff9588.r2.dev"
$newDomain = "https://main.vn-to-you-tour.pages.dev/assets/images"

$files = @(
    "index.html",
    "includes\header.html", 
    "assets\js\data\articles-data.js",
    "assets\js\data\daily-tours-data.js",
    "assets\js\data\private-tours-data.js"
)

Write-Host "Chuyển tất cả URLs từ R2 về Cloudflare Pages hosting..." -ForegroundColor Yellow

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing: $file" -ForegroundColor Cyan
        $content = Get-Content $file -Raw
        
        # Replace R2 URLs với Pages URLs
        $newContent = $content.Replace($oldDomain, $newDomain)
        
        # Fix paths cho các loại ảnh khác nhau
        $newContent = $newContent.Replace("/vntoyou-slide-home/", "/vntoyou-slide-home/")
        $newContent = $newContent.Replace("/articles/", "/optimized/articles/")
        $newContent = $newContent.Replace("/tours/", "/tours/")
        $newContent = $newContent.Replace("/general/", "/")
        $newContent = $newContent.Replace("/team/", "/team/")
        
        Set-Content $file -Value $newContent -NoNewline
        Write-Host "  ✅ Updated: $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ File not found: $file" -ForegroundColor Red
    }
}

Write-Host "✅ Hoàn thành! Giờ ảnh sẽ load từ Cloudflare Pages." -ForegroundColor Green