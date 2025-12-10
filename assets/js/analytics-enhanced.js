// Google Analytics 4 Enhanced Tracking
(function() {
    'use strict';
    
    // Enhanced ecommerce and event tracking for tourism website
    window.VNToYouAnalytics = {
        // Track tour inquiries
        trackTourInquiry: function(tourName, tourType) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'tour_inquiry', {
                    'event_category': 'engagement',
                    'event_label': tourName,
                    'custom_parameter_1': tourType,
                    'value': 1
                });
            }
        },
        
        // Track contact form submissions
        trackContact: function(method) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact', {
                    'event_category': 'engagement',
                    'event_label': method, // email, whatsapp, phone, form
                    'value': 1
                });
            }
        },
        
        // Track page engagement
        trackEngagement: function(action, page) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_engagement', {
                    'event_category': 'engagement',
                    'event_label': action,
                    'page_location': page,
                    'value': 1
                });
            }
        },
        
        // Track file downloads
        trackDownload: function(fileName) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'file_download', {
                    'event_category': 'engagement',
                    'event_label': fileName,
                    'value': 1
                });
            }
        }
    };
    
    // Auto-track external link clicks
    document.addEventListener('click', function(e) {
        var link = e.target.closest('a');
        if (link && link.href) {
            var url = new URL(link.href, window.location.origin);
            
            // Track external links
            if (url.hostname !== window.location.hostname) {
                VNToYouAnalytics.trackEngagement('external_link', url.hostname);
            }
            
            // Track specific actions
            if (link.href.includes('mailto:')) {
                VNToYouAnalytics.trackContact('email');
            } else if (link.href.includes('whatsapp') || link.href.includes('wa.me')) {
                VNToYouAnalytics.trackContact('whatsapp');
            } else if (link.href.includes('tel:')) {
                VNToYouAnalytics.trackContact('phone');
            }
        }
    });
    
    // Track scroll depth
    var scrollDepth = 0;
    var scrollTracked = {};
    
    window.addEventListener('scroll', function() {
        var docHeight = Math.max(
            document.body.scrollHeight, document.body.offsetHeight,
            document.documentElement.clientHeight, document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        var winHeight = window.innerHeight || document.documentElement.clientHeight;
        var scrollPercent = Math.round((window.scrollY / (docHeight - winHeight)) * 100);
        
        // Track at 25%, 50%, 75%, 100%
        var milestones = [25, 50, 75, 100];
        milestones.forEach(function(milestone) {
            if (scrollPercent >= milestone && !scrollTracked[milestone]) {
                scrollTracked[milestone] = true;
                VNToYouAnalytics.trackEngagement('scroll_depth', milestone + '%');
            }
        });
    });
    
    // Track time on page
    var startTime = Date.now();
    var timeTracked = {};
    
    setInterval(function() {
        var timeOnPage = Math.round((Date.now() - startTime) / 1000);
        var timeMinutes = Math.floor(timeOnPage / 60);
        
        // Track every minute up to 5 minutes
        if (timeMinutes > 0 && timeMinutes <= 5 && !timeTracked[timeMinutes]) {
            timeTracked[timeMinutes] = true;
            VNToYouAnalytics.trackEngagement('time_on_page', timeMinutes + '_minutes');
        }
    }, 30000); // Check every 30 seconds
    
})();