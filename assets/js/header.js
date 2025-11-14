// Header dropdown and navigation functionality
function initializeHeaderDropdown() {
    // Handle dropdown menu active states
    const currentPath = window.location.pathname;
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const navLinks = document.querySelectorAll('nav > a');
    
    // Remove all active states first
    navLinks.forEach(link => link.classList.remove('active'));
    if (dropdownToggle) {
        dropdownToggle.classList.remove('active');
    }
    
    // Check if current page is part of tours
    const tourPages = [
        'tours-to-vietnam.html',
        'daily-tours.html', 
        'private-tours.html',
        'mice.html',
        'golf-tour.html'
    ];
    
    const isToursPage = tourPages.some(page => currentPath.includes(page));
    
    if (isToursPage && dropdownToggle) {
        // Set dropdown toggle as active for tours pages
        dropdownToggle.classList.add('active');
    } else {
        // Set other nav links as active
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref) {
                if (currentPath === '/' && linkHref === '/') {
                    link.classList.add('active');
                } else if (currentPath.includes('news.html') && linkHref.includes('news.html')) {
                    link.classList.add('active');
                }
            }
        });
    }
    
    // Enhanced dropdown behavior
    setupDropdownBehavior();
}

function setupDropdownBehavior() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (!dropdown || !dropdownToggle || !dropdownMenu) return;
    
    let hoverTimeout;
    let isMenuVisible = false;
    
    function showMenu() {
        clearTimeout(hoverTimeout);
        isMenuVisible = true;
        dropdownMenu.classList.remove('dropdown-menu-hide');
        dropdownMenu.classList.add('dropdown-menu-show');
    }
    
    function hideMenu() {
        hoverTimeout = setTimeout(() => {
            isMenuVisible = false;
            dropdownMenu.classList.remove('dropdown-menu-show');
            dropdownMenu.classList.add('dropdown-menu-hide');
        }, 300); // Increased delay to 300ms
    }
    
    // Show menu when hovering over toggle
    dropdownToggle.addEventListener('mouseenter', showMenu);
    
    // Show menu when hovering over dropdown container
    dropdown.addEventListener('mouseenter', function(e) {
        // Only show if hovering over the dropdown itself, not child elements
        if (e.target === dropdown || dropdown.contains(e.target)) {
            showMenu();
        }
    });
    
    // Keep menu open when hovering over menu
    dropdownMenu.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
        showMenu();
    });
    
    // Hide menu when leaving dropdown entirely
    dropdown.addEventListener('mouseleave', function(e) {
        // Check if mouse is really leaving the dropdown area
        const rect = dropdown.getBoundingClientRect();
        const menuRect = dropdownMenu.getBoundingClientRect();
        
        // Create a larger area that includes both toggle and menu with some buffer
        const combinedArea = {
            left: Math.min(rect.left, menuRect.left) - 5,
            right: Math.max(rect.right, menuRect.right) + 5,
            top: rect.top - 5,
            bottom: Math.max(rect.bottom, menuRect.bottom) + 5
        };
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Only hide if mouse is completely outside the combined area with buffer
        if (mouseX < combinedArea.left || mouseX > combinedArea.right || 
            mouseY < combinedArea.top || mouseY > combinedArea.bottom) {
            hideMenu();
        }
    });
    
    // Hide menu when leaving menu
    dropdownMenu.addEventListener('mouseleave', function(e) {
        const rect = dropdown.getBoundingClientRect();
        const menuRect = dropdownMenu.getBoundingClientRect();
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Create buffer zone between menu and toggle
        const bufferZone = {
            left: rect.left - 5,
            right: rect.right + 5,
            top: rect.top - 5,
            bottom: menuRect.bottom + 5
        };
        
        // Hide if mouse is not in the buffer zone
        if (mouseX < bufferZone.left || mouseX > bufferZone.right || 
            mouseY < bufferZone.top || mouseY > bufferZone.bottom) {
            hideMenu();
        }
    });
    
    // Hide menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            clearTimeout(hoverTimeout);
            isMenuVisible = false;
            dropdownMenu.classList.remove('dropdown-menu-show');
            dropdownMenu.classList.add('dropdown-menu-hide');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for header to be loaded
    setTimeout(initializeHeaderDropdown, 150);
});

// Also run after header is dynamically loaded
window.addEventListener('headerLoaded', initializeHeaderDropdown);

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