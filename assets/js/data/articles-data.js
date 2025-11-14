// assets/js/articles-data.js
// Articles are automatically sorted by date in sidebar.js
const articlesData = [
    {
        id: 'northern-vietnam',
        slug: 'northern-vietnam',
        title: 'Exploring the Hidden Gems of Northern Vietnam',
        date: 'November 12, 2025',
        author: 'VN to You Tour Team',
        category: 'Destination Guides',
        excerpt: 'Northern Vietnam offers a tapestry of natural wonders and cultural heritage that captivates every traveler. From the ethereal beauty of Ha Long Bay to the terraced fields of Sapa, this region is a paradise for adventurers and culture enthusiasts alike.',
        content: [
            {
                type: 'paragraph',
                text: 'Northern Vietnam offers a tapestry of natural wonders and cultural heritage that captivates every traveler. From the ethereal beauty of Ha Long Bay to the terraced fields of Sapa, this region is a paradise for adventurers and culture enthusiasts alike.'
            },
            {
                type: 'image',
                src: 'assets/images/articles/article-northern-vietnam 1.jpg',
                alt: 'Northern Vietnam Landscape'
            },
            {
                type: 'paragraph', 
                text: 'Ha Long Bay, a UNESCO World Heritage Site, features thousands of limestone karsts rising from the emerald waters. A cruise through these islands reveals hidden lagoons and floating villages, where fishermen have lived for generations. For those seeking tranquility, a visit to Bai Tu Long Bay provides a less crowded alternative with equally stunning scenery.'
            },
            {
                type: 'paragraph',
                text: 'Venture inland to Sapa, where the Muong Hoa Valley showcases the ingenuity of ethnic minorities. The Hmong and Dao people maintain ancient traditions, from indigo-dyeing techniques to intricate silver jewelry. Trekking through rice terraces at sunrise offers breathtaking views and a chance to connect with local communities.'
            },
            {
                type: 'paragraph',
                text: 'Hanoi, the vibrant capital, blends French colonial architecture with traditional temples. The Old Quarter\'s narrow streets buzz with life, while Ho Chi Minh Mausoleum stands as a solemn reminder of Vietnam\'s history.'
            },
            {
                type: 'paragraph',
                text: 'Northern Vietnam\'s cuisine is equally diverse. Pho, the national dish, originated here, and specialties like bun cha and cha ca showcase fresh ingredients and bold flavors. Don\'t miss trying local wines made from mountain fruits.'
            },
            {
                type: 'paragraph',
                text: 'As sustainable tourism grows, initiatives protect these treasures while providing economic benefits to locals. Whether you\'re hiking, kayaking, or simply soaking in the views, Northern Vietnam promises an unforgettable journey.'
            }
        ],
        tags: ['Northern Vietnam', 'Ha Long Bay', 'Sapa', 'Hanoi', 'UNESCO', 'Culture'],
        readTime: '5 min read',
        featured: true
    },
    {
        id: 'mekong-delta-adventure',
        slug: 'mekong-delta-adventure',
        title: 'Mekong Delta: Life on the Water',
        date: 'November 10, 2025',
        author: 'VN to You Tour Team',
        category: 'Destination Guides',
        excerpt: 'Discover the vibrant floating markets, traditional villages, and rich agricultural life of the Mekong Delta, where rivers are highways and boats are homes.',
        content: [
            {
                type: 'paragraph',
                text: 'The Mekong Delta, known as Vietnam\'s "rice bowl," is a vast network of rivers, swamps, and islands that forms the agricultural heartland of the country. This fascinating region offers visitors a glimpse into a way of life that has remained largely unchanged for centuries.'
            },
            {
                type: 'paragraph',
                text: 'Wake up early to visit the famous floating markets of Cai Rang and Phong Dien, where vendors sell fresh fruits, vegetables, and local delicacies from their boats. The colorful spectacle of hundreds of boats gathered on the water creates an unforgettable scene.'
            },
            {
                type: 'paragraph',
                text: 'Explore traditional villages where families have been making rice paper, coconut candy, and other local products for generations. Learn about the intricate process of rice cultivation and witness the ingenuity of delta farmers who have adapted their lives to the rhythms of the river.'
            },
            {
                type: 'paragraph',
                text: 'The Mekong Delta is also a paradise for food lovers. Sample exotic fruits you\'ve never heard of, enjoy fresh seafood caught daily from the rivers, and savor the region\'s famous elephant ear fish, prepared at your table with fresh herbs and rice paper.'
            }
        ],
        tags: ['Mekong Delta', 'Floating Markets', 'Agriculture', 'Traditional Villages', 'Food'],
        readTime: '4 min read',
        featured: false
    },
    {
        id: 'hoi-an-ancient-town',
        slug: 'hoi-an-ancient-town',
        title: 'Hoi An: Where Time Stands Still',
        date: 'November 8, 2025',
        author: 'VN to You Tour Team',
        category: 'Cultural Insights',
        excerpt: 'Step into the enchanting world of Hoi An Ancient Town, where lantern-lit streets tell stories of centuries past and traditional crafts continue to thrive.',
        content: [
            {
                type: 'paragraph',
                text: 'Hoi An Ancient Town is a living museum where every street corner whispers tales of maritime trade, cultural fusion, and timeless beauty. This UNESCO World Heritage site has preserved its historical charm while embracing modern travelers with open arms.'
            },
            {
                type: 'paragraph',
                text: 'Wander through the narrow streets lined with centuries-old shophouses, their yellow walls glowing in the soft lantern light. Each building tells a story of Chinese merchants, Japanese traders, and Vietnamese families who called this place home.'
            },
            {
                type: 'paragraph',
                text: 'Don\'t miss the famous Japanese Covered Bridge, a symbol of Hoi An built in the 1590s. The bridge represents the harmonious blend of cultures that has defined this town for over 400 years.'
            },
            {
                type: 'paragraph',
                text: 'Hoi An is also renowned for its culinary scene and traditional crafts. Take a cooking class to learn the secrets of cao lau and white rose dumplings, or visit local workshops where artisans create beautiful lanterns, silk products, and wooden sculptures.'
            }
        ],
        tags: ['Hoi An', 'Ancient Town', 'UNESCO', 'Culture', 'Lanterns', 'Food'],
        readTime: '6 min read',
        featured: true
    }
    // When adding new articles, add them anywhere in this array - they will be automatically sorted by date
];