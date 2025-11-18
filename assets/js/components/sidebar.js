// assets/js/sidebar.js
function createSidebarHTML(basePath = '../') {
    return `
        <div class="section-border">
            <h3>Recent Posts</h3>
            <ul id="sidebar-recent-posts">
                <!-- Recent posts will be populated by JavaScript -->
            </ul>
        </div>

        <div class="section-border">
            <h3>Company News</h3>
            <ul id="sidebar-company-news">
                <!-- Company news will be populated by JavaScript -->
            </ul>
        </div>

        <div class="section-border">
            <h3>Popular Tours</h3>
            <ul id="sidebar-popular-tours">
                <!-- Popular tours will be populated by JavaScript -->
            </ul>
        </div>

        <div class="section">
            <h3>Contact</h3>
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

function populateSidebar(basePath = '../') {
    // Check if we're in template page and adjust base path accordingly
    let actualBasePath = basePath;
    if (window.location.pathname.includes('/templates/')) {
        actualBasePath = '../';
    }

    // Recent posts - sort by date to ensure newest articles appear first
    if (typeof articlesData !== 'undefined') {
        // Sort articles by date (newest first)
        const sortedArticles = [...articlesData].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA; // Descending order (newest first)
        });
        
        const recentPosts = sortedArticles.slice(0, 4);
        const recentPostsContainer = document.getElementById('sidebar-recent-posts');
        if (recentPostsContainer) {
            let html = '';
            recentPosts.forEach(article => {
                const articlePath = actualBasePath + 'templates/article-template.html?id=' + article.id;
                html += `<li><a href="${articlePath}" title="${article.excerpt}">${article.title}</a><br><small>${article.date}</small></li>`;
            });
            recentPostsContainer.innerHTML = html;
        }
    }

    // Company News - display recent company news articles
    if (typeof articlesData !== 'undefined') {
        const companyNews = articlesData.filter(article => article.category === 'Company News');
        
        // Sort by date (newest first)
        const sortedCompanyNews = companyNews.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        const companyNewsContainer = document.getElementById('sidebar-company-news');
        if (companyNewsContainer) {
            let html = '';
            
            if (sortedCompanyNews.length === 0) {
                html = '<li><em>No company news available</em></li>';
            } else {
                // Show recent company news articles (limit to 5)
                sortedCompanyNews.slice(0, 5).forEach(article => {
                    const articleUrl = actualBasePath + `templates/article-template.html?id=${article.id}`;
                    html += `<li><a href="${articleUrl}" title="${article.excerpt}">${article.title}</a><br><small>${article.date}</small></li>`;
                });
                
                // Add link to view all company news
                if (sortedCompanyNews.length > 0) {
                    const newsPath = actualBasePath + 'pages/news.html?category=Company%20News';
                    html += `<li><a href="${newsPath}" class="view-all-link"><strong>View All Company News (${sortedCompanyNews.length})</strong></a></li>`;
                }
            }
            
            companyNewsContainer.innerHTML = html;
        }
    }

    // Popular tours - random selection of 5 private tours
    let popularTours = [];
    
    // Get tours from private tours data only
    let allTours = [];
    if (typeof privateToursData !== 'undefined' && privateToursData.length > 0) {
        allTours = [...privateToursData];
        
        // Shuffle array and select random 5 tours
        // Fisher-Yates shuffle algorithm
        for (let i = allTours.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allTours[i], allTours[j]] = [allTours[j], allTours[i]];
        }
        
        // Take first 5 tours from shuffled array
        popularTours = allTours.slice(0, 5);
    } else {
        // Debug: Log if data is not available
        console.log('Debug: privateToursData not available or empty');
        console.log('typeof privateToursData:', typeof privateToursData);
        if (typeof privateToursData !== 'undefined') {
            console.log('privateToursData length:', privateToursData.length);
        }
    }

    const popularToursContainer = document.getElementById('sidebar-popular-tours');
    if (popularToursContainer) {
        if (popularTours.length > 0) {
            let html = '';
            popularTours.forEach(tour => {
                // Private tours use detail page with ID parameter
                const relativeUrl = actualBasePath + `pages/private-tour-detail.html?id=${tour.id}`;
                html += `<li><a href="${relativeUrl}">${tour.title}</a></li>`;
            });
            popularToursContainer.innerHTML = html;
        } else {
            // Fallback when no tours are available
            popularToursContainer.innerHTML = '<li style="color: #666; font-style: italic;">Tours loading...</li>';
            
            // Retry after a delay if privateToursData is not loaded yet
            setTimeout(() => {
                if (typeof privateToursData !== 'undefined' && privateToursData.length > 0) {
                    populateSidebar(actualBasePath);
                } else {
                    popularToursContainer.innerHTML = '<li style="color: #666; font-style: italic;">No tours available</li>';
                }
            }, 1000);
        }
    }
}

function initSidebar(basePath = '../') {
    // Insert sidebar HTML into page
    const sidebarContainer = document.querySelector('.sidebar');
    if (sidebarContainer) {
        sidebarContainer.innerHTML = createSidebarHTML(basePath);
    }

    // Wait a bit for all data to load, then populate sidebar
    setTimeout(function() {
        populateSidebar(basePath);
    }, 100);
}

// Function to refresh sidebar data (useful after adding new articles)
function refreshSidebar() {
    const currentPath = window.location.pathname;
    const basePath = currentPath.includes('/templates/') ? '../' : '../';
    populateSidebar(basePath);
}

// Function to add new article and refresh sidebar
function addNewArticle(articleData) {
    if (typeof articlesData !== 'undefined') {
        articlesData.unshift(articleData); // Add to beginning of array
        refreshSidebar(); // Refresh sidebar to show updated data
        console.log('New article added and sidebar refreshed:', articleData.title);
    }
}

// Debug function to check Categories
function debugCategories() {
    console.log('=== DEBUG CATEGORIES ===');
    
    if (typeof articlesData !== 'undefined') {
        console.log('Total articles:', articlesData.length);
        
        // Count articles by category
        const categoryCounts = {};
        articlesData.forEach(article => {
            categoryCounts[article.category] = (categoryCounts[article.category] || 0) + 1;
        });
        
        console.log('Category counts:', categoryCounts);
        
        // Show articles in each category
        Object.keys(categoryCounts).forEach(category => {
            console.log(`\n${category} (${categoryCounts[category]} articles):`);
            const categoryArticles = articlesData.filter(article => article.category === category);
            categoryArticles.forEach(article => {
                console.log(`  - ${article.title} (${article.date})`);
            });
        });
    } else {
        console.log('articlesData not loaded');
    }
}

// Debug function to check Popular Tours links
function debugPopularTours() {
    console.log('=== DEBUG POPULAR TOURS ===');
    
    const popularTourIds = [
        'ha-long-bay-cruise',      // Private tour
        'hanoi-cultural-tour',     // Private tour  
        'hanoi-city-tour',         // Daily tour
        'halong-bay-day-trip'      // Daily tour
    ];
    
    let allTours = [];
    if (typeof toursData !== 'undefined') {
        allTours = [...allTours, ...toursData];
        console.log('Private tours loaded:', toursData.length);
    }
    if (typeof dailyToursData !== 'undefined') {
        allTours = [...allTours, ...dailyToursData];
        console.log('Daily tours loaded:', dailyToursData.length);
    }
    
    console.log('Total tours available:', allTours.length);
    
    popularTourIds.forEach(tourId => {
        const tour = allTours.find(t => t.id === tourId);
        if (tour) {
            const currentPath = window.location.pathname;
            const actualBasePath = currentPath.includes('/templates/') ? '../' : '../';
            
            let relativeUrl;
            if (tour.url && tour.url.startsWith('/pages')) {
                relativeUrl = tour.url.replace('/pages', actualBasePath + 'pages');
            } else if (tour.url && tour.region) {
                relativeUrl = actualBasePath + `pages/tours/daily-tours/vietnam-${tour.region}/${tour.url}`;
            } else {
                relativeUrl = '#';
            }
            
            console.log(`✓ ${tour.title}:`, {
                id: tour.id,
                type: tour.url.startsWith('/pages') ? 'Private' : 'Daily',
                region: tour.region,
                originalUrl: tour.url,
                finalUrl: relativeUrl
            });
        } else {
            console.log(`✗ Tour not found: ${tourId}`);
        }
    });
}

// Auto-populate sidebar when DOM is ready (DISABLED for tour pages)
// Uncomment only for non-tour pages
/*
document.addEventListener('DOMContentLoaded', function() {
    // Only auto-init if initSidebar hasn't been called explicitly
    if (!window.sidebarInitialized) {
        const currentPath = window.location.pathname;
        const basePath = currentPath.includes('/templates/') ? '../' : '../';
        initSidebar(basePath);
        window.sidebarInitialized = true;
    }
});
*/