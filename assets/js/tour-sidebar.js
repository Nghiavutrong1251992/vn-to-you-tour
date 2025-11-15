// assets/js/tour-sidebar.js
function createTourSidebarHTML(basePath = '../') {
    return `
        <div class="sidebar-widget">
            <h3><i class="fas fa-compass"></i> Explore More Tours</h3>
            <ul id="sidebar-recent-tours" class="sidebar-tours-list">
                <!-- Recent tours will be populated by JavaScript -->
            </ul>
        </div>

        <div class="sidebar-widget">
            <h3><i class="fas fa-phone"></i> Quick Contact</h3>
            <p><strong>WhatsApp:</strong> +84 977 632 673</p>
            <p><strong>Email:</strong> sales@vntoyoutour.com</p>
            <p><strong>Company:</strong> VN to You Tour</p>
            <div>
                <a href="https://web.facebook.com/profile.php?id=100091579728365" target="_blank"><i class="fab fa-facebook"></i> Facebook</a><br>
                <a href="https://wa.me/84977632673" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a><br>
                <a href="https://line.me/ti/p/FNf-ArKG1M" target="_blank"><i class="fab fa-line"></i> Line</a><br>
                <a href="mailto:sales@vntoyoutour.com"><i class="fas fa-envelope"></i> Email</a>
            </div>
        </div>
    `;
}

function populateTourSidebar(basePath = '../') {
    // Check if we're in tour page and adjust base path accordingly
    let actualBasePath = basePath;
    if (window.location.pathname.includes('/tours/')) {
        // Count how many levels deep we are
        const pathParts = window.location.pathname.split('/');
        const toursIndex = pathParts.indexOf('tours');
        if (toursIndex !== -1) {
            const levelsDeep = pathParts.length - toursIndex - 2; // -2 because we want to go back to root from tours folder
            actualBasePath = '../'.repeat(levelsDeep + 2); // +2 to go back to root
        }
    }

    // Recent tours - combine private tours and daily tours, sort by some criteria
    let recentTours = [];
    
    // Get tours from private tours data
    if (typeof privateToursData !== 'undefined') {
        recentTours = [...recentTours, ...privateToursData.map(tour => ({
            ...tour,
            type: 'private'
        }))];
    }
    
    // Get tours from daily tours data
    if (typeof dailyToursData !== 'undefined') {
        recentTours = [...recentTours, ...dailyToursData.map(tour => ({
            ...tour,
            type: 'daily'
        }))];
    }
    
    // Take first 5 tours
    const displayTours = recentTours.slice(0, 5);

    const recentToursContainer = document.getElementById('sidebar-recent-tours');
    if (recentToursContainer && displayTours.length > 0) {
        let html = '';
        displayTours.forEach(tour => {
            let relativeUrl;
            if (tour.type === 'private' && tour.id) {
                // Private tours use template with query parameter
                relativeUrl = actualBasePath + `templates/private-tour-template.html?id=${tour.id}`;
            } else if (tour.type === 'daily' && tour.id && tour.region) {
                // Daily tours use template with query parameter  
                relativeUrl = actualBasePath + `templates/tour-template.html?id=${tour.id}`;
            } else {
                relativeUrl = '#';
            }
            
            // Add tour thumbnail if available
                const thumbnailHtml = tour.image ? 
                `<img src="${encodeURI(actualBasePath + tour.image.url.substring(1))}" alt="${tour.image.alt}" class="sidebar-tour-thumb">` : 
                '';
            
            html += `
                <li class="sidebar-tour-item">
                    ${thumbnailHtml}
                    <div class="sidebar-tour-content">
                        <a href="${relativeUrl}" title="${tour.excerpt || ''}" class="sidebar-tour-link">
                            ${tour.title}
                        </a>
                        <span class="sidebar-tour-price">${tour.price.display}</span>
                    </div>
                </li>
            `;
        });
        recentToursContainer.innerHTML = html;
    }
}

function initTourSidebar(basePath = '../') {
    // Insert sidebar HTML into page
    const sidebarContainer = document.querySelector('.sidebar');
    if (sidebarContainer) {
        sidebarContainer.innerHTML = createTourSidebarHTML(basePath);
    }

    // Wait a bit for all data to load, then populate sidebar
    setTimeout(function() {
        populateTourSidebar(basePath);
    }, 100);
}

// Function to refresh tour sidebar data
function refreshTourSidebar() {
    const currentPath = window.location.pathname;
    let basePath = '../';
    
    if (currentPath.includes('/tours/')) {
        const pathParts = currentPath.split('/');
        const toursIndex = pathParts.indexOf('tours');
        if (toursIndex !== -1) {
            const levelsDeep = pathParts.length - toursIndex - 2;
            basePath = '../'.repeat(levelsDeep + 2);
        }
    }
    
    populateTourSidebar(basePath);
}

// Function to populate sidebar with related tours for tour detail pages
function populateRelatedToursSidebar(currentTour, basePath = '../') {
    console.log('populateTourSidebar called with:', currentTour); // Debug log
    
    const sidebarContainer = document.getElementById('sidebar-placeholder');
    if (!sidebarContainer) {
        console.log('Sidebar container not found!'); // Debug log
        return;
    }

    // Get related tours (same region, different tours)
    let relatedTours = [];
    
    if (typeof privateToursData !== 'undefined') {
        console.log('privateToursData available, length:', privateToursData.length); // Debug log
        relatedTours = privateToursData
            .filter(tour => tour.id !== currentTour.id && tour.region === currentTour.region)
            .slice(0, 3); // Limit to 3 related tours
        console.log('Related tours found:', relatedTours); // Debug log
    }
    
    // If not enough related tours from same region, get from other regions
    if (relatedTours.length < 3 && typeof privateToursData !== 'undefined') {
        const otherTours = privateToursData
            .filter(tour => tour.id !== currentTour.id && tour.region !== currentTour.region)
            .slice(0, 3 - relatedTours.length);
        relatedTours = [...relatedTours, ...otherTours];
    }
    
    // Generate related tours HTML
    let relatedToursHTML = '';
    if (relatedTours.length > 0) {
        relatedTours.forEach(tour => {
            const tourUrl = `private-tour-detail.html?id=${tour.id}`;
            const imageUrl = tour.image ? encodeURI(tour.image.url) : '';
            
            relatedToursHTML += `
                <li class="sidebar-tour-item">
                    <a href="${tourUrl}" class="sidebar-tour-link">
                        ${imageUrl ? `
                        <div class="sidebar-tour-thumb">
                            <img src="${imageUrl}" alt="${tour.title}" class="sidebar-tour-image">
                        </div>` : ''}
                        <div class="sidebar-tour-info">
                            <h4 class="sidebar-tour-title">${tour.title}</h4>
                            <p class="sidebar-tour-meta">${tour.duration.display} | ${tour.price.display}</p>
                            <p class="sidebar-tour-region">${tour.region.charAt(0).toUpperCase() + tour.region.slice(1)} Vietnam</p>
                        </div>
                    </a>
                </li>
            `;
        });
    } else {
        relatedToursHTML = '<li><p><em>No related tours available at the moment.</em></p></li>';
    }

    // Create complete sidebar HTML
    const sidebarHTML = `
        <div class="sidebar-widget">
            <h3><i class="fas fa-route"></i> Related Tours</h3>
            <ul class="sidebar-tours-list">
                ${relatedToursHTML}
            </ul>
        </div>

        <div class="sidebar-widget contact-sticky">
            <h3><i class="fas fa-phone"></i> Book This Tour</h3>
            <p>Contact us for customized booking:</p>
            <div class="contact-buttons">
                <a href="https://wa.me/84977632673" target="_blank" class="btn btn-small">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </a>
                <a href="mailto:sales@vntoyoutour.com" class="btn btn-small">
                    <i class="fas fa-envelope"></i> Email
                </a>
            </div>
            <hr style="margin: 15px 0;">
            <p><strong>Company:</strong> VN to You Tour</p>
            <p><strong>Phone:</strong> +84 977 632 673</p>
            <div class="social-links">
                <a href="https://web.facebook.com/profile.php?id=100091579728365" target="_blank"><i class="fab fa-facebook"></i></a>
                <a href="https://line.me/ti/p/FNf-ArKG1M" target="_blank"><i class="fab fa-line"></i></a>
            </div>
        </div>
    `;
    
    sidebarContainer.innerHTML = sidebarHTML;
}

// Expose related tours function so other scripts can call it
window.populateRelatedToursSidebar = populateRelatedToursSidebar;

// Auto-populate tour sidebar when DOM is ready (backup for pages that don't call initTourSidebar explicitly)
// DISABLED to prevent conflicts - tour detail pages handle sidebar manually
/*
document.addEventListener('DOMContentLoaded', function() {
    // Only auto-init if initTourSidebar hasn't been called explicitly
    if (!window.tourSidebarInitialized) {
        const currentPath = window.location.pathname;
        let basePath = '../';
        
        if (currentPath.includes('/tours/')) {
            const pathParts = currentPath.split('/');
            const toursIndex = pathParts.indexOf('tours');
            if (toursIndex !== -1) {
                const levelsDeep = pathParts.length - toursIndex - 2;
                basePath = '../'.repeat(levelsDeep + 2);
            }
        }
        
        initTourSidebar(basePath);
        window.tourSidebarInitialized = true;
    }
});
*/