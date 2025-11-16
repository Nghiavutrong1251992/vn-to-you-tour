# ================================================
# VN to You Tour - Hướng dẫn thủ công Migration R2
# ================================================

## 🗑️ BƯỚC 1: XÓA DỮ LIỆU CŨ TRONG R2

### Cách 1: Qua Cloudflare Dashboard (Khuyến nghị)
1. **Truy cập**: https://dash.cloudflare.com/
2. **Vào R2**: Sidebar > R2 Object Storage
3. **Chọn bucket** có domain: pub-78ce1b03a58f41af8c07b897b9438589.r2.dev
4. **Xóa tất cả**:
   - Chọn "Select all objects" 
   - Click "Delete"
   - Confirm deletion

### Cách 2: Qua Wrangler CLI (Nếu có thể login)
```bash
# Xem bucket hiện tại
wrangler r2 bucket list

# Xóa tất cả objects trong bucket
wrangler r2 object delete YOUR_BUCKET_NAME --recursive

# Hoặc xóa từng file
wrangler r2 object delete YOUR_BUCKET_NAME/path/to/file.jpg
```

## 📤 BƯỚC 2: UPLOAD ẢNH THỦ CÔNG

### Qua Cloudflare Dashboard:
1. **Vào R2 bucket** của bạn
2. **Click "Upload"**
3. **Kéo thả hoặc chọn files** từ folder: `E:\basic 1.2\assets\images\`
4. **Giữ cấu trúc thư mục**:
   ```
   articles/
   general/
   team/
   tours/
   vntoyou-slide-home/
   ```

### Lưu ý quan trọng:
- ✅ Giữ nguyên tên file và đường dẫn
- ✅ Upload từng folder một để đảm bảo cấu trúc
- ✅ Kiểm tra file được upload đúng chưa

## 🔗 BƯỚC 3: KIỂM TRA URLs

Sau khi upload, test URLs này:
- https://pub-78ce1b03a58f41af8c07b897b9438589.r2.dev/general/logo.png
- https://pub-78ce1b03a58f41af8c07b897b9438589.r2.dev/vntoyou-slide-home/vntoyou%20slide%201%20-%20The%20Huc%20Bridge.jpg
- https://pub-78ce1b03a58f41af8c07b897b9438589.r2.dev/team/thong.png

## 🛠️ BƯỚC 4: UPDATE CODE

Chạy lệnh này để update tất cả URLs:
```powershell
# Backup trước
Copy-Item -Recurse -Path "." -Destination "../vn-to-you-tour-backup"

# Update URLs
.\update-urls.ps1 -R2Domain "pub-78ce1b03a58f41af8c07b897b9438589.r2.dev" -DryRun

# Nếu OK thì chạy thật:
.\update-urls.ps1 -R2Domain "pub-78ce1b03a58f41af8c07b897b9438589.r2.dev"
```

## ✅ BƯỚC 5: TEST VÀ DEPLOY

1. **Test local**: Mở index.html kiểm tra ảnh load được không
2. **Deploy to Cloudflare Pages**:
   - Connect GitHub repo
   - Auto deploy

## 📊 Lợi ích sau khi hoàn thành:
- ⚡ Tốc độ load ảnh nhanh hơn (CDN toàn cầu)
- 💰 Tiết kiệm băng thông (miễn phí)
- 📱 Tối ưu cho mobile
- 🚀 Git repo nhẹ hơn (không có ảnh)