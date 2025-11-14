// assets/js/private-tours-list.js
function loadPrivateToursList() {
    const container = document.getElementById('private-tours-list-container');
    
    if (container && typeof privateToursData !== 'undefined' && privateToursData.length > 0) {
        let html = '';

        privateToursData.forEach(tour => {
            // Adjust image URL to relative path based on current location
            let imageUrl = tour.image ? tour.image.url : '';
            let isInSubdir = window.location.pathname.includes('/pages/');
            if (imageUrl.startsWith('/')) {
                imageUrl = isInSubdir ? '..' + imageUrl : imageUrl.substring(1);
            }
            
            // Use detail page with query parameter for dynamic rendering
            const tourUrl = `private-tour-detail.html?id=${tour.id}`;
            
            html += `
                <div class="private-tour-item">
                    ${tour.image ? `
                    <div class="tour-thumbnail">
                        <img src="${encodeURI(imageUrl)}" 
                             alt="${tour.image.alt}"
                             class="tour-thumb-image">
                    </div>` : ''}
                    
                    <div class="tour-content">
                        <h3>${tour.title}</h3>
                        <p class="tour-excerpt">${tour.excerpt}</p>
                        <div class="tour-details">
                        <p><strong>Duration:</strong> ${tour.duration.display} | <strong>Price:</strong> ${tour.price.display}</p>
                        <p><strong>Region:</strong> ${tour.region === 'multi' ? 'Multi-region' : tour.region.charAt(0).toUpperCase() + tour.region.slice(1)} | <strong>Group Size:</strong> ${tour.groupSize}</p>
                    </div>
                    <div class="tour-highlights-preview">
                        <p><strong>Key Highlights:</strong></p>
                        <ul>
                            ${tour.highlights.slice(0, 3).map(highlight => `<li>${highlight}</li>`).join('')}
                            ${tour.highlights.length > 3 ? '<li><em>...and more</em></li>' : ''}
                        </ul>
                    </div>
                    <p><a href="${tourUrl}" class="btn">View Details & Book →</a></p>
                    </div>
                </div>
                <hr class="tour-separator">
            `;
        });

        container.innerHTML = html;
    } else if (container) {
        container.innerHTML = '<p><em>Private tours are currently being updated. Please contact us for custom tour arrangements.</em></p>';
    }
}

// Load when page ready
document.addEventListener('DOMContentLoaded', loadPrivateToursList);