// Travel Guides Data for VN to You Tour
const travelGuidesData = [
    {
        id: 'sapa-attractions',
        title: 'Top Sapa Attractions',
        description: 'Discover Mount Fansipan, rice terraces, and ethnic villages in Vietnam\'s mountain paradise.',
        image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=500&h=300&fit=crop&center',
        url: 'destinations/northern-vietnam/sapa-attractions-guide.html',
        category: 'Northern Vietnam',
        featured: true,
        publishDate: '2025-12-11',
        readTime: '8 min'
    },
    {
        id: 'hanoi-attractions',
        title: 'Hanoi City Guide',
        description: 'Explore Vietnam\'s capital with our comprehensive guide to temples, markets, and cuisine.',
        image: 'https://images.unsplash.com/photo-1509614836558-9ca6f5e65bf9?w=500&h=300&fit=crop&center',
        url: 'destinations/northern-vietnam/hanoi-attractions-guide.html',
        category: 'Northern Vietnam',
        featured: true,
        publishDate: '2025-12-10',
        readTime: '10 min'
    },
    {
        id: 'halong-bay-cruise',
        title: 'Halong Bay Cruises',
        description: 'Complete guide to UNESCO World Heritage bay cruises and limestone karst landscapes.',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=500&h=300&fit=crop&center',
        url: 'destinations/northern-vietnam/halong-bay-cruise-guide.html',
        category: 'Northern Vietnam',
        featured: true,
        publishDate: '2025-12-09',
        readTime: '7 min'
    },
    {
        id: 'hue-imperial-city',
        title: 'Hue Imperial City',
        description: 'Discover the former imperial capital with royal tombs, pagodas, and traditional architecture.',
        image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=500&h=300&fit=crop&center',
        url: 'destinations/central-vietnam/hue-imperial-guide.html',
        category: 'Central Vietnam',
        featured: true,
        publishDate: '2025-12-07',
        readTime: '11 min'
    },
    {
        id: 'ho-chi-minh-city',
        title: 'Ho Chi Minh City Guide',
        description: 'Navigate Vietnam\'s bustling economic hub with markets, museums, and modern attractions.',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&h=300&fit=crop&center',
        url: 'destinations/southern-vietnam/ho-chi-minh-city-guide.html',
        category: 'Southern Vietnam',
        featured: true,
        publishDate: '2025-12-06',
        readTime: '12 min'
    },
    {
        id: 'mekong-delta',
        title: 'Mekong Delta Experience',
        description: 'Explore floating markets, fruit orchards, and traditional life in the Mekong Delta.',
        image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=500&h=300&fit=crop&center',
        url: 'destinations/southern-vietnam/mekong-delta-guide.html',
        category: 'Southern Vietnam',
        featured: true,
        publishDate: '2025-12-05',
        readTime: '6 min'
    },
    {
        id: 'phu-quoc-island',
        title: 'Phu Quoc Island Paradise',
        description: 'Discover pristine beaches, pepper farms, and island life on Vietnam\'s largest island.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop&center',
        url: 'destinations/southern-vietnam/phu-quoc-guide.html',
        category: 'Southern Vietnam',
        featured: true,
        publishDate: '2025-12-04',
        readTime: '8 min'
    },
    {
        id: 'da-nang-attractions',
        title: 'Da Nang City & Beaches',
        description: 'Modern city with beautiful beaches, Ba Na Hills, and the famous Golden Bridge.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop&center',
        url: 'destinations/central-vietnam/da-nang-guide.html',
        category: 'Central Vietnam',
        featured: true,
        publishDate: '2025-12-03',
        readTime: '10 min'
    },
    {
        id: 'hoi-an-ancient-town',
        title: 'Hoi An Ancient Town Guide',
        description: 'Explore the UNESCO World Heritage ancient town with lanterns, tailors, and delicious street food.',
        image: 'https://images.unsplash.com/photo-1552599786-2a7925e0e071?w=500&h=300&fit=crop&center',
        url: 'destinations/central-vietnam/hoi-an-ancient-town-guide.html',
        category: 'Central Vietnam',
        featured: true,
        publishDate: '2025-12-08',
        readTime: '10 min'
    },
    {
        id: 'vietnam-food-guide',
        title: 'Vietnamese Cuisine Guide',
        description: 'Complete guide to Vietnamese food, from street food to fine dining experiences.',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=300&fit=crop&center',
        url: 'destinations/vietnam-food-guide.html',
        category: 'Food & Culture',
        featured: true,
        publishDate: '2025-12-02',
        readTime: '15 min'
    },
    {
        id: 'hanoi-old-quarter',
        title: 'Hanoi Old Quarter: Complete Walking Guide with Map',
        description: 'Explore Hanoi\'s historic Old Quarter with our detailed walking guide covering 36 streets, hidden temples, and local street food spots.',
        image: 'https://images.unsplash.com/photo-1509614836558-9ca6f5e65bf9?w=500&h=300&fit=crop&center',
        url: 'destinations/northern-vietnam/hanoi-old-quarter-guide.html',
        category: 'Northern Vietnam',
        featured: true,
        publishDate: '2025-12-11',
        readTime: '12 min'
    },
    {
        id: 'best-pho-hanoi',
        title: 'Best Pho in Hanoi: 15 Local Spots Tourists Miss',
        description: 'Discover authentic Hanoi pho at local favorites rarely found in guidebooks. From family-run shops to hidden alleyway gems.',
        image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=500&h=300&fit=crop&center',
        url: 'destinations/northern-vietnam/best-pho-hanoi-guide.html',
        category: 'Northern Vietnam',
        featured: true,
        publishDate: '2025-12-11',
        readTime: '10 min'
    }
];

// Function to get random travel guides
function getRandomTravelGuides(count = 3) {
    const shuffled = [...travelGuidesData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to get travel guides by category
function getTravelGuidesByCategory(category) {
    return travelGuidesData.filter(guide => guide.category === category);
}

// Function to get featured travel guides
function getFeaturedTravelGuides() {
    return travelGuidesData.filter(guide => guide.featured);
}