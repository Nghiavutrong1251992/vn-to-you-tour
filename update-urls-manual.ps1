# ================================================
# VN to You Tour - Manual URL Update Script
# ================================================

Write-Host "🔄 VN to You Tour - Manual URL Update" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Gray

# New R2 URL
$R2_BASE_URL = "https://pub-1a7ccc534e4045ffbc5393ba23ff9588.r2.dev"

Write-Host "✅ Using R2 URL: $R2_BASE_URL" -ForegroundColor Green

# Files to update
$FILES_TO_UPDATE = @(
    "index.html",
    "pages\about-us.html",
    "pages\daily-tours.html", 
    "pages\golf-tour.html",
    "pages\mice.html",
    "pages\news.html",
    "pages\private-tour-detail.html",
    "pages\private-tours.html",
    "pages\tour-detail.html",
    "pages\tours-to-vietnam.html",
    "templates\article-template.html",
    "templates\private-tour-template.html", 
    "templates\tour-template.html",
    "assets\js\data\daily-tours-data.js",
    "assets\js\data\private-tours-data.js",
    "assets\js\data\articles-data.js"
)

$totalReplacements = 0

foreach ($filePath in $FILES_TO_UPDATE) {
    if (Test-Path $filePath) {
        Write-Host "🔍 Processing: $filePath" -ForegroundColor White
        
        $content = Get-Content $filePath -Raw -Encoding UTF8
        $originalContent = $content
        
        # Replace all variations of local image paths
        $content = $content -replace 'assets/images/', "$R2_BASE_URL/"
        $content = $content -replace 'assets\\images\\', "$R2_BASE_URL/"
        $content = $content -replace '/assets/images/', "$R2_BASE_URL/"
        $content = $content -replace '"assets/images/', "`"$R2_BASE_URL/"
        $content = $content -replace "'assets/images/", "'$R2_BASE_URL/"
        $content = $content -replace '../assets/images/', "$R2_BASE_URL/"
        $content = $content -replace '..\\assets\\images\\', "$R2_BASE_URL/"
        $content = $content -replace '"../assets/images/', "`"$R2_BASE_URL/"
        $content = $content -replace "'../assets/images/", "'$R2_BASE_URL/"
        $content = $content -replace 'src="/assets/images/', "src=`"$R2_BASE_URL/"
        $content = $content -replace "src='/assets/images/", "src='$R2_BASE_URL/"
        $content = $content -replace 'href="/assets/images/', "href=`"$R2_BASE_URL/"
        $content = $content -replace "href='/assets/images/", "href='$R2_BASE_URL/"
        
        if ($content -ne $originalContent) {
            # Create backup
            $backupPath = "$filePath.backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
            Copy-Item $filePath $backupPath
            
            # Save updated content
            Set-Content $filePath $content -Encoding UTF8
            Write-Host "✅ Updated: $filePath" -ForegroundColor Green
            $totalReplacements++
        } else {
            Write-Host "ℹ️ No changes: $filePath" -ForegroundColor Blue
        }
    } else {
        Write-Host "⚠️ File not found: $filePath" -ForegroundColor Yellow
    }
}

Write-Host "`n📊 Summary:" -ForegroundColor Cyan
Write-Host "Files updated: $totalReplacements" -ForegroundColor Green
Write-Host "R2 URL: $R2_BASE_URL" -ForegroundColor Blue

Write-Host "`n📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Upload all images to R2 bucket via Cloudflare Dashboard" -ForegroundColor White
Write-Host "2. Test image URLs like: $R2_BASE_URL/general/logo.png" -ForegroundColor White  
Write-Host "3. Test website functionality" -ForegroundColor White
Write-Host "4. Deploy to Cloudflare Pages" -ForegroundColor White

Write-Host "`n✨ URL update completed!" -ForegroundColor Green