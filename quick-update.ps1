Write-Host "Updating URLs to R2..." -ForegroundColor Green

$R2_URL = "https://pub-1a7ccc534e4045ffbc5393ba23ff9588.r2.dev"

# Update index.html
$content = Get-Content "index.html" -Raw
$content = $content -replace 'assets/images/', "$R2_URL/"
Set-Content "index.html" $content

# Update main pages
$pages = @("about-us", "daily-tours", "private-tours", "tours-to-vietnam")

foreach ($page in $pages) {
    $file = "pages\$page.html"
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $content = $content -replace '../assets/images/', "$R2_URL/"
        $content = $content -replace 'assets/images/', "$R2_URL/"
        Set-Content $file $content
        Write-Host "Updated: $file"
    }
}

Write-Host "Done! Now upload images to R2 bucket" -ForegroundColor Cyan