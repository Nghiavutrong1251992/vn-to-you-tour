# Analytics Setup Guide - VN to You Tour

## 📊 Analytics Đã Setup

Website hiện đã được tích hợp với 2 hệ thống analytics mạnh nhất:

### 1. ✅ Vercel Analytics (Đã setup)
- **Auto-tracking**: Page views, unique visitors, top pages
- **Real-time data**: Live visitor count 
- **Geographic insights**: Countries, cities
- **Referrer tracking**: Traffic sources
- **Performance metrics**: Load times, bounce rate

### 2. ✅ Google Analytics 4 (Cần setup ID)
- **Advanced tracking**: User behavior, conversion funnels
- **Enhanced ecommerce**: Tour inquiry tracking
- **Custom events**: Contact form submissions, downloads
- **Audience insights**: Demographics, interests
- **Goal tracking**: Business objectives

## 🔧 Cần Setup

### Bước 1: Tạo Google Analytics Property
1. Truy cập: https://analytics.google.com
2. Tạo Account → Property mới
3. Chọn "Web" platform
4. Copy **Measurement ID** (dạng G-XXXXXXXXXX)

### Bước 2: Update Website Code
Thay thế `G-XXXXXXXXXX` bằng ID thật trong các files:
- `index.html`
- `pages/golf-tour.html` 
- `templates/private-tour-template.html`
- `templates/article-template.html`
- Và tất cả pages khác

### Bước 3: Deploy lên Vercel
```bash
git add .
git commit -m "Add comprehensive analytics tracking"
git push origin main
```

## 📈 Dữ Liệu Sẽ Tracking

### Vercel Analytics Dashboard:
- **Page Views**: Số lượt xem trang
- **Unique Visitors**: Visitors duy nhất
- **Top Pages**: Trang phổ biến nhất
- **Countries**: Quốc gia truy cập
- **Referrers**: Nguồn traffic

### Google Analytics Dashboard:
- **Real-time users**: Users online hiện tại
- **Tour inquiries**: Clicks vào tour details
- **Contact tracking**: Email, WhatsApp, Phone clicks
- **Scroll depth**: Mức độ đọc content
- **Time on page**: Thời gian ở lại trang
- **External links**: Clicks ra ngoài website

## 🎯 Enhanced Features Đã Add:

### Auto Event Tracking:
```javascript
// Track tour inquiry
VNToYouAnalytics.trackTourInquiry('Sapa 3 Days', 'Private Tour');

// Track contact methods  
VNToYouAnalytics.trackContact('whatsapp');

// Track file downloads
VNToYouAnalytics.trackDownload('brochure.pdf');
```

### Smart Tracking:
- ✅ External link clicks
- ✅ Email/WhatsApp/Phone clicks  
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Time spent on page
- ✅ Tour page engagement

## 🚀 Truy Cập Analytics:

### Vercel Dashboard:
1. Login: https://vercel.com/dashboard
2. Select project: "vn-to-you-tour"
3. Tab "Analytics"

### Google Analytics:
1. Login: https://analytics.google.com
2. Select property
3. Explore real-time & detailed reports

## ⚡ Lợi Ích:

- **Real-time monitoring**: Xem visitors live
- **Business insights**: Tours nào được quan tâm nhất
- **Marketing optimization**: Nguồn traffic hiệu quả
- **User behavior**: Cải thiện UX based on data
- **ROI tracking**: Đo lường hiệu quả business

Sau khi setup Google Analytics ID, bạn sẽ có dashboard analytics hoàn chỉnh trong 24-48h!