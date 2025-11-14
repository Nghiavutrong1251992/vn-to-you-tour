// assets/js/daily-tours-list.js
function loadDailyToursList() {
    const currentPath = window.location.pathname;
    let region = '';

    // Xác định region dựa trên URL
    if (currentPath.includes('daily-tours/vietnam-north')) {
        region = 'north';
    } else if (currentPath.includes('daily-tours/vietnam-central')) {
        region = 'central';
    } else if (currentPath.includes('daily-tours/vietnam-south')) {
        region = 'south';
    }

    if (!region) return;

    // Lấy các daily tour của region này
    const regionDailyTours = dailyToursData.filter(tour => tour.region === region);

    const container = document.getElementById('daily-tours-list-container');
    if (container && regionDailyTours.length > 0) {
        let html = '';

        regionDailyTours.forEach(tour => {
            // Use template with query parameter for dynamic rendering
            const tourUrl = `tour-template.html?id=${tour.id}`;
            
            html += `
                <h2>${tour.title}</h2>
                <p>${tour.excerpt}</p>
                <p><strong>Duration:</strong> ${tour.duration.display || tour.duration} | <strong>Price:</strong> ${tour.price.display || tour.price}</p>
                <p><a href="${tourUrl}" class="btn">Learn More</a></p>
            `;
        });

        container.innerHTML = html;
    }
}

// Load khi page ready
document.addEventListener('DOMContentLoaded', loadDailyToursList);