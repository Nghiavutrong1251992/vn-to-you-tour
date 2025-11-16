# Simple URL Update Script for VN to You Tour
# Replace local image paths with R2 URLs

$R2_DOMAIN = "pub-78ce1b03a58f41af8c07b897b9438589.r2.dev"
$R2_BASE_URL = "https://$R2_DOMAIN"

Write-Host "=== VN to You Tour - URL Update ===" -ForegroundColor Cyan
Write-Host "Target: $R2_BASE_URL" -ForegroundColor Yellow

# Files to update
$files = @(
    "index.html",
    "pages\about-us.html",
    "pages\daily-tours.html", 
    "pages\private-tours.html",
    "pages\tours-to-vietnam.html",
    "pages\private-tour-detail.html",
    "pages\tour-detail.html",
    "pages\news.html",
    "pages\mice.html",
    "pages\golf-tour.html",
    "templates\tour-template.html",
    "templates\private-tour-template.html",
    "templates\article-template.html",
    "assets\js\data\private-tours-data.js",
    "assets\js\data\daily-tours-data.js",
    "assets\js\data\articles-data.js"
)

$totalReplacements = 0

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing: $file" -ForegroundColor White
        
        $content = Get-Content $file -Raw -Encoding UTF8
        $original = $content
        
        # Replace patterns
        $patterns = @{
            'assets/images/' = "$R2_BASE_URL/"
            'assets\\images\\' = "$R2_BASE_URL/"
            '/assets/images/' = "$R2_BASE_URL/"
            '"assets/images/' = "`"$R2_BASE_URL/"
            "'assets/images/" = "'$R2_BASE_URL/"
            '../assets/images/' = "$R2_BASE_URL/"
            '..\\assets\\images\\' = "$R2_BASE_URL/"
            '"../assets/images/' = "`"$R2_BASE_URL/"
            "'../assets/images/" = "'$R2_BASE_URL/"
            'src="/assets/images/' = "src=`"$R2_BASE_URL/"
            "src='/assets/images/" = "src='$R2_BASE_URL/"
        }
        
        $fileReplacements = 0
        foreach ($pattern in $patterns.Keys) {
            $replacement = $patterns[$pattern]
            $newContent = $content -replace [regex]::Escape($pattern), $replacement
            if ($newContent -ne $content) {
                $matches = [regex]::Matches($content, [regex]::Escape($pattern)).Count
                Write-Host "  → Replaced '$pattern': $matches times" -ForegroundColor Green
                $fileReplacements += $matches
                $content = $newContent
            }
        }
        
        if ($fileReplacements -gt 0) {
            # Create backup
            Copy-Item $file "$file.backup"
            # Save updated content
            Set-Content $file $content -Encoding UTF8
            $totalReplacements += $fileReplacements
            Write-Host "  ✅ Updated with $fileReplacements changes" -ForegroundColor Green
        } else {
            Write-Host "  ⏭ No changes needed" -ForegroundColor Gray
        }
    } else {
        Write-Host "  ⚠️ File not found: $file" -ForegroundColor Yellow
    }
}

Write-Host "`n=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "Total replacements: $totalReplacements" -ForegroundColor Green
Write-Host "Backup files created with .backup extension" -ForegroundColor Yellow

Write-Host "`n=== TEST URLs ===" -ForegroundColor Cyan
Write-Host "Test these in browser:" -ForegroundColor White
Write-Host "- $R2_BASE_URL/general/logo.png" -ForegroundColor Blue
Write-Host "- $R2_BASE_URL/vntoyou-slide-home/vntoyou%20slide%201%20-%20The%20Huc%20Bridge.jpg" -ForegroundColor Blue
Write-Host "- $R2_BASE_URL/team/thong.png" -ForegroundColor Blue

Write-Host "`nDone! Check your website now." -ForegroundColor Green