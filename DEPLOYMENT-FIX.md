# 🚨 Cloudflare Pages Deployment Fix

## ❌ LỖII DEPLOY:
```
Failed: error occurred while running deploy command
```

## ✅ SOLUTION - Deploy qua Dashboard:

### CÁCH 1: Cloudflare Dashboard (Recommended)
1. **Truy cập**: https://dash.cloudflare.com/
2. **Pages** → **Create a project**  
3. **Connect to Git** → Chọn GitHub
4. **Select repository**: `Nghiavutrong1251992/vn-to-you-tour`

### Build Settings:
```
Project name: vn-to-you-tour
Production branch: main
Framework preset: None (Static site)
Build command: (leave empty)
Build output directory: / (root)
```

### CÁCH 2: Manual Upload (Backup)
Nếu Git connection fail:
1. **Pages** → **Upload assets**
2. Zip toàn bộ project (trừ .git, node_modules)
3. Drag & drop lên Dashboard

## 🔧 Config Files Added:
- `_headers` - Security headers ✅
- `_redirects` - SPA routing ✅  
- `wrangler.toml` - Build config ✅

## 🎯 Expected Result:
- **URL**: https://vn-to-you-tour.pages.dev
- **Images**: Load từ R2 CDN
- **Performance**: Significantly faster

---
**Try Dashboard deployment now!** 🚀