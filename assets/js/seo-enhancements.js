// SEO Enhancement Functions
(function() {
    'use strict';
    
    // Dynamic meta tag updates for better SEO
    window.VNToYouSEO = {
        // Update page title dynamically
        updateTitle: function(title, suffix = ' | VN to You Tour') {
            document.title = title + suffix;
        },
        
        // Update meta description dynamically  
        updateDescription: function(description) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', description);
            } else {
                metaDesc = document.createElement('meta');
                metaDesc.name = 'description';
                metaDesc.content = description;
                document.head.appendChild(metaDesc);
            }
        },
        
        // Update canonical URL
        updateCanonical: function(url) {
            let canonical = document.querySelector('link[rel="canonical"]');
            if (canonical) {
                canonical.href = url;
            } else {
                canonical = document.createElement('link');
                canonical.rel = 'canonical';
                canonical.href = url;
                document.head.appendChild(canonical);
            }
        },
        
        // Add structured data for tours
        addTourStructuredData: function(tourData) {
            const structuredData = {
                "@context": "https://schema.org",
                "@type": "TouristTrip",
                "name": tourData.title,
                "description": tourData.description,
                "image": tourData.image,
                "url": window.location.href,
                "provider": {
                    "@type": "TravelAgency",
                    "name": "VN to You Tour",
                    "url": "https://vn-to-you-tour.vercel.app"
                },
                "touristType": tourData.groupSize || "Private Group",
                "itinerary": {
                    "@type": "ItemList",
                    "name": tourData.title + " Itinerary",
                    "numberOfItems": tourData.duration?.days || 1
                },
                "offers": {
                    "@type": "Offer",
                    "category": "Travel Package",
                    "availability": "https://schema.org/InStock",
                    "priceRange": tourData.priceRange || "$$"
                },
                "duration": tourData.duration?.display,
                "startDate": "2025-01-01",
                "endDate": "2025-12-31"
            };
            
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(structuredData);
            document.head.appendChild(script);
        },
        
        // Add breadcrumb structured data
        addBreadcrumbStructuredData: function(breadcrumbs) {
            const structuredData = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbs.map((crumb, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": crumb.name,
                    "item": crumb.url
                }))
            };
            
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(structuredData);
            document.head.appendChild(script);
        },
        
        // Add FAQ structured data
        addFAQStructuredData: function(faqs) {
            const structuredData = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                    }
                }))
            };
            
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(structuredData);
            document.head.appendChild(script);
        },
        
        // Generate meta keywords from content
        generateKeywords: function(content) {
            const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'can', 'may', 'might', 'must', 'shall', 'a', 'an'];
            const words = content.toLowerCase()
                .replace(/[^\w\s]/g, '')
                .split(/\s+/)
                .filter(word => word.length > 3 && !commonWords.includes(word));
            
            const wordCount = {};
            words.forEach(word => {
                wordCount[word] = (wordCount[word] || 0) + 1;
            });
            
            return Object.keys(wordCount)
                .sort((a, b) => wordCount[b] - wordCount[a])
                .slice(0, 10)
                .join(', ');
        },
        
        // Optimize images for SEO
        optimizeImages: function() {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                // Add loading="lazy" if not already present
                if (!img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
                
                // Ensure alt text is present
                if (!img.alt && img.src.includes('tour') || img.src.includes('vietnam')) {
                    img.alt = 'Vietnam tour experience - VN to You Tour';
                }
            });
        },
        
        // Add social media meta tags dynamically
        updateSocialMeta: function(data) {
            const updateMeta = (property, content) => {
                let meta = document.querySelector(`meta[property="${property}"]`);
                if (meta) {
                    meta.content = content;
                } else {
                    meta = document.createElement('meta');
                    meta.setAttribute('property', property);
                    meta.content = content;
                    document.head.appendChild(meta);
                }
            };
            
            if (data.title) updateMeta('og:title', data.title);
            if (data.description) updateMeta('og:description', data.description);
            if (data.image) updateMeta('og:image', data.image);
            if (data.url) updateMeta('og:url', data.url);
        }
    };
    
    // Auto-optimize on page load
    document.addEventListener('DOMContentLoaded', function() {
        VNToYouSEO.optimizeImages();
        
        // Add default breadcrumbs for main pages
        const path = window.location.pathname;
        if (path.includes('/pages/')) {
            const pageName = path.split('/').pop().replace('.html', '').replace('-', ' ');
            const breadcrumbs = [
                { name: 'Home', url: 'https://vn-to-you-tour.vercel.app/' },
                { name: pageName.charAt(0).toUpperCase() + pageName.slice(1), url: window.location.href }
            ];
            VNToYouSEO.addBreadcrumbStructuredData(breadcrumbs);
        }
    });
    
})();