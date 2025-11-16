# VN to You Tour - Vercel Deployment

## Deployment Instructions

### 1. Vercel Setup
1. Visit [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Import project: `Nghiavutrong1251992/vn-to-you-tour`

### 2. Configuration
- **Framework Preset:** Other
- **Root Directory:** ./
- **Build Command:** (leave empty)
- **Output Directory:** ./
- **Install Command:** (leave empty)

### 3. Environment Variables
None required for static site

### 4. Custom Domain (Optional)
- Add your domain in Vercel dashboard
- Update DNS to point to Vercel

## Project Structure
```
/
├── index.html          # Homepage
├── pages/              # HTML pages
├── assets/             # Static assets
│   ├── css/           # Stylesheets  
│   ├── js/            # JavaScript
│   └── images/        # Images
├── includes/          # HTML components
└── templates/         # HTML templates
```

## Auto-Deploy
- Push to `main` branch triggers automatic deployment
- Build time: ~30 seconds
- No build process required (static HTML/CSS/JS)

## URLs After Deploy
All image paths use Vercel domain for optimal performance and unlimited bandwidth.