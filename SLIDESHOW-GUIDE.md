# Hướng dẫn quản lý Hero Slideshow

## Cấu trúc hiện tại

Hero slideshow có **3 slides** được đánh số rõ ràng:

### Slide 1: The Huc Bridge
```html
<div class="hero-slide slide-1 active">
    <img src="assets/images/vntoyou-slide-home/vntoyou slide 1 - The Huc Bridge.jpg">
    <div class="slide-caption glass-light">
        <h2>The Huc Bridge</h2>
        <p>Iconic red bridge connecting to Ngoc Son Temple in Hanoi's Hoan Kiem Lake</p>
    </div>
</div>
```

### Slide 2: Muong Hoa Train  
```html
<div class="hero-slide slide-2">
    <img src="assets/images/vntoyou-slide-home/vntoyou slide 2 - Muong Hoa Train to Fansipan Cable Car Station.jpg">
    <div class="slide-caption glass-light">
        <h2>Muong Hoa Train to Fansipan</h2>
        <p>Scenic mountain railway journey to Vietnam's highest peak cable car station</p>
    </div>
</div>
```

### Slide 3: Cat Cat Village
```html
<div class="hero-slide slide-3">
    <img src="assets/images/vntoyou-slide-home/vntoyou slide 3 - Cat Cat Village.jpg">
    <div class="slide-caption glass-light">
        <h2>Cat Cat Village</h2>
        <p>Traditional H'mong village in Sapa with authentic cultural experiences</p>
    </div>
</div>
```

## CSS chung cho tất cả slides

**Tất cả hero-slide** đều sử dụng cùng 1 bộ CSS:
- `object-fit: cover` - Ảnh phủ đầy không bị méo
- `object-position: center center` - Căn giữa hoàn hảo  
- `transform: scale(1.02)` - Phóng to nhẹ tránh black bars
- `filter: brightness(1.05) contrast(1.02) saturate(1.05)` - Tăng chất lượng visual

## Cách thay đổi ảnh slide

### 1. Thay đổi ảnh của slide bất kỳ:
- Tìm slide muốn thay (slide-1, slide-2, hoặc slide-3)
- Đổi `src` của tag `<img>` 
- Đổi `alt` attribute
- Cập nhật title và description trong `slide-caption`

### 2. Ví dụ thay slide 2:
```html
<!-- Từ -->
<div class="hero-slide slide-2">
    <img src="assets/images/vntoyou-slide-home/old-image.jpg" alt="Old Image">
    <div class="slide-caption glass-light">
        <h2>Old Title</h2>
        <p>Old description</p>
    </div>
</div>

<!-- Thành -->
<div class="hero-slide slide-2">
    <img src="assets/images/vntoyou-slide-home/new-image.jpg" alt="New Image">
    <div class="slide-caption glass-light">
        <h2>New Title</h2>
        <p>New description</p>
    </div>
</div>
```

## Nếu cần điều chỉnh CSS riêng cho slide nào đó

Sử dụng CSS selector riêng:
```css
/* Chỉ slide 1 */
.hero-slide.slide-1 img {
    object-position: center top; /* Ví dụ: focus lên trên */
}

/* Chỉ slide 2 */  
.hero-slide.slide-2 img {
    transform: scale(1.1); /* Ví dụ: phóng to hơn */
}

/* Chỉ slide 3 */
.hero-slide.slide-3 img {
    filter: brightness(1.1); /* Ví dụ: sáng hơn */
}
```

## Lưu ý quan trọng

- ✅ **Luôn giữ class `hero-slide`** - để CSS chung hoạt động
- ✅ **Slide đầu tiên cần class `active`** - để hiển thị khi load trang
- ✅ **Đặt ảnh trong folder `assets/images/vntoyou-slide-home/`**
- ✅ **Tên file ảnh nên có format: `vntoyou slide X - [Tên ảnh].jpg`**