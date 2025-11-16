# VN to You Tour Website

Trang web công ty du lịch VN to You Tour với hosting trên Vercel và quản lý ảnh tối ưu.

## Cấu trúc dự án

```
/
 index.html              # Trang chủ
 pages/                  # Các trang HTML
 assets/                 # Static files
    css/               # CSS files
    js/                # JavaScript files
    images/            # Hình ảnh
 includes/              # HTML components
 templates/             # HTML templates
```

## Workflow

### 1. Phát triển local
- Chỉnh sửa code trong VS Code
- Test local với Live Server

### 2. Deployment
- Push code lên GitHub
- Vercel tự động build và deploy từ Git
- Website live tại: https://vn-to-you-tour.vercel.app

## Tính năng chính

###  **Responsive Design**
- Mobile-first approach
- Tối ưu cho mọi thiết bị

###  **Image Management**
- **Storage**: Vercel hosting
- **CDN**: Tự động optimize qua Vercel
- **Loading**: Lazy loading cho performance

## Quick Deploy

```bash
# Deploy tự động qua Git
git add .
git commit -m "Update content"
git push origin main
```

## Links quan trọng

**Website**: https://vn-to-you-tour.vercel.app  
**GitHub**: https://github.com/Nghiavutrong1251992/vn-to-you-tour  
**Vercel Dashboard**: https://vercel.com/dashboard

## Content Management

### Thêm bài viết mới
1. Edit `assets/js/data/articles-data.js`
2. Thêm ảnh vào `assets/images/articles/`
3. Commit và push lên Git
4. Vercel tự động deploy

### Cập nhật tours
1. Edit `assets/js/data/daily-tours-data.js` hoặc `private-tours-data.js`
2. Thêm ảnh tour vào `assets/images/tours/`
3. Commit và push

**Workflow tối ưu:** Content Creation  Git Commit  Auto Deploy  Live Updates 
