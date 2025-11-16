# VN to You Tour - Update URLs to R2
$R2_URL = "https://pub-1a7ccc534e4045ffbc5393ba23ff9588.r2.dev"

Write-Host "🔄 Updating URLs to: $R2_URL" -ForegroundColor Cyan

$files = @(
    "index.html",
    "pages\about-us.html",
    "pages\daily-tours.html", 
    "pages\golf-tour.html",
    "pages\mice.html",
    "pages\news.html",
    "pages\private-tour-detail.html",
    "pages\private-tours.html",
    "pages\tour-detail.html",
    "pages\tours-to-vietnam.html"
)

$updated = 0

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing: $file"
        
        $content = Get-Content $file -Raw -Encoding UTF8
        $original = $content
        
        # Replace image paths
        $content = $content -replace 'assets/images/', "$R2_URL/"
        $content = $content -replace '../assets/images/', "$R2_URL/"
        $content = $content -replace '/assets/images/', "$R2_URL/"
        $content = $content -replace '"assets/images/', "`"$R2_URL/"
        $content = $content -replace "'assets/images/", "'$R2_URL/"
        $content = $content -replace '"../assets/images/', "`"$R2_URL/"
        $content = $content -replace "'../assets/images/", "'$R2_URL/"
        
        if ($content -ne $original) {
            # Backup
            Copy-Item $file "$file.backup"
            
            # Update
            Set-Content $file $content -Encoding UTF8
            Write-Host "✅ Updated: $file" -ForegroundColor Green
            $updated++
        } else {
            Write-Host "ℹ️ No changes: $file" -ForegroundColor Blue
        }
    }
}

Write-Host "`n✅ Updated $updated files" -ForegroundColor Green
Write-Host "Next: Upload images to R2 and test!" -ForegroundColor Cyan