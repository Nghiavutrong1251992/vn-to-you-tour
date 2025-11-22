// assets/js/tour-renderer.js
// Basic tour template system

function findTourById(tourId) {
    // Search in daily tours data only
    let tour = null;
    
    if (typeof dailyToursData !== 'undefined') {
        tour = dailyToursData.find(t => t.id === tourId);
    }
    
    return tour;
}

function generateTourHTML(tour) {
    if (!tour) return '<p>Tour not found.</p>';
    
    let html = `
        <article>
            <h2>${tour.title}</h2>
            <p><em>${tour.category ? tour.category.charAt(0).toUpperCase() + tour.category.slice(1) : 'Daily'} Tour | ${tour.price.display}</em></p>
            
            <h2>${tour.title}</h2>
            <p>${tour.description}</p>

            <h3>Tour Highlights</h3>
            <ul>
    `;
    
    // Add highlights
    tour.highlights.forEach(highlight => {
        html += `<li><strong>${highlight}</strong></li>`;
    });
    
    html += `
            </ul>

            <h3>Tour Details</h3>
            <ul>
                <li><strong>Duration:</strong> ${tour.duration.display}</li>
                <li><strong>Price:</strong> ${tour.price.display}</li>
                <li><strong>Group Size:</strong> ${tour.groupSize}</li>
                <li><strong>Included:</strong> ${tour.included.join(', ')}</li>
                <li><strong>Not Included:</strong> ${tour.notIncluded.join(', ')}</li>
            </ul>
    `;
    
    // Add itinerary if available
    if (tour.itinerary && tour.itinerary.length > 0) {
        html += `
            <h3>Itinerary</h3>
            <ul>
        `;
        
        tour.itinerary.forEach(item => {
            html += `<li><strong>${item.time}:</strong> ${item.activity}</li>`;
        });
        
        html += '</ul>';
    }
    
    // Add back link based on region
    const backLink = tour.region ? `index.html` : '../../../tours-to-vietnam.html';
    html += `
            <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e0e0e0;">
                <p style="margin-bottom: 1rem;"><strong>Have questions about this tour?</strong></p>
                <p style="margin-bottom: 1.5rem;">
                    <a href="../booking-conditions.html" class="btn" style="background-color: #28a745; color: white; margin-right: 1rem;">📋 View FAQ & Booking Conditions</a>
                </p>
            </div>
            <p><a href="${backLink}" class="btn">← Back to Daily Tours Vietnam ${tour.region ? tour.region.charAt(0).toUpperCase() + tour.region.slice(1) : ''}</a></p>
        </article>
    `;
    
    return html;
}

function renderTourPage() {
    // Get tour ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tourId = urlParams.get('id');
    
    if (!tourId) {
        // Try to get tour ID from filename (fallback)
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        const tourIdFromFile = filename.replace('.html', '');
        
        if (tourIdFromFile && tourIdFromFile !== 'index') {
            renderTourById(tourIdFromFile);
            return;
        }
        
        document.getElementById('tour-content').innerHTML = '<p>Tour not found.</p>';
        return;
    }
    
    renderTourById(tourId);
}

function renderTourById(tourId) {
    const tour = findTourById(tourId);
    const html = generateTourHTML(tour);
    
    const container = document.getElementById('tour-content');
    if (container) {
        container.innerHTML = html;
        
        // Update page title
        if (tour) {
            document.title = `${tour.title} - VN to You Tour`;
        }
    }
}

// Auto render when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Only render if we have tour-content container
    if (document.getElementById('tour-content')) {
        renderTourPage();
    }
});