#!/usr/bin/env powershell
# VN TO YOU - Image Optimization Automation Script
# Reduces 77MB images to under 20MB target

Write-Host "🚀 VN TO YOU - Auto Image Optimization" -ForegroundColor Cyan
Write-Host "Current: 77.54 MB → Target: <20 MB" -ForegroundColor Yellow
Write-Host ""

# Configuration
$sourceDir = "assets/images"
$optimizedDir = "assets/images/optimized"
$backupDir = "assets/images/backup-original"

# Create directories
@($optimizedDir, "$optimizedDir/team", "$optimizedDir/articles", "$optimizedDir/general", "$optimizedDir/tours", "$optimizedDir/vntoyou-slide-home", $backupDir) | ForEach-Object {
    if (!(Test-Path $_)) {
        New-Item -ItemType Directory -Path $_ -Force | Out-Null
    }
}

Write-Host "📁 Created optimization folders" -ForegroundColor Green

# Priority files for immediate optimization (largest first)
$priorityFiles = @(
    @{file="team/thong.png"; target="500KB"; current="5.68MB"},
    @{file="team/intan.png"; target="400KB"; current="4.33MB"},
    @{file="team/thanh-ngan.png"; target="200KB"; current="1.87MB"},
    @{file="articles/ttaa-event-4.jpg"; target="300KB"; current="1.85MB"},
    @{file="articles/ttaa-event-2.jpg"; target="300KB"; current="1.77MB"},
    @{file="articles/ttaa-event-3.jpg"; target="300KB"; current="1.59MB"},
    @{file="team/ruby.png"; target="400KB"; current="1.48MB"},
    @{file="team/lulu.png"; target="400KB"; current="1.41MB"},
    @{file="team/mai.png"; target="350KB"; current="1.19MB"}
)

Write-Host "🎯 PRIORITY OPTIMIZATION LIST:" -ForegroundColor Red
$priorityFiles | ForEach-Object {
    Write-Host "   📸 $($_.file): $($_.current) → $($_.target)" -ForegroundColor White
}
Write-Host ""

# Method 1: Online Tools (Recommended)
Write-Host "🌐 METHOD 1: Online Compression (FASTEST)" -ForegroundColor Green
Write-Host ""
Write-Host "1️⃣ TinyPNG (https://tinypng.com/)" -ForegroundColor Cyan
Write-Host "   • Upload: team/thong.png, intan.png, thanh-ngan.png"
Write-Host "   • Expected reduction: 5.68MB → 600KB (90% smaller)"
Write-Host "   • Download to: assets/images/optimized/team/"
Write-Host ""
Write-Host "2️⃣ Squoosh (https://squoosh.app/)" -ForegroundColor Cyan  
Write-Host "   • Better for batch processing"
Write-Host "   • WebP conversion (30% smaller than JPG)"
Write-Host "   • No file size limits"
Write-Host ""

# Method 2: PowerShell Resize (Basic)
Write-Host "🔧 METHOD 2: PowerShell Basic Resize" -ForegroundColor Blue
Write-Host ""

function Resize-ImageBasic {
    param($imagePath, $maxWidth = 800)
    
    try {
        Add-Type -AssemblyName System.Drawing
        $img = [System.Drawing.Image]::FromFile($imagePath)
        
        if ($img.Width -gt $maxWidth) {
            $ratio = $maxWidth / $img.Width
            $newHeight = [int]($img.Height * $ratio)
            
            $newImg = New-Object System.Drawing.Bitmap($maxWidth, $newHeight)
            $graphics = [System.Drawing.Graphics]::FromImage($newImg)
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.DrawImage($img, 0, 0, $maxWidth, $newHeight)
            
            $outputPath = $imagePath.Replace($sourceDir, $optimizedDir)
            $outputDir = Split-Path $outputPath -Parent
            if (!(Test-Path $outputDir)) { New-Item -ItemType Directory -Path $outputDir -Force }
            
            $newImg.Save($outputPath, $img.RawFormat)
            $graphics.Dispose()
            $newImg.Dispose()
            
            $originalSize = (Get-Item $imagePath).Length
            $newSize = (Get-Item $outputPath).Length
            $reduction = [math]::Round((1 - $newSize/$originalSize) * 100, 1)
            
            Write-Host "✅ $(Split-Path $imagePath -Leaf): $([math]::Round($originalSize/1KB))KB → $([math]::Round($newSize/1KB))KB (-$reduction%)" -ForegroundColor Green
        }
        
        $img.Dispose()
    } catch {
        Write-Host "❌ Error processing $imagePath`: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Process team photos first (biggest impact)
Write-Host "🔄 Processing team photos..." -ForegroundColor Yellow
Get-ChildItem "$sourceDir/team/*.png" | ForEach-Object {
    Resize-ImageBasic $_.FullName 600
}

# Method 3: Cloudflare R2 Migration
Write-Host ""
Write-Host "☁️ METHOD 3: Cloudflare R2 + CDN" -ForegroundColor Magenta
Write-Host ""

$r2Commands = @"
# Upload optimized images to R2 (after Method 1 or 2)
wrangler r2 object put vn-to-you-images/team/thong-optimized.jpg --file="assets/images/optimized/team/thong.jpg"
wrangler r2 object put vn-to-you-images/team/intan-optimized.jpg --file="assets/images/optimized/team/intan.jpg"

# Batch upload all optimized images
Get-ChildItem assets/images/optimized/ -Recurse -File | ForEach-Object {
    $r2Path = $_.FullName.Replace('assets\images\optimized\', '').Replace('\', '/')
    wrangler r2 object put vn-to-you-images/$r2Path --file="$($_.FullName)"
}
"@

Write-Host $r2Commands -ForegroundColor Gray

# Calculate potential savings
Write-Host ""
Write-Host "💰 EXPECTED SAVINGS:" -ForegroundColor Green
$currentTotal = 77.54
$targetSavings = @{
    "Team photos (9 files)" = "25MB → 4MB (-21MB)"
    "Article images (5 files)" = "8MB → 2MB (-6MB)" 
    "Tour images (11 files)" = "15MB → 8MB (-7MB)"
    "Other optimizations" = "29.54MB → 6MB (-23.54MB)"
}

$totalSaved = 0
$targetSavings.GetEnumerator() | ForEach-Object {
    Write-Host "   $($_.Key): $($_.Value)" -ForegroundColor White
    if ($_.Value -match '-(\d+)MB') {
        $totalSaved += [int]$Matches[1]
    }
}

$finalSize = $currentTotal - $totalSaved
Write-Host ""
Write-Host "🎯 FINAL TARGET: $currentTotal MB → $finalSize MB (saved $totalSaved MB)" -ForegroundColor Cyan
Write-Host ""

# Quick action buttons
Write-Host "⚡ QUICK ACTIONS:" -ForegroundColor Yellow
Write-Host "1. Open TinyPNG    : start https://tinypng.com/" -ForegroundColor White
Write-Host "2. Open Squoosh    : start https://squoosh.app/" -ForegroundColor White  
Write-Host "3. Performance page: start https://a062793c.vn-to-you-tour.pages.dev/pages/performance.html" -ForegroundColor White
Write-Host ""

Write-Host "✨ Ready to optimize! Choose your method and start reducing those 77MB!" -ForegroundColor Green