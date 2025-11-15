# Image Optimization Script for VN TO YOU Website
# Compress and optimize images to reduce website size

Write-Host "Starting image optimization..." -ForegroundColor Green

# Check if ImageMagick is available
$imageMagickPath = Get-Command "magick" -ErrorAction SilentlyContinue

if (-not $imageMagickPath) {
    Write-Host "ImageMagick not found. Need to install for optimization" -ForegroundColor Red
    Write-Host "Download from: https://imagemagick.org/script/download.php#windows" -ForegroundColor Yellow
    
    # Basic optimization using PowerShell
    Write-Host "Using basic optimization method..." -ForegroundColor Yellow
    
    # Create backup directory
    $backupDir = "assets/images/backup"
    if (!(Test-Path $backupDir)) {
        New-Item -ItemType Directory -Path $backupDir -Force
    }
    
    # Copy original images to backup
    Write-Host "Backing up original images..." -ForegroundColor Blue
    Copy-Item -Path "assets/images/*" -Destination $backupDir -Recurse -Force
    
    Write-Host "Images backed up. Please install ImageMagick for further optimization." -ForegroundColor Green
    Write-Host "Or use online tool: https://tinypng.com/" -ForegroundColor Yellow
} else {
    Write-Host "Found ImageMagick" -ForegroundColor Green
    
    # Create optimized directory
    $optimizedDir = "assets/images/optimized"
    if (!(Test-Path $optimizedDir)) {
        New-Item -ItemType Directory -Path $optimizedDir -Force
    }
    
    # Optimize each image
    Get-ChildItem -Recurse "assets/images/" -Include *.jpg,*.png,*.jpeg | ForEach-Object {
        $relativePath = $_.FullName.Replace((Get-Location).Path + "\assets\images\", "")
        $outputPath = Join-Path $optimizedDir $relativePath
        $outputDir = Split-Path $outputPath -Parent
        
        if (!(Test-Path $outputDir)) {
            New-Item -ItemType Directory -Path $outputDir -Force
        }
        
        Write-Host "Optimizing: $($_.Name)" -ForegroundColor Cyan
        
        # Compress image with 80% quality and resize if too large
        & magick $_.FullName -quality 80 -resize "1200x800>" $outputPath
        
        $originalSize = [math]::Round($_.Length/1KB, 2)
        $newSize = [math]::Round((Get-Item $outputPath).Length/1KB, 2)
        $savedPercent = [math]::Round((1 - $newSize/$originalSize) * 100, 1)
        
        Write-Host "  Size: $originalSize KB -> $newSize KB (saved $savedPercent%)" -ForegroundColor Yellow
    }
    
    Write-Host "Image optimization completed!" -ForegroundColor Green
}

# Display total size
$totalSize = (Get-ChildItem -Recurse "assets/images/" -Include *.jpg,*.png,*.jpeg | Measure-Object -Property Length -Sum).Sum
Write-Host "Total image size: $([math]::Round($totalSize/1MB, 2)) MB" -ForegroundColor Magenta