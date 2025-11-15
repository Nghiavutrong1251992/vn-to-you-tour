# Auto resize large images using .NET
Add-Type -AssemblyName System.Drawing

function Optimize-Image {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$MaxWidth = 800,
        [int]$Quality = 80
    )
    
    try {
        $image = [System.Drawing.Image]::FromFile($InputPath)
        
        # Calculate new dimensions
        if ($image.Width -gt $MaxWidth) {
            $ratio = $MaxWidth / $image.Width
            $newWidth = $MaxWidth
            $newHeight = [int]($image.Height * $ratio)
        } else {
            $newWidth = $image.Width
            $newHeight = $image.Height
        }
        
        # Create new resized image
        $newImage = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($newImage)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        
        $graphics.DrawImage($image, 0, 0, $newWidth, $newHeight)
        
        # Ensure output directory exists
        $outputDir = Split-Path $OutputPath -Parent
        if (!(Test-Path $outputDir)) {
            New-Item -ItemType Directory -Path $outputDir -Force
        }
        
        # Save with compression
        $newImage.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        
        # Cleanup
        $graphics.Dispose()
        $newImage.Dispose()
        $image.Dispose()
        
        # Show results
        $originalSize = (Get-Item $InputPath).Length
        $newSize = (Get-Item $OutputPath).Length
        $savedPercent = [math]::Round((1 - $newSize/$originalSize) * 100, 1)
        $savedMB = [math]::Round(($originalSize - $newSize)/1MB, 2)
        
        Write-Host "✅ $(Split-Path $InputPath -Leaf)" -ForegroundColor Green
        Write-Host "   $([math]::Round($originalSize/1MB,2))MB → $([math]::Round($newSize/1MB,2))MB (saved $savedMB MB, -$savedPercent%)" -ForegroundColor Cyan
        
        return $true
    } catch {
        Write-Host "❌ Failed: $(Split-Path $InputPath -Leaf) - $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

Write-Host "🚀 Starting automatic image optimization..." -ForegroundColor Yellow
Write-Host ""

# Process team photos (biggest savings)
$teamPhotos = Get-ChildItem "assets/images/team/*.png"
$totalSaved = 0

foreach ($photo in $teamPhotos) {
    $outputPath = $photo.FullName.Replace("assets\images\team\", "assets\images\optimized\team\").Replace(".png", ".jpg")
    
    if (Optimize-Image -InputPath $photo.FullName -OutputPath $outputPath -MaxWidth 600 -Quality 75) {
        $originalSize = (Get-Item $photo.FullName).Length
        $newSize = (Get-Item $outputPath).Length
        $totalSaved += ($originalSize - $newSize)
    }
}

Write-Host ""
Write-Host "💰 Total saved: $([math]::Round($totalSaved/1MB, 2)) MB" -ForegroundColor Green
Write-Host ""