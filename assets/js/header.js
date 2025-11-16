// Header navigation functionality (no dropdown)
function initializeHeaderNavigation() {
    // Handle navigation active states
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav > a');
    
    // Remove all active states first
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Set active state for current page
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref) {
            // Homepage
            if (currentPath === '/' && linkHref === '/') {
                link.classList.add('active');
            }
            // Tours to Vietnam page (also active for sub-tour pages)
            else if (linkHref.includes('tours-to-vietnam.html')) {
                const tourPages = [
                    'tours-to-vietnam.html',
                    'daily-tours.html', 
                    'private-tours.html',
                    'mice.html',
                    'golf-tour.html',
                    'tour-detail.html',
                    'private-tour-detail.html'
                ];
                
                const isToursPage = tourPages.some(page => currentPath.includes(page));
                if (isToursPage) {
                    link.classList.add('active');
                }
            }
            // News page
            else if (currentPath.includes('news.html') && linkHref.includes('news.html')) {
                link.classList.add('active');
            }
            // About Us page
            else if (currentPath.includes('about-us.html') && linkHref.includes('about-us.html')) {
                link.classList.add('active');
            }
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for header to be loaded
    setTimeout(initializeHeaderNavigation, 150);
});

// Also run after header is dynamically loaded
window.addEventListener('headerLoaded', initializeHeaderNavigation);

// Header background control based on page type and scroll
function initializeHeaderBackground() {
    const header = document.querySelector('header');
    if (!header) return;

    // Check if this is the homepage (has hero slideshow)
    const hasHeroSlideshow = document.querySelector('.hero-slideshow');
    
    // Function to set header background
    function updateHeaderBackground() {
        if (!hasHeroSlideshow) {
            // Non-homepage: always use solid background
            header.classList.add('header-solid');
        } else {
            // Homepage: toggle based on scroll
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                header.classList.add('header-solid');
            } else {
                header.classList.remove('header-solid');
            }
        }
    }
    
    // Initial check
    updateHeaderBackground();
    
    // Listen for scroll events only if homepage
    if (hasHeroSlideshow) {
        window.addEventListener('scroll', updateHeaderBackground, { passive: true });
    }
}

// Initialize header background
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeHeaderBackground, 200);
});

window.addEventListener('headerLoaded', function() {
    setTimeout(initializeHeaderBackground, 100);
});