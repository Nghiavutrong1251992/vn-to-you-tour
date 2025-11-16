# VN to You Tour Website

Trang web công ty du lịch VN to You Tour với hosting trên Cloudflare Pages và quản lý ảnh thông qua CDN.

## 🚀 Quy trình làm việc

### 1. Viết bài/Chỉnh sửa nội dung
```bash
# Chỉnh sửa file HTML, CSS, JS
# Ảnh để trong thư mục assets/images/
```

### 2. Commit và Push lên Git
```bash
git add .
git commit -m "Mô tả thay đổi"
git push
```

### 3. Deploy tự động
- Cloudflare Pages tự động build và deploy từ Git
- Website live tại: https://main.vn-to-you-tour.pages.dev
- Ảnh được serve từ CDN: /assets/images/

## 📁 Cấu trúc dự án

```
📂 vn-to-you-tour/
├── 📄 index.html           # Trang chủ
├── 📂 pages/              # Các trang con
├── 📂 assets/             # CSS, JS, Images
├── 📂 includes/           # Header, Footer components
└── 📂 templates/          # Template files
```

## 🖼️ Quản lý ảnh

- **Thêm ảnh**: Đặt vào `assets/images/`
- **Sử dụng**: `src="/assets/images/filename.jpg"`
- **CDN**: Tự động optimize qua Cloudflare
- **Format**: Ưu tiên JPG/WebP, tránh space trong tên file

## ⚡ Lệnh nhanh

```bash
# Deploy manual (nếu cần)
wrangler pages deploy . --project-name=vn-to-you-tour

# Check status
git status
```

---
**Website**: https://main.vn-to-you-tour.pages.dev  
**GitHub**: https://github.com/Nghiavutrong1251992/vn-to-you-tour

### Windows PowerShell: add or rename image

If your image file has spaces, use PowerShell to rename and copy the file to the right folder:

```powershell
# From the folder containing the image
Rename-Item -Path "vnn 301.jpg" -NewName "vnn301.jpg"
# Copy to the project's tours images folder (adjust path as needed)
Copy-Item -Path "vnn301.jpg" -Destination "f:\CÁC DỰ ÁN  LẬP TRÌNH\basic 1.2\assets\images\tours\"
```

After copying, commit changes and refresh your local server. Then open the tour detail:

http://localhost:8000/pages/private-tour-detail.html?id=vnn301

## Technologies Used

- HTML5
- CSS3 (Inter font, Font Awesome icons)
- Vanilla JavaScript (ES6+)
- Responsive design principles