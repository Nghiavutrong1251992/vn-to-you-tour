# ================================================
# VN to You Tour - URL Updater Script
# ================================================

param(
    [string]$R2Domain = "pub-78ce1b03a58f41af8c07b897b9438589.r2.dev",
    [string]$BucketName = "",  # Không cần bucket name với custom domain
    [switch]$DryRun = $false,
    [string]$BackupSuffix = "backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
)

Write-Host "🔄 VN to You Tour - URL Update Script" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Gray

# Configuration
$R2_BASE_URL = "https://$R2Domain"
$FILES_TO_UPDATE = @(
    "index.html",
    "pages/*.html",
    "templates/*.html",
    "assets/css/*.css",
    "assets/js/**/*.js"
)

# Colors
function Write-Success($msg) { Write-Host "✅ $msg" -ForegroundColor Green }
function Write-Warning($msg) { Write-Host "⚠️  $msg" -ForegroundColor Yellow }
function Write-Info($msg) { Write-Host "ℹ️  $msg" -ForegroundColor Blue }

Write-Info "R2 Base URL: $R2_BASE_URL"
Write-Info "Dry Run: $DryRun"

# Find all files to update
$filesToUpdate = @()
foreach ($pattern in $FILES_TO_UPDATE) {
    $files = Get-ChildItem $pattern -Recurse -File -ErrorAction SilentlyContinue
    $filesToUpdate += $files
}

Write-Info "Found $($filesToUpdate.Count) files to update"

# URL replacement patterns
$urlReplacements = @{
    # Local image paths to R2
    'assets/images/' = "$R2_BASE_URL/"
    'assets\\images\\' = "$R2_BASE_URL/"
    '/assets/images/' = "$R2_BASE_URL/"
    '"assets/images/' = "`"$R2_BASE_URL/"
    "'assets/images/" = "'$R2_BASE_URL/"
    
    # Relative paths from subdirectories
    '../assets/images/' = "$R2_BASE_URL/"
    '..\\assets\\images\\' = "$R2_BASE_URL/"
    '"../assets/images/' = "`"$R2_BASE_URL/"
    "'../assets/images/" = "'$R2_BASE_URL/"
    
    # Root paths
    'src="/assets/images/' = "src=`"$R2_BASE_URL/"
    "src='/assets/images/" = "src='$R2_BASE_URL/"
    'href="/assets/images/' = "href=`"$R2_BASE_URL/"
    "href='/assets/images/" = "href='$R2_BASE_URL/"
}

$totalReplacements = 0

foreach ($file in $filesToUpdate) {
    try {
        Write-Host "🔍 Processing: $($file.FullName)" -ForegroundColor White
        
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        $originalContent = $content
        $fileReplacements = 0
        
        # Apply all replacements
        foreach ($pattern in $urlReplacements.Keys) {
            $replacement = $urlReplacements[$pattern]
            $newContent = $content -replace [regex]::Escape($pattern), $replacement
            if ($newContent -ne $content) {
                $matches = ($content | Select-String $pattern -AllMatches).Matches.Count
                Write-Info "   Replaced '$pattern' -> '$replacement' ($matches matches)"
                $fileReplacements += $matches
                $content = $newContent
            }
        }
        
        if ($fileReplacements -gt 0) {
            $totalReplacements += $fileReplacements
            
            if (-not $DryRun) {
                # Create backup
                $backupPath = "$($file.FullName).$BackupSuffix"
                Copy-Item $file.FullName $backupPath
                
                # Save updated content
                Set-Content $file.FullName $content -Encoding UTF8
                Write-Success "   Updated file with $fileReplacements replacements"
            } else {
                Write-Warning "   [DRY RUN] Would update file with $fileReplacements replacements"
            }
        } else {
            Write-Info "   No changes needed"
        }
        
    } catch {
        Write-Error "   Error processing $($file.Name): $($_.Exception.Message)"
    }
}

# Summary
Write-Host "`n📊 Update Summary:" -ForegroundColor Cyan
Write-Host "=" * 30 -ForegroundColor Gray
Write-Success "Files processed: $($filesToUpdate.Count)"
Write-Success "Total replacements: $totalReplacements"

if ($DryRun) {
    Write-Info "This was a dry run. No files were actually modified."
    Write-Info "Run without -DryRun to perform actual updates."
} else {
    Write-Info "Backup files created with suffix: .$BackupSuffix"
}

# Verification suggestions
Write-Host "`n🔍 Manual Verification Needed:" -ForegroundColor Cyan
Write-Host "1. Check key files for correct URL updates:" -ForegroundColor White
Write-Host "   - index.html" -ForegroundColor Gray
Write-Host "   - pages/tours-to-vietnam.html" -ForegroundColor Gray
Write-Host "   - assets/js/data/*-data.js" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Search for any remaining local image references:" -ForegroundColor White
Write-Host "   grep -r 'assets/images' ." -ForegroundColor Gray
Write-Host ""
Write-Host "3. Test website functionality after updates" -ForegroundColor White

Write-Host "`n✨ URL update completed!" -ForegroundColor Green