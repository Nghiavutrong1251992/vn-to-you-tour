// Image Optimization Utilities
// Add lazy loading and optimize image delivery

document.addEventListener('DOMContentLoaded', function() {
    // Add lazy loading to all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Add error fallback
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            // Could add placeholder image here
            this.style.backgroundColor = '#f0f0f0';
            this.alt = 'Image not available';
        });
    });

    // Optimize images based on device
    function optimizeImageSources() {
        const teamPhotos = document.querySelectorAll('.team-photo');
        const isHighDPI = window.devicePixelRatio > 1;
        const isMobile = window.innerWidth < 768;

        teamPhotos.forEach(img => {
            const src = img.src;
            
            // If using optimized folder structure
            if (src.includes('/team/')) {
                let optimizedSrc = src;
                
                // Use smaller images on mobile
                if (isMobile) {
                    optimizedSrc = src.replace('/team/', '/team/mobile/');
                }
                
                // Check if optimized version exists
                const testImg = new Image();
                testImg.onload = function() {
                    img.src = optimizedSrc;
                };
                testImg.src = optimizedSrc;
            }
        });
    }

    // Run optimization
    optimizeImageSources();

    // Re-optimize on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(optimizeImageSources, 250);
    });
});

// Cloudflare R2 Image URL generator
function getOptimizedImageUrl(imagePath, options = {}) {
    const baseUrl = 'https://vn-to-you-images.your-account.r2.cloudflarestorage.com/';
    const { width = null, quality = 80, format = 'auto' } = options;
    
    let url = baseUrl + imagePath;
    
    // Add Cloudflare Image Resizing parameters if supported
    if (width) {
        url += `?width=${width}&quality=${quality}&format=${format}`;
    }
    
    return url;
}

// Usage example:
// const optimizedUrl = getOptimizedImageUrl('team/thong.png', { width: 300, quality: 70 });

console.log('Image optimization utilities loaded');