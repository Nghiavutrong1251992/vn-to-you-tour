# 🚨 R2 Image Loading Issues - Troubleshooting Guide

## ❌ VẤN ĐỀ HIỆN TẠI:
- Website deploy thành công: ✅
- R2 URLs trả về 404 Not Found: ❌

## 🔍 NGUYÊN NHÂN CÓ THỂ:

### 1. R2 Bucket chưa Public
**CHECK**: Cloudflare Dashboard → R2 → Bucket Settings
- [ ] **Public access** phải được ENABLE
- [ ] **Custom domain** phải active

### 2. Cấu trúc folder sai
**CHECK**: Folder structure trong R2 bucket
```
Expected:
vntoyou-slide-home/
team/  
general/
tours/
articles/

Current: ???
```

### 3. File names không match
**CHECK**: Tên file có thể khác
- Dấu cách → %20 hoặc _
- Case sensitive issues
- File extensions (.jpg vs .png)

## 🛠️ SOLUTIONS:

### SOLUTION 1: Enable Public Access
1. Cloudflare Dashboard → R2 
2. Click bucket: `pub-1a7ccc534e4045ffbc5393ba23ff9588.r2.dev`
3. Settings → **Allow Access** → **Enable**
4. Domain Settings → **Enable** custom domain

### SOLUTION 2: Check File Structure
```bash
# Test root access
https://pub-1a7ccc534e4045ffbc5393ba23ff9588.r2.dev/

# Should show XML listing or files
```

### SOLUTION 3: Re-upload với structure đúng
Upload lại với đúng paths:
```
bucket-root/
├── vntoyou-slide-home/
│   ├── vntoyou slide 1 - The Huc Bridge.jpg
│   ├── vntoyou slide 2 - Muong Hoa Train...jpg
│   └── vntoyou slide 3 - Cat Cat Village.jpg
├── team/
│   ├── thong.png
│   └── ...
└── general/
    └── logo.png
```

## 🎯 ACTION ITEMS:
1. **Check R2 public access** ← START HERE
2. **Verify file structure in bucket**
3. **Test root URL access**
4. **Re-upload if needed**

---
**Priority: Fix R2 public access first!** 🚨