Write-Host "Updating URLs to use direct R2 URLs..." -ForegroundColor Green

# Correct R2 URL pattern
$ACCOUNT_ID = "52f76a9022bb336e9432fc6604d2df7e"
$BUCKET_NAME = "vntoyou-database"
$R2_URL = "https://$ACCOUNT_ID.r2.cloudflarestorage.com/$BUCKET_NAME"

Write-Host "New R2 URL: $R2_URL" -ForegroundColor Cyan

# Update index.html
$content = Get-Content "index.html" -Raw
$content = $content -replace 'https://pub-1a7ccc534e4045ffbc5393ba23ff9588\.r2\.dev', $R2_URL
Set-Content "index.html" $content

# Update main pages
$pages = @("about-us", "daily-tours", "private-tours", "tours-to-vietnam")

foreach ($page in $pages) {
    $file = "pages\$page.html"
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $content = $content -replace 'https://pub-1a7ccc534e4045ffbc5393ba23ff9588\.r2\.dev', $R2_URL
        Set-Content $file $content
        Write-Host "Updated: $file"
    }
}

# Update JS data files
Get-ChildItem "assets\js\data\*.js" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace 'https://pub-1a7ccc534e4045ffbc5393ba23ff9588\.r2\.dev', $R2_URL
    Set-Content $_.FullName $content
    Write-Host "Updated: $($_.Name)"
}

Write-Host "✅ All URLs updated to: $R2_URL" -ForegroundColor Green