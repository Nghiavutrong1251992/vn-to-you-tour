// assets/js/daily-tours-data.js
const dailyToursData = [
    {
        id: 'halong-bay-day-trip',
        title: 'Ha Long Bay Day Trip',
        region: 'north',
        category: 'cruise',
        excerpt: 'Experience the stunning limestone karsts of Ha Long Bay on a full-day cruise with cave exploration and traditional fishing village visits.',
        description: 'Experience the breathtaking beauty of Halong Bay, a UNESCO World Heritage site, on this full-day cruise adventure.',
        image: {
            url: 'https://main.vn-to-you-tour.pages.dev/assets/images/tours/halong-bay-day-trip.jpg',
            alt: 'Ha Long Bay limestone karsts and traditional junk boats'
        },
        duration: {
            display: 'Full Day (6:00 AM - 6:00 PM)',
            hours: 12
        },
        price: {
            display: 'From $65 per person',
            amount: 65,
            currency: 'USD'
        },
        groupSize: 'Maximum 20 people',
        highlights: [
            'Halong Bay Cruise: Sail through emerald waters dotted with limestone karsts',
            'Sung Sot Cave: Explore the largest cave in Halong Bay',
            'Kayaking: Optional kayaking through hidden lagoons',
            'Floating Villages: Visit traditional fishing communities',
            'Ti Top Island: Relax on pristine beaches'
        ],
        itinerary: [
            {
                time: 'Early Morning',
                activity: 'Pick up from Hanoi hotel and transfer to Halong Bay'
            },
            {
                time: 'Morning',
                activity: 'Board cruise ship and explore Halong Bay'
            },
            {
                time: 'Late Morning',
                activity: 'Visit Sung Sot Cave and kayaking'
            },
            {
                time: 'Afternoon',
                activity: 'Lunch on board and relax at Ti Top Island'
            },
            {
                time: 'Late Afternoon',
                activity: 'Return to Hanoi'
            }
        ],
        included: [
            'Cruise',
            'English-speaking guide',
            'lunch',
            'entrance fees',
            'bottled water'
        ],
        notIncluded: [
            'Personal expenses',
            'tips',
            'optional activities'
        ]
    },
    {
        id: 'sapa-trekking-adventure',
        title: 'Sapa Trekking Adventure',
        region: 'north',
        category: 'trekking',
        excerpt: 'Trek through stunning rice terraces and visit ethnic minority villages in the beautiful mountains of Sapa.',
        description: 'Discover the breathtaking beauty of Sapa on this full-day trekking adventure through rice terraces and traditional villages.',
        duration: {
            display: 'Full Day (8:00 AM - 5:00 PM)',
            hours: 9
        },
        price: {
            display: 'From $45 per person',
            amount: 45,
            currency: 'USD'
        },
        groupSize: 'Maximum 15 people',
        highlights: [
            'Rice Terrace Trekking: Walk through stunning terraced fields',
            'Cat Cat Village: Visit traditional H\'mong village',
            'Silver Waterfall: See the magnificent 200-meter waterfall',
            'Local Lunch: Enjoy authentic mountain cuisine',
            'Cultural Exchange: Meet local ethnic minorities'
        ],
        itinerary: [
            {
                time: 'Early Morning',
                activity: 'Pick up from Sapa town center'
            },
            {
                time: 'Morning',
                activity: 'Start trekking through rice terraces'
            },
            {
                time: 'Late Morning',
                activity: 'Visit Cat Cat Village and interact with locals'
            },
            {
                time: 'Afternoon',
                activity: 'Lunch at local restaurant and visit Silver Waterfall'
            },
            {
                time: 'Late Afternoon',
                activity: 'Return to Sapa town'
            }
        ],
        included: [
            'Professional trekking guide',
            'Local lunch',
            'Entrance fees',
            'Bottled water',
            'Transportation'
        ],
        notIncluded: [
            'Personal expenses',
            'Tips for guide',
            'Travel insurance'
        ]
    },
    
    // Central Vietnam Tours
    {
        id: 'hoi-an-ancient-town-day-trip',
        title: 'Hoi An Ancient Town Day Trip',
        region: 'central',
        category: 'cultural',
        excerpt: 'Explore the UNESCO World Heritage site of Hoi An Ancient Town with its well-preserved architecture, lantern festivals, and traditional crafts.',
        description: 'Discover the charm of Hoi An Ancient Town, a beautifully preserved trading port that showcases Vietnam\'s cultural heritage.',
        duration: {
            display: 'Full Day (8:00 AM - 6:00 PM)',
            hours: 10
        },
        price: {
            display: 'From $45 per person',
            amount: 45,
            currency: 'USD'
        },
        groupSize: 'Maximum 15 people',
        highlights: [
            'Japanese Covered Bridge: Visit the iconic 16th-century bridge',
            'Ancient Houses: Explore traditional Vietnamese architecture',
            'Local Workshops: Watch artisans create traditional crafts',
            'Lantern Festival: Experience evening lantern ceremony (seasonal)',
            'Local Cuisine: Taste authentic Hoi An specialties'
        ],
        itinerary: [
            {
                time: 'Morning',
                activity: 'Walking tour of Hoi An Ancient Town'
            },
            {
                time: 'Late Morning',
                activity: 'Visit Japanese Covered Bridge and ancient houses'
            },
            {
                time: 'Afternoon',
                activity: 'Lunch and workshop visits'
            },
            {
                time: 'Late Afternoon',
                activity: 'Free time for shopping and exploration'
            }
        ],
        included: [
            'Professional guide',
            'Entrance fees',
            'Local lunch',
            'Bottled water'
        ],
        notIncluded: [
            'Personal expenses',
            'Shopping',
            'Tips'
        ]
    },
    
    {
        id: 'my-son-sanctuary-day-trip',
        title: 'My Son Sanctuary Day Trip',
        region: 'central',
        category: 'historical',
        excerpt: 'Visit the ancient Cham ruins of My Son Sanctuary, a UNESCO World Heritage site showcasing the remnants of the Champa Kingdom.',
        description: 'Explore the mystical My Son Sanctuary, an archaeological site that was once the religious center of the ancient Cham civilization.',
        duration: {
            display: 'Full Day (7:00 AM - 5:00 PM)',
            hours: 10
        },
        price: {
            display: 'From $55 per person',
            amount: 55,
            currency: 'USD'
        },
        groupSize: 'Maximum 12 people',
        highlights: [
            'Ancient Temples: Explore 4th-14th century Cham ruins',
            'Cham Culture: Learn about the ancient Champa Kingdom',
            'Archaeological Site: UNESCO World Heritage site',
            'Traditional Performance: Cham cultural show',
            'Scenic Journey: Beautiful countryside views'
        ],
        itinerary: [
            {
                time: 'Morning',
                activity: 'Departure from Hoi An to My Son Sanctuary'
            },
            {
                time: 'Late Morning',
                activity: 'Explore the ancient temple complex'
            },
            {
                time: 'Afternoon',
                activity: 'Lunch and cultural performance'
            },
            {
                time: 'Late Afternoon',
                activity: 'Return to Hoi An'
            }
        ],
        included: [
            'Transportation',
            'Professional guide',
            'Entrance fees',
            'Local lunch',
            'Cultural show'
        ],
        notIncluded: [
            'Personal expenses',
            'Tips',
            'Travel insurance'
        ]
    },
    
    // Southern Vietnam Tours
    {
        id: 'mekong-delta-day-trip',
        title: 'Mekong Delta Day Trip',
        region: 'south',
        category: 'nature',
        excerpt: 'Experience the vibrant life of the Mekong Delta with boat rides through canals, floating markets, and traditional villages.',
        description: 'Discover the lush Mekong Delta, known as Vietnam\'s rice bowl, with its intricate waterways, floating markets, and rural life.',
        duration: {
            display: 'Full Day (7:00 AM - 6:00 PM)',
            hours: 11
        },
        price: {
            display: 'From $50 per person',
            amount: 50,
            currency: 'USD'
        },
        groupSize: 'Maximum 18 people',
        highlights: [
            'Boat Cruise: Navigate through scenic canals and rivers',
            'Floating Market: Experience Cai Rang floating market',
            'Local Villages: Visit traditional Mekong communities',
            'Coconut Candy: See traditional candy making process',
            'Tropical Fruits: Taste fresh seasonal fruits'
        ],
        itinerary: [
            {
                time: 'Early Morning',
                activity: 'Departure from Ho Chi Minh City to Can Tho'
            },
            {
                time: 'Morning',
                activity: 'Boat trip to Cai Rang floating market'
            },
            {
                time: 'Late Morning',
                activity: 'Visit local villages and workshops'
            },
            {
                time: 'Afternoon',
                activity: 'Lunch at local restaurant and return journey'
            }
        ],
        included: [
            'Transportation',
            'Boat cruise',
            'Professional guide',
            'Local lunch',
            'Fruit tasting'
        ],
        notIncluded: [
            'Personal expenses',
            'Tips',
            'Additional drinks'
        ]
    },
    
    {
        id: 'cu-chi-tunnels-day-trip',
        title: 'Cu Chi Tunnels Day Trip',
        region: 'south',
        category: 'historical',
        excerpt: 'Explore the famous Cu Chi Tunnels, an underground network used during the Vietnam War, and learn about wartime history.',
        description: 'Step back in time at the Cu Chi Tunnels, an extensive underground tunnel system that played a crucial role during the Vietnam War.',
        duration: {
            display: 'Half Day (8:00 AM - 2:00 PM)',
            hours: 6
        },
        price: {
            display: 'From $35 per person',
            amount: 35,
            currency: 'USD'
        },
        groupSize: 'Maximum 20 people',
        highlights: [
            'Underground Tunnels: Crawl through original war tunnels',
            'War History: Learn about Vietnam War tactics',
            'Booby Traps: See recreated wartime traps',
            'Shooting Range: Optional weapon firing experience',
            'Documentary Film: Watch historical footage'
        ],
        itinerary: [
            {
                time: 'Morning',
                activity: 'Departure from Ho Chi Minh City to Cu Chi'
            },
            {
                time: 'Late Morning',
                activity: 'Explore tunnel system and war exhibits'
            },
            {
                time: 'Afternoon',
                activity: 'Documentary viewing and return to city'
            }
        ],
        included: [
            'Transportation',
            'Professional guide',
            'Entrance fees',
            'Documentary screening'
        ],
        notIncluded: [
            'Lunch',
            'Shooting range fees',
            'Personal expenses',
            'Tips'
        ]
    }
];


