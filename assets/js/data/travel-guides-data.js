// Travel Guides Data for VN to You Tour
// Last updated: December 19, 2025
const travelGuidesData = [
    {
        id: 'sapa-attractions',
        title: 'Top Sapa Attractions',
        description: 'Discover Mount Fansipan, rice terraces, and ethnic villages in Vietnam\'s mountain paradise.',
        image: '/assets/images/articles/sapa/2-1635758961-1635761176-1635843575.jpg',
        url: 'destinations/northern-vietnam/sapa-attractions-guide.html',
        category: 'Northern Vietnam',
        featured: true,
        publishDate: '2025-12-11',
        readTime: '8 min'
    },
    {
        id: 'sapa-photography-guide',
        title: 'Sapa Photography Guide: Best Times & Locations',
        description: 'Master photography in Sapa with our complete guide to rice terraces, ethnic villages, and golden hour locations.',
        image: '/assets/images/articles/sapa/sapa-photography-guide.jpg',
        url: 'destinations/northern-vietnam/sapa-photography-guide.html',
        category: 'Northern Vietnam',
        featured: false,
        publishDate: '2025-12-11',
        readTime: '10 min'
    },
    {
        id: 'fansipan-cable-car-vs-trekking',
        title: 'Fansipan Cable Car vs Trekking: Which to Choose?',
        description: 'Compare the new cable car experience with traditional trekking to Vietnam\'s highest peak. Pros, cons, and best options.',
        image: '/assets/images/articles/sapa/fansipan-cable-car-vs-trekking.jpg',
        url: 'destinations/northern-vietnam/fansipan-cable-car-vs-trekking.html',
        category: 'Northern Vietnam',
        featured: false,
        publishDate: '2025-12-11',
        readTime: '8 min'
    },
    {
        id: 'sapa-weather-guide',
        title: 'Sapa Weather by Month: Best Time to Visit Guide',
        description: 'Complete Sapa weather guide with monthly breakdown, best visiting times, and seasonal activities for optimal travel planning.',
        image: '/assets/images/articles/sapa/sapa-weather-guide.jpg',
        url: 'destinations/northern-vietnam/sapa-weather-guide.html',
        category: 'Northern Vietnam',
        featured: false,
        publishDate: '2025-12-11',
        readTime: '9 min'
    },
    {
        id: 'sapa-food-guide',
        title: 'Sapa Food Guide: Traditional H\'Mong & Local Specialties',
        description: 'Discover authentic Sapa cuisine with traditional H\'Mong dishes, local specialties, and the best places to eat in the mountains.',
        image: '/assets/images/articles/sapa/sapa-food-guide.jpg',
        url: 'destinations/northern-vietnam/sapa-food-guide.html',
        category: 'Northern Vietnam',
        featured: false,
        publishDate: '2025-12-11',
        readTime: '11 min'
    },
    {
        id: 'sapa-markets-guide',
        title: 'Sapa Markets: Bac Ha, Can Cau Weekend Market Guide',
        description: 'Complete guide to Sapa\'s vibrant markets including Bac Ha Sunday market, Can Cau weekend market, and local trading traditions.',
        image: '/assets/images/articles/sapa/sapa-markets-guide.jpg',
        url: 'destinations/northern-vietnam/sapa-markets-guide.html',
        category: 'Northern Vietnam',
        featured: false,
        publishDate: '2025-12-11',
        readTime: '10 min'
    },
    {
        id: 'sapa-accommodation-guide',
        title: 'Sapa Accommodation: Homestays vs Hotels Guide',
        description: 'Complete Sapa accommodation guide comparing homestays, boutique hotels, and luxury resorts with pricing and location recommendations.',
        image: '/assets/images/articles/sapa/sapa-accommodation-guide.jpg',
        url: 'destinations/northern-vietnam/sapa-accommodation-guide.html',
        category: 'Northern Vietnam',
        featured: false,
        publishDate: '2025-12-11',
        readTime: '12 min'
    },
    {
        id: 'sapa-ethnic-villages-guide',
        title: 'Ethnic Villages Near Sapa: Ta Van, Ta Phin, Lao Chai Guide',
        description: 'Explore authentic ethnic villages around Sapa. Discover H\'Mong, Dao, and Giay cultures, traditional crafts, and sustainable tourism experiences.',
        image: '/assets/images/articles/sapa/sapa-ethnic-villages-guide.jpg',
        url: 'destinations/northern-vietnam/sapa-ethnic-villages-guide.html',
        category: 'Northern Vietnam',
        featured: false,
        publishDate: '2025-12-11',
        readTime: '9 min'
    },
    {
        id: 'hanoi-attractions',
        title: 'Hanoi City Guide',
        description: 'Explore Vietnam\'s capital with our comprehensive guide to temples, markets, and cuisine.',
        image: '/assets/images/articles/hanoi/hanoi-city-guide.jpg',
        url: 'destinations/northern-vietnam/hanoi-attractions-guide.html',
        category: 'Northern Vietnam',
        featured: true,
        publishDate: '2025-12-10',
        readTime: '10 min'
    },
    {
        id: 'halong-bay-cruise',
        title: 'Halong Bay Cruise Comparison: 2D1N vs 3D2N',
        description: 'Complete guide to UNESCO World Heritage bay cruises and limestone karst landscapes. Compare tour options and find the perfect cruise.',
        image: '/assets/images/articles/halong-bay/halong-bay-cruise-comparison.jpg',
        url: 'destinations/northern-vietnam/halong-bay-cruise-guide.html',
        category: 'Northern Vietnam',
        featured: true,
        publishDate: '2025-12-17',
        readTime: '7 min'
    },
    {
        id: 'halong-bay-luxury-cruises',
        title: 'Halong Bay Luxury Cruises: Top 10 Premium Options',
        description: 'Discover the best luxury cruises in Halong Bay. Our top 10 list features premium 5-star ships with private balconies, spas, and fine dining.',
        image: '/assets/images/articles/halong-bay/halong-bay-luxury-cruises.jpg',
        url: 'destinations/northern-vietnam/halong-bay-luxury-cruises.html',
        category: 'Northern Vietnam',
        featured: true,
        publishDate: '2025-12-17',
        readTime: '12 min'
    },
    {
        id: 'cat-ba-island',
        title: 'Cat Ba Island Complete Guide: Beaches, Caves & Activities',
        description: 'Explore Cat Ba Island with our complete guide covering pristine beaches, mysterious caves, jungle trekking, and local culture.',
        image: '/assets/images/articles/cat-ba/cat-ba-island-guide.jpg',
        url: 'destinations/northern-vietnam/cat-ba-island-guide.html',
        category: 'Northern Vietnam',
        featured: true,
        publishDate: '2025-12-17',
        readTime: '11 min'
    },
    {
        id: 'halong-bay-caves',
        title: 'Halong Bay Caves: Sung Sot, Thien Cung, Dau Go Guide',
        description: 'Explore the most spectacular caves in Halong Bay including Sung Sot (Surprise Cave), Thien Cung (Heavenly Palace), and Dau Go Cave.',
        image: '/assets/images/articles/halong-bay/halong-bay-luxury-cruises.jpg',
        url: 'destinations/northern-vietnam/halong-bay-caves-guide.html',
        category: 'Northern Vietnam',
        featured: false,
        publishDate: '2025-12-17',
        readTime: '10 min'
    },
    {
        id: 'kayaking-halong-bay',
        title: 'Kayaking in Halong Bay: Best Routes & Safety Tips',
        description: 'Discover the best kayaking routes in Halong Bay with our comprehensive guide including safety tips, equipment, and hidden lagoons.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop&center',
        url: 'destinations/northern-vietnam/kayaking-halong-bay-guide.html',
        category: 'Northern Vietnam',
        featured: false,
        publishDate: '2025-12-17',
        readTime: '9 min'
    },
    {
        id: 'halong-vs-lan-ha',
        title: 'Halong Bay vs Lan Ha Bay: Which to Choose?',
        description: 'Compare Halong Bay and Lan Ha Bay to find your perfect destination. Explore the differences in scenery, crowds, activities, and costs.',
        image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=500&h=300&fit=crop&center',
        url: 'destinations/northern-vietnam/halong-bay-vs-lan-ha-bay.html',
        category: 'Northern Vietnam',
        featured: false,
        publishDate: '2025-12-17',
        readTime: '8 min'
    },
    {
        id: 'halong-bay-photography',
        title: 'Halong Bay Photography: Golden Hour & Best Viewpoints',
        description: 'Master Halong Bay photography with our guide to golden hour timing, best viewpoints, and tips for capturing stunning karst landscapes.',
        image: 'https://images.unsplash.com/photo-1552599786-2a7925e0e071?w=500&h=300&fit=crop&center',
        url: 'destinations/northern-vietnam/halong-bay-photography-guide.html',
        category: 'Northern Vietnam',
        featured: false,
        publishDate: '2025-12-17',
        readTime: '11 min'
    },
    {
        id: 'halong-bay-weather',
        title: 'Halong Bay Weather & Seasons: Month by Month Guide',
        description: 'Plan your perfect Halong Bay trip with our detailed weather guide covering best visiting times, seasonal variations, and what to pack.',
        image: 'assets/images/articles/halong-bay/halong-bay-weather-seasons.jpg',
        url: 'destinations/northern-vietnam/halong-bay-weather-guide.html',
        category: 'Northern Vietnam',
        featured: false,
        publishDate: '2025-12-17',
        readTime: '7 min'
    },
    {
        id: 'halong-bay-budget',
        title: 'Halong Bay Budget Guide: How to Visit for Under $100',
        description: 'Experience Halong Bay on a budget with our money-saving guide. Tips for affordable cruises, transportation, and accommodation under $100.',
        image: 'https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?w=500&h=300&fit=crop&center',
        url: 'destinations/northern-vietnam/halong-bay-budget-guide.html',
        category: 'Northern Vietnam',
        featured: false,
        publishDate: '2025-12-17',
        readTime: '10 min'
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
        image: '/assets/images/articles/danang/danang-city-beaches.jpg',
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
        image: '/assets/images/articles/hoi-an/hoi-an-ancient-town-guide.jpg',
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
        image: '/assets/images/articles/hanoi/hanoi-old-quarter-guide.jpg',
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
    },
    {
        id: 'hoan-kiem-lake',
        title: 'Hoan Kiem Lake Guide',
        description: 'The heart of Hanoi - legend, history, and best photo spots at Vietnam\'s most iconic lake.',
        image: '/assets/images/articles/hanoi/hoan-kiem-lake-guide.jpg',
        url: 'destinations/northern-vietnam/hoan-kiem-lake-guide.html',
        category: 'Northern Vietnam',
        featured: true,
        publishDate: '2025-12-11',
        readTime: '7 min'
    },
    {
        id: 'temple-of-literature',
        title: 'Temple of Literature Guide',
        description: 'Vietnam\'s first national university and symbol of education - complete guide to this UNESCO heritage site.',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&h=300&fit=crop&center',
        url: 'destinations/northern-vietnam/temple-of-literature-guide.html',
        category: 'Northern Vietnam',
        featured: true,
        publishDate: '2025-12-11',
        readTime: '9 min'
    },
    {
        id: 'hanoi-french-quarter',
        title: 'Hanoi French Quarter Guide',
        description: 'Colonial architecture walking tour with historical landmarks and French-era buildings.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop&center',
        url: 'destinations/northern-vietnam/hanoi-french-quarter-guide.html',
        category: 'Northern Vietnam',
        featured: true,
        publishDate: '2025-12-11',
        readTime: '11 min'
    },
    {
        id: 'hanoi-night-market',
        title: 'Hanoi Weekend Night Market Guide',
        description: 'Experience Hanoi\'s vibrant weekend night market with street food, shopping, and local atmosphere.',
        image: 'https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?w=500&h=300&fit=crop&center',
        url: 'destinations/northern-vietnam/hanoi-night-market-guide.html',
        category: 'Northern Vietnam',
        featured: false,
        publishDate: '2025-12-11',
        readTime: '6 min'
    },
    {
        id: 'hanoi-street-food-tour',
        title: 'Hanoi Street Food Tour Guide',
        description: 'Ultimate guide to Hanoi street food - from famous pho to hidden local delicacies and best food streets.',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=300&fit=crop&center',
        url: 'destinations/northern-vietnam/hanoi-street-food-tour-guide.html',
        category: 'Northern Vietnam',
        featured: false,
        publishDate: '2025-12-11',
        readTime: '13 min'
    },
    {
        id: 'hanoi-transportation',
        title: 'Hanoi Transportation Guide',
        description: 'Complete guide to getting around Hanoi - taxis, buses, motorbikes, and transportation tips for travelers.',
        image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=500&h=300&fit=crop&center',
        url: 'destinations/northern-vietnam/hanoi-transportation-guide.html',
        category: 'Northern Vietnam',
        featured: false,
        publishDate: '2025-12-11',
        readTime: '8 min'
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