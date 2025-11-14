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
            <h3>Categories</h3>
            <ul id="sidebar-categories">
                <!-- Categories will be populated by JavaScript -->
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
                html += `<li><a href="${articlePath}">${article.title}</a></li>`;
            });
            recentPostsContainer.innerHTML = html;
        }
    }

    // Categories - display in a logical order with counts
    if (typeof articlesData !== 'undefined') {
        const categories = [...new Set(articlesData.map(article => article.category))];
        
        // Define preferred category order for better UX
        const categoryOrder = [
            'Destination Guides',
            'Travel Tips', 
            'Cultural Insights',
            'Food & Cuisine',
            'Adventure Travel',
            'Luxury Travel'
        ];
        
        // Sort categories by preferred order, then alphabetically for any new ones
        const sortedCategories = categories.sort((a, b) => {
            const indexA = categoryOrder.indexOf(a);
            const indexB = categoryOrder.indexOf(b);
            
            if (indexA !== -1 && indexB !== -1) {
                return indexA - indexB; // Both in preferred order
            } else if (indexA !== -1) {
                return -1; // A is in preferred order, B is not
            } else if (indexB !== -1) {
                return 1; // B is in preferred order, A is not
            } else {
                return a.localeCompare(b); // Both not in preferred order, sort alphabetically
            }
        });
        
        const categoriesContainer = document.getElementById('sidebar-categories');
        if (categoriesContainer) {
            let html = '';
            
            // Add "All Articles" option first
            const newsPath = actualBasePath + 'pages/news.html';
            html += `<li><a href="${newsPath}">All Articles (${articlesData.length})</a></li>`;
            
            // Add each category with count
            sortedCategories.forEach(category => {
                const count = articlesData.filter(article => article.category === category).length;
                html += `<li><a href="${newsPath}?category=${encodeURIComponent(category)}" title="View all ${category} articles">${category} (${count})</a></li>`;
            });
            
            categoriesContainer.innerHTML = html;
        }
    }

    // Popular tours - curated selection of the most popular tours
    let popularTours = [];
    
    // Define most popular tour IDs (can be customized)
    const popularTourIds = [
        'halong-bay-day-trip'      // Daily tour - only remaining tour
    ];
    
    // Get tours from daily tours data only
    let allTours = [];
    if (typeof dailyToursData !== 'undefined') {
        allTours = [...allTours, ...dailyToursData];
    }
    
    // Select tours based on popular IDs, fallback to random selection
    popularTourIds.forEach(tourId => {
        const tour = allTours.find(t => t.id === tourId);
        if (tour && popularTours.length < 4) {
            popularTours.push(tour);
        }
    });
    
    // If we don't have enough popular tours, fill with others
    if (popularTours.length < 4) {
        const remainingTours = allTours.filter(tour => 
            !popularTours.find(pt => pt.id === tour.id)
        );
        const needed = 4 - popularTours.length;
        popularTours = [...popularTours, ...remainingTours.slice(0, needed)];
    }

    const popularToursContainer = document.getElementById('sidebar-popular-tours');
    if (popularToursContainer && popularTours.length > 0) {
        let html = '';
        popularTours.forEach(tour => {
            let relativeUrl;
            if (tour.url && tour.url.startsWith('/pages')) {
                // Private tours have full path starting with /pages
                relativeUrl = tour.url.replace('/pages', actualBasePath + 'pages');
            } else if (tour.url && tour.region) {
                // Daily tours need region path construction: pages/tours/daily-tours/vietnam-{region}/{filename}
                relativeUrl = actualBasePath + `pages/tours/daily-tours/vietnam-${tour.region}/${tour.url}`;
            } else {
                relativeUrl = '#';
            }
            html += `<li><a href="${relativeUrl}">${tour.title}</a></li>`;
        });
        popularToursContainer.innerHTML = html;
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