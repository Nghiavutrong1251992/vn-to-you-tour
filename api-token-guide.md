# 🛠️ Cách tạo API Token cho Cloudflare R2

## Vấn đề hiện tại:
- wrangler login bị lỗi OAuth
- Cần tạo API token thủ công

## Hướng dẫn tạo API Token:

### Bước 1: Truy cập Cloudflare Dashboard
1. Mở: https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Chọn "Create Custom token"

### Bước 2: Cấu hình Token
**Token name:** `VN-to-You-Tour-R2`

**Permissions - Cách 1 (Nếu có R2):**
- Account: Cloudflare R2:Edit
- Account: Account:Read
- Zone: Zone:Read (optional - cho custom domain)

**Permissions - Cách 2 (Nếu không thấy R2 riêng):**
- Account: **All Account permissions** (hoặc **Account:Edit**)
- Zone: Zone:Read (optional)

**Permissions - Cách 3 (Tìm trong danh sách):**
Tìm kiếm các tên khác có thể có:
- "Object Storage"
- "R2 Storage" 
- "Storage"
- "Files"

**Account Resources:**
- Include: All accounts (hoặc chọn account cụ thể)

**Zone Resources:**
- Include: All zones (hoặc chọn domain cụ thể nếu có)

### Bước 3: Lưu token và setup
```bash
# Export token (thay YOUR_API_TOKEN bằng token thực)
$env:CLOUDFLARE_API_TOKEN = "YOUR_API_TOKEN"

# Hoặc tạo file .env
echo "CLOUDFLARE_API_TOKEN=YOUR_API_TOKEN" > .env
```

### Bước 4: Test connection
```bash
wrangler whoami
```

## Plan B: Sử dụng Cloudflare Dashboard
Nếu CLI vẫn có vấn đề, chúng ta có thể:
1. Upload ảnh qua Dashboard UI
2. Hoặc sử dụng REST API trực tiếp
3. Hoặc setup sau khi resolve vấn đề CLI

## Tiếp theo:
Sau khi có token, chúng ta sẽ:
1. Tạo R2 bucket
2. Upload ảnh batch
3. Update code để dùng R2 URLs