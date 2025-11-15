# NEW PROJECT CHECKLIST - Cloudflare Images

## Pre-Development (Planning Phase)
- [ ] Estimate total images needed (team, products, gallery, etc.)
- [ ] Choose strategy: Pages (<50 images) vs R2 (50-500) vs Images (500+)
- [ ] Create folder structure: team/, products/, gallery/, banners/, icons/

## During Development  
- [ ] Optimize images locally first (TinyPNG/Squoosh)
- [ ] Use consistent naming: lowercase, no spaces, descriptive
- [ ] Test with Cloudflare Pages initially (free tier)

## When Ready for R2 Migration
- [ ] Run: wrangler r2 bucket create project-name-images
- [ ] Batch upload: Use the PowerShell script above
- [ ] Update all HTML/CSS paths to R2 URLs
- [ ] Test image loading from R2
- [ ] Delete local images from assets/ (optional)

## Production Optimization
- [ ] Set up custom domain for images (images.yoursite.com)
- [ ] Configure Cloudflare CDN caching rules
- [ ] Monitor bandwidth usage in R2 dashboard
- [ ] Consider Cloudflare Images upgrade if needed

## Cost Management
- Pages: $0 (limited to 25MB per file, 500 files total)
- R2: 10GB FREE/month, then $0.015/GB + $0 egress (free worldwide bandwidth!)
- Images: $5/month for 100k images + auto-optimization + unlimited storage

## Best Practices
- Always compress images before upload (save 70-90%)
- Use WebP format when possible (30% smaller than JPG)
- Implement lazy loading: <img loading="lazy">
- Test on mobile/slow connections
- Keep original images backed up locally