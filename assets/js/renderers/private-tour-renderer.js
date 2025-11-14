// assets/js/private-tour-renderer.js
// Private tour template system for multi-day tours

function findPrivateTourById(tourId) {
    // Search in private tours data
    let tour = null;
    
    if (typeof privateToursData !== 'undefined') {
        tour = privateToursData.find(t => t.id === tourId);
    }
    
    return tour;
}

function generatePrivateTourHTML(tour) {
    if (!tour) return '<p>Private tour not found.</p>';
    
    // Adjust image URL to relative path if it starts with /
    let imageUrl = tour.image ? tour.image.url : '';
    if (imageUrl.startsWith('/')) {
        imageUrl = '..' + imageUrl;
    }
    
    let html = `
        <article>
            ${tour.image ? `
            <div class="tour-image-header">
                <img src="${encodeURI(imageUrl)}" 
                     alt="${tour.image.alt}"
                     class="tour-main-image">
            </div>` : ''}
            
            <div class="tour-header">
                <h1>${tour.title}</h1>
                <p>${tour.description}</p>
                <p><em>Private ${tour.category.charAt(0).toUpperCase() + tour.category.slice(1)} Tour | ${tour.price.display}</em></p>
            </div>

            <div class="content-section">
                <h3>Tour Highlights</h3>
                <ul>
    `;
    
    // Add highlights
    tour.highlights.forEach(highlight => {
        html += `<li>${highlight}</li>`;
    });
    
    html += `
                </ul>
            </div>

            <div class="tour-info">
                <p><strong>Duration:</strong> ${tour.duration.display}</p>
                <p><strong>Price:</strong> ${tour.price.display}</p>
                <p><strong>Group Size:</strong> ${tour.groupSize}</p>
            </div>
    `;
    
    // Add detailed itinerary for private tours
    if (tour.itinerary && tour.itinerary.length > 0) {
        html += `
            <div class="content-section">
                <h3>Detailed Itinerary</h3>
        `;
        
        tour.itinerary.forEach(item => {
            html += `
                <div class="itinerary-item">
                    <h4>Day ${item.day} - ${item.title}</h4>
                    <p><strong>Meals:</strong> ${item.meals}</p>
                    <p><strong>Activities:</strong></p>
                    <ul>
            `;
            
            if (Array.isArray(item.activities)) {
                item.activities.forEach(activity => {
                    html += `<li>${activity}</li>`;
                });
            }
            
            html += `
                    </ul>
                    <p><strong>Accommodation:</strong> ${item.accommodation}</p>
            `;
            
            if (item.notes) {
                html += `<p><strong>Notes:</strong> ${item.notes}</p>`;
            }
            
            html += `</div>`;
        });
        
        html += `
            </div>
        `;
    }

    // Add included/not included sections
    html += `
            <div class="content-section">
                <h3>What's Included</h3>
                <ul>
    `;
    
    tour.included.forEach(item => {
        html += `<li><i class="fas fa-check icon-success"></i>${item}</li>`;
    });
    
    html += `
                </ul>
            </div>
                
            <div class="content-section">
                <h3>What's Not Included</h3>
                <ul>
    `;
    
    tour.excluded.forEach(item => {
        html += `<li><i class="fas fa-times icon-error"></i>${item}</li>`;
    });
    
    html += `
                </ul>
            </div>
            
            <div class="content-section">
                <h3>Book This Tour</h3>
                <p>Interested in this private tour? Contact us for customization and booking:</p>
                <div class="contact-buttons">
                    <a href="https://wa.me/84977632673" class="btn" target="_blank">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                    <a href="mailto:sales@vntoyoutour.com" class="btn">
                        <i class="fas fa-envelope"></i> Email Us
                    </a>
                </div>
            </div>
        </article>
    `;
    
    return html;
}

// Minimal markdown -> HTML converter for in-project markdown files
function simpleMarkdownToHtml(md){
    if(!md) return '';
    
    const lines = md.split('\n');
    let html = '';
    let inList = false;
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        
        if (line.startsWith('### ')) {
            if (inList) { html += '</ul>'; inList = false; }
            html += `<h4>${line.substring(4)}</h4>`;
        } else if (line.startsWith('## ')) {
            if (inList) { html += '</ul>'; inList = false; }
            html += `<h3>${line.substring(3)}</h3>`;
        } else if (line.startsWith('# ')) {
            if (inList) { html += '</ul>'; inList = false; }
            html += `<h2>${line.substring(2)}</h2>`;
        } else if (line.startsWith('- ')) {
            if (!inList) {
                html += '<ul>';
                inList = true;
            }
            html += `<li>${line.substring(2)}</li>`;
        } else if (line === '') {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            // Skip empty lines or add paragraph break if needed
        } else {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            // Collect paragraph lines
            let paragraph = line;
            while (i + 1 < lines.length && lines[i + 1].trim() !== '' && !lines[i + 1].trim().startsWith('#') && !lines[i + 1].trim().startsWith('-')) {
                i++;
                paragraph += ' ' + lines[i].trim();
            }
            html += `<p>${paragraph}</p>`;
        }
    }
    
    if (inList) {
        html += '</ul>';
    }
    
    return html;
}

function renderPrivateTourPage() {
    // Get tour ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tourId = urlParams.get('id');
    
    if (!tourId) {
        document.getElementById('private-tour-content').innerHTML = '<p>Tour ID not specified.</p>';
        return;
    }
    
    renderPrivateTourById(tourId);
}

// Expose the render function for pages that call it directly
window.renderPrivateTourPage = renderPrivateTourPage;

function renderPrivateTourById(tourId) {
    const tour = findPrivateTourById(tourId);
    const html = generatePrivateTourHTML(tour);
    
    const container = document.getElementById('tour-content') || document.getElementById('private-tour-content');
    if (container) {
        container.innerHTML = html;
        
        // Add region-specific back navigation
        const backNavContainer = document.getElementById('back-navigation');
        if (backNavContainer && tour) {
            let regionBackLink = '';
            switch(tour.region) {
                case 'central':
                    regionBackLink = '<a href="private-tours.html#central" class="btn">← Back to Central Vietnam Tours</a>';
                    break;
                case 'north':
                    regionBackLink = '<a href="private-tours.html#north" class="btn">← Back to North Vietnam Tours</a>';
                    break;
                case 'south':
                    regionBackLink = '<a href="private-tours.html#south" class="btn">← Back to South Vietnam Tours</a>';
                    break;
                case 'multi':
                    regionBackLink = '<a href="private-tours.html#multi" class="btn">← Back to Multi-Region Tours</a>';
                    break;
                default:
                    regionBackLink = '<a href="private-tours.html" class="btn">← Back to Private Tours</a>';
            }
            backNavContainer.innerHTML = regionBackLink;
        }
        
        // Update page title
        if (tour) {
            document.title = `${tour.title} - VN to You Tour`;
        }
        // If the tour provides an external markdown content file, fetch and inject it
        if (tour && tour.contentUrl) {
            let mdUrl = tour.contentUrl;
            if (mdUrl.startsWith('/')) {
                mdUrl = '..' + mdUrl;
            }
            fetch(mdUrl)
                .then(resp => resp.text())
                .then(md => {
                    const mdHtml = simpleMarkdownToHtml(md);
                    const mdContainer = document.createElement('div');
                    mdContainer.className = 'tour-markdown-content';
                    mdContainer.innerHTML = mdHtml;
                    // Append markdown after main article
                    container.appendChild(mdContainer);
                })
                .catch(err => {
                    console.error('Failed to load tour markdown:', err);
                });
        }
    }
}

// Auto render when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Only render if we have tour-content or private-tour-content container
    if (document.getElementById('tour-content') || document.getElementById('private-tour-content')) {
        renderPrivateTourPage();
    }
});