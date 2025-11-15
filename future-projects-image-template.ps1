# Cloudflare Image Upload Template for Future Projects
# Copy this file to your new projects and customize

# PROJECT SETUP
$PROJECT_NAME = "your-project-name"
$BUCKET_NAME = "$PROJECT_NAME-images"

Write-Host "Cloudflare Image Upload Guide" -ForegroundColor Cyan
Write-Host "Project: $PROJECT_NAME" -ForegroundColor Yellow
Write-Host ""

# STEP 1: Create R2 bucket
Write-Host "STEP 1: Create R2 Bucket" -ForegroundColor Green
Write-Host "Command: wrangler r2 bucket create $BUCKET_NAME"
Write-Host ""

# STEP 2: Organize images locally first
Write-Host "STEP 2: Organize Images Locally" -ForegroundColor Green
Write-Host "Recommended structure:"
Write-Host "  assets/images/"
Write-Host "    team/           (staff photos)"
Write-Host "    products/       (product images)"
Write-Host "    gallery/        (photo gallery)"
Write-Host "    banners/        (hero banners)"
Write-Host "    icons/          (small graphics)"
Write-Host ""

# STEP 3: Optimize images before upload
Write-Host "STEP 3: Optimize Before Upload" -ForegroundColor Green
Write-Host "1. Compress images (TinyPNG/Squoosh)"
Write-Host "2. Resize appropriately:"
Write-Host "   - Hero banners: max 1920x1080"
Write-Host "   - Product photos: max 800x600"  
Write-Host "   - Thumbnails: max 300x300"
Write-Host "   - Team photos: max 400x400"
Write-Host ""

# STEP 4: Batch upload script
Write-Host "STEP 4: Batch Upload Script" -ForegroundColor Green
Write-Host 'Get-ChildItem "assets/images/" -Recurse -File | ForEach-Object {'
Write-Host '    $relativePath = $_.FullName.Replace((Get-Location).Path + "\assets\images\", "")'
Write-Host '    $r2Path = $relativePath.Replace("\", "/")'
Write-Host '    Write-Host "Uploading: $r2Path"'
Write-Host "    wrangler r2 object put $BUCKET_NAME/" + '$r2Path --file="$($_.FullName)"'
Write-Host '}'
Write-Host ""

# STEP 5: Update HTML/CSS
Write-Host "STEP 5: Update Code to Use R2 URLs" -ForegroundColor Green
Write-Host "Replace local paths with R2 URLs:"
Write-Host "Before: ../assets/images/team/photo.jpg"  
Write-Host "After:  https://your-account.r2.cloudflarestorage.com/$BUCKET_NAME/team/photo.jpg"
Write-Host ""

# STEP 6: Enable custom domain (optional)
Write-Host "STEP 6: Custom Domain (Optional)" -ForegroundColor Blue
Write-Host "1. Go to R2 dashboard > Manage R2 API token"
Write-Host "2. Add custom domain: images.yoursite.com"
Write-Host "3. Use: https://images.yoursite.com/team/photo.jpg"
Write-Host ""

Write-Host "COST COMPARISON:" -ForegroundColor Magenta
Write-Host "Cloudflare Pages: FREE (25MB/file, 500 files max)"
Write-Host "Cloudflare R2: 10GB FREE/month, then $0.015/GB (unlimited bandwidth)"
Write-Host "Cloudflare Images: $5/month (100k images + auto-optimization)"
Write-Host ""

Write-Host "RECOMMENDATION FOR IMAGE STORAGE:" -ForegroundColor Yellow
Write-Host "• <500MB total: Use Cloudflare Pages (FREE)"
Write-Host "• 500MB-10GB: Use Cloudflare R2 (FREE tier)"  
Write-Host "• >10GB: R2 paid ($0.015/GB) or Images ($5/month)"
Write-Host "• Need auto-resize: Cloudflare Images from start"