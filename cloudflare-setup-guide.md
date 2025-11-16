# 🚀 Hướng dẫn Setup Cloudflare R2 cho VN to You Tour

## Bước 1: Login Cloudflare
```bash
wrangler auth login
```
> Lệnh này sẽ mở browser để login vào Cloudflare dashboard

## Bước 2: Tạo R2 Bucket
```bash
wrangler r2 bucket create vn-to-you-tour-images
```

## Bước 3: Kiểm tra bucket đã tạo
```bash
wrangler r2 bucket list
```

## Bước 4: Test upload 1 file
```bash
wrangler r2 object put vn-to-you-tour-images/test.jpg --file="assets/images/general/logo.png"
```

## Bước 5: Kiểm tra URL
Sau khi upload, bạn có thể access ảnh qua:
```
https://[account-id].r2.cloudflarestorage.com/vn-to-you-tour-images/test.jpg
```

## Lưu ý quan trọng:
- Account ID sẽ xuất hiện sau khi login
- Cần enable public access cho bucket nếu muốn truy cập trực tiếp
- R2 URLs có thể setup custom domain sau

## Chi phí ước tính:
- 102 ảnh (~50MB): Miễn phí (10GB free tier)
- Bandwidth: Miễn phí hoàn toàn
- Requests: Rất rẻ (~$0.01/tháng)