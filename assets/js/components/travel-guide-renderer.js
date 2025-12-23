// Travel Guide Component for Homepage
function createTravelGuideCard(guide, baseUrl = '') {
    return `
        <div class="service-card" style="height: auto;">
            <div class="service-image" style="height: 200px;">
                <img src="${guide.image}" alt="${guide.title}" loading="lazy">
                <div style="position: absolute; top: 8px; right: 8px; background: rgba(0, 149, 217, 0.9); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 600;">
                    ${guide.category}
                </div>
            </div>
            <div class="service-content">
                <h3>${guide.title}</h3>
                <p>${guide.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin: 1rem 0 0.5rem 0; font-size: 0.85rem; color: #666;">
                    <span>📖 ${guide.readTime} read</span>
                    <span>📅 ${formatDate(guide.publishDate)}</span>
                </div>
                <a href="${baseUrl}${guide.url}" class="btn service-btn">Read Guide</a>
            </div>
        </div>
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
}

function renderTravelGuides(containerId, baseUrl = '') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found`);
        return;
    }

    // Get 3 random travel guides
    const randomGuides = getRandomTravelGuides(3);
    
    // Create HTML for all guides
    const guidesHTML = randomGuides.map(guide => createTravelGuideCard(guide, baseUrl)).join('');
    
    // Insert into container
    container.innerHTML = guidesHTML;
}

// Function to refresh travel guides (for periodic updates)
function refreshTravelGuides(containerId, baseUrl = '') {
    renderTravelGuides(containerId, baseUrl);
}

// Auto-refresh every 30 seconds (optional)
function startTravelGuideAutoRefresh(containerId, baseUrl = '', intervalSeconds = 30) {
    setInterval(() => {
        refreshTravelGuides(containerId, baseUrl);
    }, intervalSeconds * 1000);
}