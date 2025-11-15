# CLOUDFLARE IMAGE UPLOAD GUIDE
# Hướng dẫn upload ảnh lên Cloudflare cho các dự án sau này

Write-Host "=== CLOUDFLARE IMAGE UPLOAD STRATEGIES ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "🎯 PHƯƠNG PHÁP 1: CLOUDFLARE R2 (Khuyến nghị)" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-Host ""
Write-Host "✅ Ưu điểm:"
Write-Host "  • Lưu trữ object storage giống AWS S3"
Write-Host "  • Băng thông miễn phí (không giới hạn)"
Write-Host "  • Tích hợp CDN toàn cầu"
Write-Host "  • Giá rẻ: chỉ $0.015/GB/tháng"
Write-Host ""
Write-Host "📝 Cách setup:"
Write-Host "1. Tạo R2 bucket:"
Write-Host "   wrangler r2 bucket create your-project-images"
Write-Host ""
Write-Host "2. Upload ảnh:"
Write-Host "   wrangler r2 object put your-project-images/folder/image.jpg --file='local-path/image.jpg'"
Write-Host ""
Write-Host "3. Batch upload:"
Write-Host '   Get-ChildItem assets/images/ -Recurse -File | ForEach-Object {'
Write-Host '     $r2Path = $_.FullName.Replace("assets\images\", "").Replace("\", "/")'
Write-Host '     wrangler r2 object put your-project-images/$r2Path --file="$($_.FullName)"'
Write-Host '   }'
Write-Host ""
Write-Host "4. Sử dụng URL:"
Write-Host "   https://your-account-id.r2.cloudflarestorage.com/your-project-images/folder/image.jpg"
Write-Host ""

Write-Host "🖼️ PHƯƠNG PHÁP 2: CLOUDFLARE IMAGES (Pro)" -ForegroundColor Blue  
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-Host ""
Write-Host "✅ Ưu điểm:"
Write-Host "  • Tự động resize/optimize ảnh"
Write-Host "  • WebP/AVIF conversion"
Write-Host "  • Real-time image transforms"
Write-Host "  • Lazy loading tự động"
Write-Host ""
Write-Host "💰 Chi phí: $5/tháng cho 100,000 ảnh"
Write-Host ""
Write-Host "📝 Cách setup:"
Write-Host "1. Enable Cloudflare Images trong dashboard"
Write-Host "2. Upload qua API hoặc dashboard"
Write-Host "3. URL tự động: https://imagedelivery.net/account-id/image-id/variant"
Write-Host ""

Write-Host "📁 PHƯƠNG PHÁP 3: PAGES + ASSETS (Hiện tại)" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-Host ""
Write-Host "✅ Ưu điểm:"
Write-Host "  • Đơn giản nhất"
Write-Host "  • Miễn phí hoàn toàn"
Write-Host "  • Deploy cùng với code"
Write-Host ""
Write-Host "⚠️ Hạn chế:"
Write-Host "  • Giới hạn 25MB/file, 500 files"
Write-Host "  • Không tối ưu ảnh tự động"
Write-Host "  • Build time lâu với nhiều ảnh"
Write-Host ""

Write-Host "🎯 KHUYẾN NGHỊ CHO CÁC DỰ ÁN:" -ForegroundColor Magenta
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-Host ""
Write-Host "🔸 Website nhỏ (<50 ảnh, <20MB): Cloudflare Pages"
Write-Host "🔸 Website vừa (50-500 ảnh): Cloudflare R2" 
Write-Host "🔸 Website lớn (>500 ảnh): Cloudflare Images"
Write-Host "🔸 E-commerce/Portfolio: Cloudflare Images (auto-resize)"
Write-Host ""