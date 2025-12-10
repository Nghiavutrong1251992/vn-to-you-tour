// Vercel Speed Insights & Analytics
(function() {
    // Only load on production (vercel domain)
    if (window.location.hostname.includes('vercel.app') || 
        window.location.hostname === 'vntoyoutour.com' ||
        window.location.hostname === 'www.vntoyoutour.com') {
        
        // Speed Insights
        var speedScript = document.createElement('script');
        speedScript.src = 'https://va.vercel-scripts.com/v1/speed-insights/script.js';
        speedScript.dataset.endpoint = 'https://va.vercel-scripts.com/v1/speed-insights';
        speedScript.async = true;
        document.head.appendChild(speedScript);
        
        // Analytics (already loaded in head, but ensure it's working)
        console.log('Vercel Analytics & Speed Insights loaded');
        
        // Track page views for SPA-like navigation
        window.addEventListener('popstate', function() {
            if (window.va) {
                window.va.track('pageview');
            }
        });
    }
})();