# 🚀 VN to You Tour - Cloudflare R2 Migration Guide

## ✅ URL hiện tại của bạn:
```
https://pub-1a7ccc534e4045ffbc5393ba23ff9588.r2.dev
```

## 📋 Các bước thực hiện:

### 1. 🗑️ Dọn dẹp R2 bucket
- Truy cập: https://dash.cloudflare.com/
- Vào **R2 Object Storage**
- Chọn bucket có domain `pub-1a7ccc534e4045ffbc5393ba23ff9588.r2.dev`
- **Select All** → **Delete** (xóa tất cả file cũ)

### 2. 📤 Upload ảnh thủ công
- Trong bucket đã làm sạch, click **"Upload"**  
- Kéo thả toàn bộ folder `assets/images`
- **LƯU Ý**: Giữ nguyên cấu trúc thư mục:
  ```
  general/
  team/
  tours/
  articles/
  vntoyou-slide-home/
  backup/
  optimized/
  ```

### 3. 🔧 Chạy script cập nhật URLs
```bash
.\update-urls-manual.ps1
```

### 4. 🧪 Test ảnh hoạt động
Kiểm tra các URLs này:
```
https://pub-1a7ccc534e4045ffbc5393ba23ff9588.r2.dev/vntoyou-slide-home/vntoyou%20slide%201%20-%20The%20Huc%20Bridge.jpg
https://pub-1a7ccc534e4045ffbc5393ba23ff9588.r2.dev/general/logo.png
https://pub-1a7ccc534e4045ffbc5393ba23ff9588.r2.dev/team/thong.png
```

### 5. 🌐 Test website local
```bash
# Chạy local server để test
python -m http.server 8000
# Hoặc
npx serve .
```

### 6. 🚀 Deploy lên Cloudflare Pages
- Vào **Cloudflare Dashboard** → **Pages**
- Connect Git repository
- Deploy từ branch `main`

## ⚠️ Lưu ý quan trọng:
- Tên file có dấu cách cần encode thành `%20` trong URL
- Backup files được tạo tự động với timestamp
- Test kỹ trước khi deploy production

## 📊 Lợi ích sau khi migrate:
- ✅ Git repo nhẹ hơn (không có ảnh)
- ✅ CDN toàn cầu cho ảnh
- ✅ Bandwidth miễn phí
- ✅ Dễ quản lý ảnh riêng biệt