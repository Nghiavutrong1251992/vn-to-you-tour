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
                <article class="tour-item-full">
                    ${tour.image ? `
                    <div class="tour-image-large">
                        <img src="${encodeURI(imageUrl)}" 
                             alt="${tour.image.alt}"
                             class="tour-main-thumbnail">
                    </div>` : ''}
                    
                    <div class="tour-info-section">
                        <h3 class="tour-title-large">${tour.title}</h3>
                        <p class="tour-excerpt-large">${tour.excerpt}</p>
                        
                        <div class="tour-meta-grid">
                            <div class="meta-item">
                                <strong>Duration:</strong> ${tour.duration.display}
                            </div>
                            <div class="meta-item">
                                <strong>Price:</strong> ${tour.price.display}
                            </div>
                            <div class="meta-item">
                                <strong>Region:</strong> ${tour.region === 'multi' ? 'Multi-region' : tour.region.charAt(0).toUpperCase() + tour.region.slice(1)}
                            </div>
                            <div class="meta-item">
                                <strong>Group Size:</strong> ${tour.groupSize}
                            </div>
                        </div>
                        
                        <div class="tour-highlights-section">
                            <h4>Key Highlights:</h4>
                            <ul class="highlights-list">
                                ${tour.highlights.slice(0, 4).map(highlight => `<li>${highlight}</li>`).join('')}
                                ${tour.highlights.length > 4 ? `<li class="more-highlights"><em>+ ${tour.highlights.length - 4} more amazing experiences</em></li>` : ''}
                            </ul>
                        </div>
                        
                        <div class="tour-actions">
                            <a href="${tourUrl}" class="btn btn-primary-large">View Details & Book Tour →</a>
                        </div>
                    </div>
                </article>
                <hr class="tour-divider-large">
            `;
        });

        container.innerHTML = html;
    } else if (container) {
        container.innerHTML = '<p><em>Private tours are currently being updated. Please contact us for custom tour arrangements.</em></p>';
    }
}

// Load when page ready
document.addEventListener('DOMContentLoaded', loadPrivateToursList);