# 🚀 Cloudflare Pages Deployment Guide

## ✅ TRẠNG THÁI HIỆN TẠI:
- [x] Code đã push lên GitHub
- [x] URLs updated to R2: pub-1a7ccc534e4045ffbc5393ba23ff9588.r2.dev  
- [x] Images uploaded to R2 bucket

## 📋 DEPLOY TO CLOUDFLARE PAGES:

### 1. Truy cập Cloudflare Dashboard
```
https://dash.cloudflare.com/
```

### 2. Tạo Pages Project
1. Click **"Pages"** trong sidebar
2. Click **"Create a project"** 
3. Chọn **"Connect to Git"**

### 3. Connect GitHub Repository
1. Authorize GitHub nếu chưa
2. Chọn repository: **`Nghiavutrong1251992/vn-to-you-tour`**
3. Click **"Begin setup"**

### 4. Configure Build Settings
```
Project name: vn-to-you-tour
Production branch: main
Framework preset: None
Build command: (để trống - static site)
Build output directory: / (root directory)
```

### 5. Environment Variables (không cần)
Skip - static website không cần env vars

### 6. Deploy!
- Click **"Save and Deploy"**
- Đợi vài phút để build

## 🔍 AFTER DEPLOYMENT:

### Test URLs sau khi deploy:
1. **Homepage**: https://vn-to-you-tour.pages.dev
2. **Image test**: Check slideshow có hiển thị ảnh không
3. **Console check**: F12 xem có lỗi 404 không

### Expected Result:
- ✅ Website load nhanh (static hosting)
- ✅ Images load từ R2 CDN  
- ✅ No 404 errors
- ✅ Global performance boost

## 🚨 TroubleShooting:
Nếu ảnh không hiển thị:
1. Check R2 bucket public access
2. Verify image URLs in browser
3. Check console for CORS errors

---
**Next**: Test deployed site và báo kết quả! 🎯