# Travel Guide Creation Guide - VN to You Tour

## 📝 Hướng dẫn tạo bài viết Travel Guide mới

### 1. File cần chỉnh sửa
**File chính:** `assets/js/data/travel-guides-data.js`

### 2. Cách thêm bài viết mới

#### Bước 1: Thêm dữ liệu vào travel-guides-data.js
Mở file `assets/js/data/travel-guides-data.js` và thêm object mới vào mảng `travelGuidesData`:

```javascript
{
    id: 'ten-bai-viet-unique',                // ID duy nhất (không trùng lặp)
    title: 'Tiêu đề bài viết',                // Tiêu đề hiển thị
    description: 'Mô tả ngắn gọn về bài viết, khoảng 100-150 ký tự.',  // Mô tả
    image: 'https://images.unsplash.com/photo-xxxxx?w=500&h=300&fit=crop&center',   // URL hình ảnh
    url: 'destinations/region/ten-file.html',                          // Đường dẫn (KHÔNG có pages/)
    category: 'Northern Vietnam',             // Danh mục: Northern Vietnam, Central Vietnam, Southern Vietnam, Food & Culture
    featured: true,                          // true = nổi bật, false = bình thường
    publishDate: '2025-12-12',              // Ngày xuất bản (YYYY-MM-DD)
    readTime: '8 min'                       // Thời gian đọc ước tính
},
```

#### Bước 2: Tạo file HTML bài viết
**Cấu trúc thư mục:**
- **Northern Vietnam:** `pages/destinations/northern-vietnam/`
- **Central Vietnam:** `pages/destinations/central-vietnam/`
- **Southern Vietnam:** `pages/destinations/southern-vietnam/`
- **Food & Culture:** `pages/destinations/`

**Template file HTML:** Sao chép từ `sapa-attractions-guide.html` và chỉnh sửa:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tiêu đề SEO - Destination Guide | VN to You Tour</title>
    <meta name="description" content="Mô tả SEO chi tiết cho bài viết.">
    <meta name="keywords" content="keywords, liên quan, đến bài viết">
    <!-- ... các meta tags khác ... -->
</head>
```

#### Bước 3: Cấu trúc nội dung bài viết

**Hero Section:**
- Gradient background với title và description
- Breadcrumb navigation
- Responsive design

**Main Content:**
- Table of Contents (mục lục)
- Article meta (ngày xuất bản, thời gian đọc)
- Sections với h2, h3 headings
- Section dividers
- CTA section cuối bài
- Related articles

**Template cơ bản:**
```html
<!-- Hero Section -->
<section style="background: gradient...">
    <h1>Tiêu đề bài viết</h1>
    <p>Mô tả ngắn</p>
</section>

<!-- Content -->
<div class="content-container">
    <!-- Table of Contents -->
    <div style="border-left: 4px solid var(--brand-primary)...">
        <h3>Table of Contents</h3>
        <ol>
            <li><a href="#section1">Section 1</a></li>
            <li><a href="#section2">Section 2</a></li>
        </ol>
    </div>

    <!-- Sections -->
    <section id="section1">
        <h2>Section Title</h2>
        <p>Nội dung...</p>
    </section>

    <hr class="section-divider">

    <section id="section2">
        <h2>Section Title 2</h2>
        <p>Nội dung...</p>
    </section>
</div>
```

### 3. Automatic Display

Sau khi thêm vào `travel-guides-data.js`, bài viết sẽ tự động hiển thị:

✅ **Trang chủ** - Random 3 bài viết  
✅ **Vietnam Travel Guide page** - Tất cả bài viết  
✅ **Related articles** - Trong các bài khác  

### 4. Best Practices

#### Content Writing:
- **Title:** Rõ ràng, có keywords chính
- **Description:** 100-150 ký tự, hấp dẫn
- **Content:** Chia thành sections rõ ràng
- **Images:** Sử dụng Unsplash với kích thước 500x300px
- **Reading time:** Tính khoảng 200 từ/phút

#### SEO Optimization:
- Meta title < 60 ký tự
- Meta description < 160 ký tự  
- H1, H2, H3 hierarchy đúng
- Alt text cho images
- Internal linking
- Structured data (JSON-LD)

#### Technical:
- Responsive design
- Fast loading images
- Clean URLs
- Proper breadcrumb navigation

### 5. Categories Available

1. **Northern Vietnam**
   - Hanoi, Sapa, Halong Bay, Ninh Binh, etc.

2. **Central Vietnam**  
   - Hoi An, Hue, Da Nang, Phong Nha, etc.

3. **Southern Vietnam**
   - Ho Chi Minh City, Mekong Delta, Phu Quoc, etc.

4. **Food & Culture**
   - Vietnamese cuisine, cultural guides, festivals, etc.

### 6. Image Guidelines

**Recommended sources:**
- Unsplash (https://unsplash.com)
- Format: `?w=500&h=300&fit=crop&center`
- Aspect ratio: 5:3 (500x300px)
- High quality, relevant to content

**Example URLs:**
```
https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=500&h=300&fit=crop&center
```

### 7. Deploy Process

1. **Add to travel-guides-data.js** ✅
2. **Create HTML file** ✅  
3. **Test locally** ✅
4. **Git commit & push** ✅
5. **Auto-deploy via Vercel** ✅

### 8. File Structure Example

```
pages/
├── destinations/
│   ├── northern-vietnam/
│   │   ├── sapa-attractions-guide.html
│   │   ├── hanoi-attractions-guide.html
│   │   └── halong-bay-cruise-guide.html
│   ├── central-vietnam/
│   │   ├── hoi-an-guide.html
│   │   └── hue-imperial-guide.html
│   ├── southern-vietnam/
│   │   ├── ho-chi-minh-city-guide.html
│   │   └── mekong-delta-guide.html
│   └── vietnam-food-guide.html
└── vietnam-travel-guide.html (hub page)
```

### 9. Quick Checklist

**Before publishing:**
- [ ] Added to travel-guides-data.js
- [ ] HTML file created in correct folder
- [ ] SEO meta tags complete
- [ ] Table of contents working
- [ ] Images loading properly
- [ ] Internal links working
- [ ] Breadcrumb navigation correct
- [ ] CTA section included
- [ ] Tested on mobile/desktop

**After publishing:**
- [ ] Check homepage random display
- [ ] Verify travel guide hub page
- [ ] Test all internal links
- [ ] Monitor analytics data

---

## 💡 Tips

- **Consistency:** Sử dụng cùng một template design
- **Quality:** Nội dung chất lượng cao, có giá trị
- **Updates:** Cập nhật thông tin thường xuyên
- **Performance:** Optimize images và loading speed
- **User Experience:** Easy navigation và clear structure

---

**Chỉ cần 1 file duy nhất để quản lý tất cả travel guides!** 🎉