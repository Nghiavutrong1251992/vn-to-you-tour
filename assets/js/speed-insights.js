// Vercel Speed Insights
(function() {
    // Only load on production (vercel domain)
    if (window.location.hostname.includes('vercel.app') || 
        window.location.hostname === 'vntoyoutour.com' ||
        window.location.hostname === 'www.vntoyoutour.com') {
        
        var script = document.createElement('script');
        script.src = 'https://va.vercel-scripts.com/v1/speed-insights/script.js';
        script.dataset.endpoint = 'https://va.vercel-scripts.com/v1/speed-insights';
        script.async = true;
        document.head.appendChild(script);
        
        console.log('Vercel Speed Insights loaded');
    }
})();