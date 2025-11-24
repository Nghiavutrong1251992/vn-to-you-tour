// Mobile Menu Functions - Global
console.log('Mobile menu functions loading...');

function openMobileMenu() {
    console.log('Opening mobile menu');
    const menu = document.querySelector('.mobile-nav-menu');
    const overlay = document.querySelector('.mobile-overlay');
    
    if (menu && overlay) {
        menu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    console.log('Closing mobile menu');
    const menu = document.querySelector('.mobile-nav-menu');
    const overlay = document.querySelector('.mobile-overlay');
    
    if (menu && overlay) {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function toggleMobileMenu() {
    console.log('Toggle mobile menu called');
    const menu = document.querySelector('.mobile-nav-menu');
    
    if (menu && menu.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing mobile menu...');
    initMobileMenu();
});

// Listen for custom headerLoaded event (dispatched when header is dynamically loaded)
window.addEventListener('headerLoaded', function() {
    console.log('Header loaded event received, initializing mobile menu...');
    initMobileMenu();
});

// Also try to initialize after a delay
setTimeout(function() {
    console.log('Backup initialization...');
    initMobileMenu();
}, 1000);

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.mobile-nav-menu');
    const overlay = document.querySelector('.mobile-overlay');
    const closeBtn = document.querySelector('.mobile-nav-close');
    const navLinks = document.querySelectorAll('.mobile-nav-links a');
    
    console.log('Elements found:', {
        toggle: !!toggle,
        menu: !!menu,
        overlay: !!overlay,
        closeBtn: !!closeBtn,
        navLinks: navLinks.length
    });
    
    if (!toggle || !menu || !overlay) {
        console.log('Missing elements, retrying in 500ms...');
        setTimeout(initMobileMenu, 500);
        return;
    }
    
    // Toggle button click only - simple and clean
    if (toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu toggle clicked');
            toggleMobileMenu();
        });
    }
    
    // Overlay click to close
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Overlay clicked');
            closeMobileMenu();
        });
    }
    
    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked');
            closeMobileMenu();
        });
    }
    
    // Nav links click
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            console.log('Nav link clicked');
            closeMobileMenu();
        });
    });
    
    // Prevent any touch events on the toggle button from causing issues
    if (toggle) {
        toggle.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        });
        
        toggle.addEventListener('touchend', function(e) {
            e.stopPropagation();
        });
    }
    
    console.log('Mobile menu initialized successfully');
}

// Make functions globally available
window.openMobileMenu = openMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.toggleMobileMenu = toggleMobileMenu;

console.log('Mobile menu functions defined successfully');