# ================================================
# VN to You Tour - Image Optimization Script
# ================================================

param(
    [string]$SourcePath = "assets\images",
    [string]$OutputPath = "assets\images_optimized",
    [int]$Quality = 85,
    [switch]$DryRun = $false
)

Write-Host "🖼️ VN to You Tour - Image Optimization Script" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Gray

# Configuration
$QUALITY = $Quality
$MAX_WIDTH = 1920
$MAX_HEIGHT = 1080

# Colors
function Write-Success($msg) { Write-Host "✅ $msg" -ForegroundColor Green }
function Write-Warning($msg) { Write-Host "⚠️  $msg" -ForegroundColor Yellow }
function Write-Info($msg) { Write-Host "ℹ️  $msg" -ForegroundColor Blue }
function Write-Error($msg) { Write-Host "❌ $msg" -ForegroundColor Red }

# Check if ImageMagick is installed (optional)
$hasImageMagick = $false
try {
    magick --version | Out-Null
    $hasImageMagick = $true
    Write-Success "ImageMagick detected - will use for optimization"
} catch {
    Write-Warning "ImageMagick not found - will use basic optimization"
}

# Get image files
$imageExtensions = @('.jpg', '.jpeg', '.png', '.gif', '.webp')
$imageFiles = Get-ChildItem $SourcePath -Recurse -File | Where-Object {
    $imageExtensions -contains $_.Extension.ToLower()
}

Write-Info "Found $($imageFiles.Count) images to optimize"

# Calculate original total size
$originalSize = ($imageFiles | Measure-Object -Property Length -Sum).Sum
Write-Info "Original total size: $([math]::Round($originalSize / 1MB, 2)) MB"

# Create output directory
if (-not $DryRun -and -not (Test-Path $OutputPath)) {
    New-Item -ItemType Directory -Path $OutputPath -Force | Out-Null
    Write-Info "Created output directory: $OutputPath"
}

$optimizedCount = 0
$errorCount = 0
$totalSavings = 0

foreach ($file in $imageFiles) {
    try {
        $relativePath = $file.FullName.Replace((Resolve-Path $SourcePath).Path + "\", "")
        $outputFile = Join-Path $OutputPath $relativePath
        $outputDir = Split-Path $outputFile -Parent
        
        Write-Host "🔧 Optimizing: $relativePath" -ForegroundColor White
        
        if ($DryRun) {
            Write-Host "   [DRY RUN] Would optimize to: $outputFile" -ForegroundColor Gray
            $optimizedCount++
            continue
        }
        
        # Create output directory if needed
        if (-not (Test-Path $outputDir)) {
            New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
        }
        
        $originalFileSize = $file.Length
        
        if ($hasImageMagick -and $file.Extension.ToLower() -in @('.jpg', '.jpeg', '.png')) {
            # Use ImageMagick for advanced optimization
            $magickCmd = "magick `"$($file.FullName)`" -resize ${MAX_WIDTH}x${MAX_HEIGHT}> -quality $QUALITY `"$outputFile`""
            Invoke-Expression $magickCmd
            
            if ($LASTEXITCODE -eq 0) {
                $optimizedFileSize = (Get-Item $outputFile).Length
                $savings = $originalFileSize - $optimizedFileSize
                $savingsPercent = [math]::Round(($savings / $originalFileSize) * 100, 1)
                
                Write-Success "   Saved: $([math]::Round($savings / 1KB, 1)) KB ($savingsPercent%)"
                $totalSavings += $savings
                $optimizedCount++
            } else {
                Write-Warning "   ImageMagick failed, copying original"
                Copy-Item $file.FullName $outputFile
                $optimizedCount++
            }
        } else {
            # Simple copy for unsupported formats
            Copy-Item $file.FullName $outputFile
            Write-Info "   Copied unchanged (format not optimized)"
            $optimizedCount++
        }
        
    } catch {
        Write-Error "   Error optimizing $($file.Name): $($_.Exception.Message)"
        $errorCount++
    }
}

# Calculate optimized total size
if (-not $DryRun -and (Test-Path $OutputPath)) {
    $optimizedFiles = Get-ChildItem $OutputPath -Recurse -File
    $optimizedSize = ($optimizedFiles | Measure-Object -Property Length -Sum).Sum
    $totalSavingsPercent = [math]::Round((($originalSize - $optimizedSize) / $originalSize) * 100, 1)
    
    Write-Host "`n📊 Optimization Summary:" -ForegroundColor Cyan
    Write-Host "=" * 35 -ForegroundColor Gray
    Write-Info "Original size: $([math]::Round($originalSize / 1MB, 2)) MB"
    Write-Info "Optimized size: $([math]::Round($optimizedSize / 1MB, 2)) MB"
    Write-Success "Total savings: $([math]::Round($totalSavings / 1MB, 2)) MB ($totalSavingsPercent%)"
} else {
    Write-Host "`n📊 Optimization Summary:" -ForegroundColor Cyan
    Write-Host "=" * 35 -ForegroundColor Gray
}

Write-Success "Files optimized: $optimizedCount"
if ($errorCount -gt 0) { Write-Error "Errors: $errorCount" }

if ($DryRun) {
    Write-Info "This was a dry run. No files were actually optimized."
    Write-Info "Run without -DryRun to perform actual optimization."
}

# Recommendations
Write-Host "`n💡 Optimization Tips:" -ForegroundColor Cyan
Write-Host "1. For better compression, consider:" -ForegroundColor White
Write-Host "   - TinyPNG (online): https://tinypng.com/" -ForegroundColor Gray
Write-Host "   - Squoosh (online): https://squoosh.app/" -ForegroundColor Gray
Write-Host "   - ImageOptim (Mac): https://imageoptim.com/" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Consider converting PNG to WebP for better compression" -ForegroundColor White
Write-Host ""
Write-Host "3. For hero images, consider using multiple sizes for responsive design" -ForegroundColor White

# Next steps
Write-Host "`n📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Review optimized images in: $OutputPath" -ForegroundColor White
Write-Host "2. Replace original images with optimized versions" -ForegroundColor White
Write-Host "3. Upload optimized images to R2" -ForegroundColor White

Write-Host "`n✨ Image optimization completed!" -ForegroundColor Green