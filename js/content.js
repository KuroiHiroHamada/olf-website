const CONTENT = {
 "config": {
  "whatsapp": "905312784676",
  "email": "outshinealuconst@yahoo.com",
  "ghana": "+233 24 481 3141",
  "turkey": "+90 531 278 46 76"
 },
 "services": [
  {
   "id": "prefab",
   "ic": "🏠",
   "n": "Pre-fabricated Housing",
   "d": "Ready-to-assemble homes, shipped and set up.",
   "link": "prefab.html",
   "act": "Explore homes",
   "more": "Browse a range of pre-fabricated houses, from compact studios to family villas. Each home is built in sections, shipped to you and assembled on your plot, which saves time compared with traditional building.",
   "pts": ["Explore each house in 3D, room by room", "Options for different sizes and budgets", "Shipping and delivery arranged with your order"],
   "img": "",
   "shop": false
  },
  {
   "id": "estate",
   "ic": "🏢",
   "n": "Estate Management",
   "d": "Property care, tenants and maintenance handled.",
   "more": "Let us look after your property while you are away or busy. We act as your on-the-ground team so your investment stays in good shape.",
   "pts": ["Routine inspections and maintenance", "Tenant sourcing and rent follow-up", "Regular updates to you"],
   "img": "",
   "shop": false
  },
  {
   "id": "travel",
   "ic": "✈️",
   "n": "Inbound Travel Consulting",
   "d": "Plan your trip to Turkey, from visa to hotel.",
   "link": "tours.html",
   "act": "Explore tours",
   "more": "Coming to Istanbul for business, shopping or leisure? We help you plan the trip so you arrive prepared and make the most of your time.",
   "pts": ["Visa and entry guidance", "Hotel and transport suggestions", "Guidance for sourcing trips and market visits"],
   "img": "",
   "shop": false
  },
  {
   "id": "freight",
   "ic": "🚢",
   "n": "Freight",
   "d": "Air, sea and road freight from Istanbul.",
   "more": "We move goods in larger volumes by the mode that suits your timeline and budget: air for speed, sea for bulk, road for regional deliveries.",
   "pts": ["Air, sea and road options", "Help with shipping paperwork", "Suitable for businesses and bulk orders"],
   "img": "",
   "shop": false
  },
  {
   "id": "cargo",
   "ic": "📦",
   "n": "Cargo and Logistics",
   "d": "Door-to-door cargo, packing and tracking.",
   "more": "Our door-to-door cargo service collects your goods, packs them securely and delivers them to your address, with offices in both Turkey and Ghana to support you.",
   "pts": ["Door-to-door pickup and delivery", "Secure packing", "Support from our Istanbul and Accra offices"],
   "img": "",
   "shop": false
  },
  {
   "id": "apparel",
   "ic": "👗",
   "n": "Apparel and Clothing",
   "d": "Shoes, ladies wear and fashion sourcing.",
   "link": "",
   "act": "",
   "more": "Buy quality Turkish fashion without the hassle. We source shoes, ladies wear and other apparel, and can ship your order straight to you.",
   "pts": ["Shoes, clothing and ladies wear", "Sourcing for resellers and individuals", "Combine with our cargo service for delivery"],
   "img": "",
   "shop": true
  },
  {
   "id": "building",
   "ic": "🏗️",
   "n": "Building Materials and Interior Fit-out",
   "img": "",
   "d": "Locks, doors, furniture, appliances and fittings for homes and hotels.",
   "more": "Source building materials and interior fit-out products for homes, hotels and commercial projects, from hotel card lock systems to furniture, appliances and sanitaryware.",
   "pts": ["Hotel card locks and systems", "Security doors and accessories", "Contract furniture, home appliances, sanitaryware and casework"],
   "link": "",
   "act": "",
   "shop": true
  }
 ],
 "reasons": [
  {
   "ic": "💡",
   "n": "Solution",
   "d": "One partner for shipping, housing, travel and sourcing.",
   "more": "Instead of juggling several companies, you deal with one team that can handle your cargo, your property and your trip to Turkey.",
   "pts": ["Six services under one roof", "One point of contact", "Less paperwork and fewer delays"],
   "img": ""
  },
  {
   "ic": "🌍",
   "n": "Experience",
   "d": "Door-to-door cargo between Turkey and Ghana.",
   "more": "We operate with offices in Istanbul and Accra, so we understand both ends of the journey your goods or plans take.",
   "pts": ["Presence in Turkey and Ghana", "Knowledge of both markets", "Guidance you can ask for in person"],
   "img": ""
  },
  {
   "ic": "⚡",
   "n": "Convenience",
   "d": "Book online in a minute through WhatsApp or email.",
   "more": "Fill in a short form and your booking arrives straight on WhatsApp or email, so you can chat with us right away.",
   "pts": ["Quick online booking", "Talk to us on WhatsApp", "Pick the services you need in one go"],
   "img": ""
  }
 ],
 "tours": [
  {
   "id": "t1",
   "n": "Historic Istanbul",
   "region": "istanbul",
   "e": "🕌",
   "c": "linear-gradient(160deg,#f6d365,#fda085)",
   "days": "3 days",
   "price": "From $240",
   "d": "Walk through the heart of old Istanbul, where Europe meets Asia.",
   "hl": ["Hagia Sophia and the Blue Mosque", "Topkapi Palace", "Grand Bazaar and Spice Market"]
  },
  {
   "id": "t2",
   "n": "Bosphorus Cruise",
   "region": "istanbul",
   "e": "⛴️",
   "c": "linear-gradient(160deg,#89f7fe,#66a6ff)",
   "days": "Half day",
   "price": "From $35",
   "d": "See palaces, fortresses and waterfront homes from the water.",
   "hl": ["Both continents in one trip", "Dolmabahce and Rumeli Fortress views", "Tea on deck at sunset"]
  },
  {
   "id": "t3",
   "n": "Cappadocia Balloons",
   "region": "cappadocia",
   "e": "🎈",
   "c": "linear-gradient(160deg,#fbc2eb,#a6c1ee)",
   "days": "2 days",
   "price": "From $320",
   "d": "Fairy chimneys, cave hotels and sunrise balloon flights.",
   "hl": ["Hot air balloon at sunrise (weather permitting)", "Goreme Open Air Museum", "Cave hotel stay"]
  },
  {
   "id": "t4",
   "n": "Pamukkale Terraces",
   "region": "aegean",
   "e": "♨️",
   "c": "linear-gradient(160deg,#e0f7fa,#80deea)",
   "days": "2 days",
   "price": "From $210",
   "d": "White travertine pools and ancient Hierapolis.",
   "hl": ["Natural thermal terraces", "Hierapolis ancient city", "Antique Pool swim"]
  },
  {
   "id": "t5",
   "n": "Ephesus and Izmir",
   "region": "aegean",
   "e": "🏛️",
   "c": "linear-gradient(160deg,#d4fc79,#96e6a1)",
   "days": "2 days",
   "price": "From $230",
   "d": "Walk the marble streets of one of the best preserved ancient cities.",
   "hl": ["Library of Celsus", "Temple of Artemis site", "House of the Virgin Mary"]
  },
  {
   "id": "t6",
   "n": "Antalya Riviera",
   "region": "mediterranean",
   "e": "🏖️",
   "c": "linear-gradient(160deg,#43e97b,#38f9d7)",
   "days": "4 days",
   "price": "From $380",
   "d": "Turquoise coast, old town harbour and waterfalls.",
   "hl": ["Kaleici old town", "Duden waterfalls", "Boat trip along the coast"]
  }
 ],
 "products": [
  {
   "id": "p1",
   "n": "Men's Leather Oxford",
   "cat": "shoes",
   "e": "👞",
   "c": "#e8d5c0",
   "price": 85,
   "sizes": ["40", "41", "42", "43", "44", "45"],
   "d": "Handcrafted leather dress shoe."
  },
  {
   "id": "p2",
   "n": "Women's Block Heels",
   "cat": "shoes",
   "e": "👠",
   "c": "#f7d6e0",
   "price": 70,
   "sizes": ["36", "37", "38", "39", "40"],
   "d": "Comfortable heels for events and office."
  },
  {
   "id": "p3",
   "n": "Men's Sneakers",
   "cat": "shoes",
   "e": "👟",
   "c": "#d6e4f7",
   "price": 60,
   "sizes": ["40", "41", "42", "43", "44", "45"],
   "d": "Everyday casual sneakers."
  },
  {
   "id": "p4",
   "n": "Elegant Pink Dress",
   "cat": "ladies",
   "e": "👗",
   "c": "#f9d5ec",
   "price": 95,
   "sizes": ["S", "M", "L", "XL", "XXL"],
   "d": "Flowing dress in sizes up to plus size."
  },
  {
   "id": "p5",
   "n": "Silk Scarf",
   "cat": "ladies",
   "e": "🧣",
   "c": "#e3d9f7",
   "price": 25,
   "d": "Soft printed scarf."
  },
  {
   "id": "p6",
   "n": "Men's Two-Piece Suit",
   "cat": "mens",
   "e": "🤵",
   "c": "#d0d7e5",
   "price": 210,
   "sizes": ["48", "50", "52", "54", "56"],
   "d": "Tailored fit suit."
  },
  {
   "id": "p7",
   "n": "Leather Handbag",
   "cat": "accessories",
   "e": "👜",
   "c": "#f0dcc4",
   "price": 75,
   "d": "Spacious everyday bag."
  },
  {
   "id": "p8",
   "n": "Leather Belt",
   "cat": "accessories",
   "e": "🧵",
   "c": "#e6dccd",
   "price": 30,
   "d": "Genuine leather belt."
  },
  {
   "id": "b1",
   "n": "Electronic hotel door lock",
   "cat": "hotel-locks",
   "e": "🔐",
   "c": "#d6e4f7",
   "img": "",
   "price": 0,
   "sizes": [],
   "d": "Key card lock for hotel guest rooms."
  },
  {
   "id": "b2",
   "n": "Key card encoder and software",
   "cat": "hotel-locks",
   "e": "💳",
   "c": "#d6e4f7",
   "img": "",
   "price": 0,
   "sizes": [],
   "d": "Programs key cards and manages room access."
  },
  {
   "id": "b3",
   "n": "Steel security door",
   "cat": "security-doors",
   "e": "🚪",
   "c": "#e8d5c0",
   "img": "",
   "price": 0,
   "sizes": [],
   "d": "Reinforced door for homes and apartments."
  },
  {
   "id": "b4",
   "n": "Hotel room furniture set",
   "cat": "contract-furniture",
   "e": "🛏️",
   "c": "#f0dcc4",
   "img": "",
   "price": 0,
   "sizes": [],
   "d": "Bed, wardrobe and bedside tables for hotel rooms."
  },
  {
   "id": "b5",
   "n": "Home appliance package",
   "cat": "home-appliances",
   "e": "🧊",
   "c": "#e3d9f7",
   "img": "",
   "price": 0,
   "sizes": [],
   "d": "Kitchen and household appliances, supplied as a package."
  },
  {
   "id": "b6",
   "n": "Bathroom sanitaryware set",
   "cat": "sanitaryware",
   "e": "🚽",
   "c": "#cfe0e6",
   "img": "",
   "price": 0,
   "sizes": [],
   "d": "Toilet, basin and fittings set."
  },
  {
   "id": "b7",
   "n": "Fitted kitchen cabinets",
   "cat": "sanitaryware",
   "e": "🗄️",
   "c": "#cfe0e6",
   "img": "",
   "price": 0,
   "sizes": [],
   "d": "Made-to-measure cabinetry and casework."
  }
 ],
 "houses": [
  {
   "n": "RH 107",
   "e": "🏠",
   "c": "#e9d4bd",
   "img": "",
   "type": "2+1+K",
   "size": "69 m²",
   "price": "Request a quote",
   "wall": "#c8935a",
   "roof": "#c0272d",
   "plan": [
    [
     ["b", 0, 0, 3.81, 3.86],
     ["l", 0, 3.86, 3.81, 5.12],
     ["b", 3.81, 0, 3.82, 2.62],
     ["h", 3.81, 2.62, 1.39, 5],
     ["t", 5.2, 2.62, 2.43, 2.1],
     ["k", 5.2, 4.72, 2.43, 2.9],
     ["o", 3.81, 7.62, 3.82, 1.36]
    ]
   ]
  },
  {
   "n": "RH 108",
   "e": "🏠",
   "c": "#e2f2ca",
   "img": "",
   "type": "2+1+K",
   "size": "72 m²",
   "price": "Request a quote",
   "wall": "#b7df7b",
   "roof": "#c0272d",
   "plan": [
    [
     ["l", 0, 0, 4.44, 3.91],
     ["t", 4.44, 0, 1.88, 2.6],
     ["b", 6.32, 0, 3.19, 3.81],
     ["h", 4.44, 2.6, 1.88, 5.13],
     ["k", 1.5, 3.91, 2.94, 3.82],
     ["b", 6.32, 3.81, 3.19, 3.92],
     ["o", 4.44, 7.73, 1.88, 1.2]
    ]
   ]
  },
  {
   "n": "RH 109",
   "e": "🏠",
   "c": "#f9f5d0",
   "img": "",
   "type": "2+1",
   "size": "73 m²",
   "price": "Request a quote",
   "wall": "#f0e58a",
   "roof": "#c0272d",
   "plan": [
    [
     ["l", 0, 0, 5.07, 7.05],
     ["t", 5.07, 0, 2.51, 2.8],
     ["h", 5.07, 2.8, 2.51, 2.8],
     ["b", 7.58, 0, 3.81, 3.86],
     ["b", 7.58, 3.86, 3.81, 3.19],
     ["o", 5.07, 5.6, 2.51, 1.45]
    ]
   ]
  },
  {
   "n": "RH 110",
   "e": "🏠",
   "c": "#f0d5bf",
   "img": "",
   "type": "2+1+K",
   "size": "74 m²",
   "price": "Request a quote",
   "wall": "#d9955f",
   "roof": "#c0272d",
   "plan": [
    [
     ["b", 0, 0, 2.56, 3.86],
     ["t", 2.56, 0, 2.51, 2.4],
     ["t", 5.07, 0, 1.25, 2.4],
     ["k", 6.32, 0, 2.56, 3.86],
     ["h", 2.56, 2.4, 3.76, 1.46],
     ["h", 3.81, 3.86, 1.26, 3.87],
     ["l", 0, 3.86, 3.81, 3.87],
     ["b", 5.07, 3.86, 3.81, 3.87],
     ["o", 3.81, 7.73, 5.07, 1.25]
    ]
   ]
  },
  {
   "n": "RH 200",
   "e": "🏘️",
   "c": "#e9daa9",
   "img": "",
   "type": "2+1+K",
   "size": "82 m²",
   "price": "Request a quote",
   "wall": "#c9a227",
   "roof": "#c0272d",
   "plan": [
    [
     ["t", 0, 0, 2.56, 1.2],
     ["k", 0, 1.2, 2.56, 3.9],
     ["o", 0, 5.1, 2.56, 1.38],
     ["h", 2.56, 0, 1.3, 2.61],
     ["s", 3.86, 0, 2.52, 2.61, "s"],
     ["l", 2.56, 2.61, 3.82, 3.87]
    ],
    [
     ["t", 0, 0, 3.82, 1.4],
     ["h", 0, 1.4, 3.82, 1.21],
     ["s", 3.82, 0, 2.56, 2.61, "s"],
     ["b", 0, 2.61, 2.56, 2.49],
     ["n", 0, 5.1, 2.56, 1.38],
     ["b", 2.56, 2.61, 3.82, 3.87]
    ]
   ]
  },
  {
   "n": "RH 201",
   "e": "🏘️",
   "c": "#f3e9d2",
   "img": "",
   "type": "2+1+K",
   "size": "92 m²",
   "price": "Request a quote",
   "wall": "#e0c78f",
   "roof": "#c0272d",
   "plan": [
    [
     ["k", 0, 0, 3.24, 2.5],
     ["t", 3.24, 0, 0.9, 2.5],
     ["s", 4.14, 0, 2.24, 2.5, "s"],
     ["h", 0, 2.5, 6.38, 1.7],
     ["l", 0, 4.2, 6.38, 3.48]
    ],
    [
     ["t", 0, 0, 3.24, 1.98],
     ["h", 3.24, 0, 0.96, 2.5],
     ["s", 4.2, 0, 2.18, 2.5, "s"],
     ["h", 3.24, 2.5, 3.14, 1.9],
     ["b", 0, 1.98, 3.24, 3.19],
     ["n", 0, 5.17, 3.24, 2.51],
     ["b", 3.24, 4.4, 3.14, 3.28]
    ]
   ],
   "door": [0, 3.35, "v"]
  },
  {
   "n": "RH 125",
   "e": "🏠",
   "c": "#d1a4a4",
   "img": "",
   "type": "3+1+K",
   "size": "98 m²",
   "price": "Request a quote",
   "wall": "#8c1c1c",
   "roof": "#2e8b57",
   "plan": [
    [
     ["b", 0, 0, 3.19, 3.9],
     ["b", 0, 3.9, 3.19, 3.2],
     ["t", 3.19, 0, 1.6, 2.4],
     ["h", 3.19, 2.4, 1.6, 1.5],
     ["k", 4.79, 0, 2.9, 3.9],
     ["b", 7.69, 0, 2.51, 3.9],
     ["l", 10.2, 0, 3.7, 7.1],
     ["h", 3.19, 3.9, 7.01, 1.9],
     ["o", 3.19, 5.8, 7.01, 1.3]
    ]
   ]
  },
  {
   "n": "RH 126",
   "e": "🏠",
   "c": "#f5e9d7",
   "img": "",
   "type": "3+1+K",
   "size": "100 m²",
   "price": "Request a quote",
   "wall": "#e5c99a",
   "roof": "#c0272d",
   "plan": [
    [
     ["b", 0, 0, 3.24, 3.19],
     ["b", 0, 3.19, 3.24, 2.51],
     ["k", 0, 5.7, 3.24, 3.82],
     ["t", 3.24, 0, 1.88, 2],
     ["h", 3.24, 2, 1.88, 7.52],
     ["b", 5.12, 0, 3.81, 3.7],
     ["l", 5.12, 3.7, 3.81, 5.82],
     ["o", 3.24, 9.52, 5.69, 1.87]
    ]
   ]
  },
  {
   "n": "RH 202",
   "e": "🏘️",
   "c": "#f9f9f6",
   "img": "",
   "type": "2+1",
   "size": "100 m²",
   "price": "Request a quote",
   "wall": "#f1efe8",
   "roof": "#c0272d",
   "plan": [
    [
     ["t", 0, 0, 2.56, 1.2],
     ["h", 2.56, 0, 2.51, 2.61],
     ["h", 0, 1.2, 2.56, 1.41],
     ["s", 5.07, 0, 2.56, 2.61, "s"],
     ["l", 0, 2.61, 5.07, 3.19],
     ["l", 2.56, 5.8, 2.51, 1.3],
     ["k", 5.07, 2.61, 2.56, 4.49],
     ["o", 0, 5.8, 2.56, 1.3]
    ],
    [
     ["t", 0, 0, 3.82, 1.3],
     ["s", 3.82, 0, 3.81, 1.3, "s"],
     ["h", 0, 1.3, 7.63, 1.31],
     ["b", 0, 2.61, 3.82, 4.49],
     ["b", 3.82, 2.61, 3.81, 4.49]
    ]
   ]
  },
  {
   "n": "RH 203",
   "e": "🏘️",
   "c": "#d7d9d5",
   "img": "",
   "type": "3+1+K",
   "size": "101 m²",
   "price": "Request a quote",
   "wall": "#9a9f97",
   "roof": "#c0272d",
   "plan": [
    [
     ["b", 0, 0, 2.54, 3.86],
     ["k", 2.54, 0, 2.56, 2.7],
     ["h", 2.54, 2.7, 2.56, 1.16],
     ["s", 5.1, 2.7, 1.2, 2.5, "s"],
     ["l", 0, 3.86, 5.1, 3.86],
     ["l", 5.1, 5.2, 1.2, 2.52],
     ["o", 0, 7.72, 6.3, 1.89]
    ],
    [
     ["b", 0, 0, 2.54, 3.86],
     ["t", 2.54, 0, 2.56, 2.7],
     ["h", 2.54, 2.7, 2.56, 1.16],
     ["s", 5.1, 2.7, 1.2, 2.5, "s"],
     ["b", 0, 3.86, 5.1, 3.86]
    ]
   ]
  },
  {
   "n": "RH 204",
   "e": "🏘️",
   "c": "#f9f1cd",
   "img": "",
   "type": "3+1+K",
   "size": "105 m²",
   "price": "Request a quote",
   "wall": "#f0dc82",
   "roof": "#c0272d",
   "plan": [
    [
     ["t", 0, 0, 1.93, 1.98],
     ["s", 1.93, 0, 1.93, 1.98, "s"],
     ["h", 0, 1.98, 3.86, 1.88],
     ["k", 0, 3.86, 3.86, 3.24],
     ["l", 3.86, 0, 3.77, 5.79],
     ["o", 3.86, 5.79, 3.77, 1.31]
    ],
    [
     ["t", 0, 0, 2, 2.5],
     ["s", 2, 0, 1.86, 1.5, "s"],
     ["h", 2, 1.5, 1.86, 1],
     ["h", 0, 2.5, 3.86, 2.1],
     ["b", 3.86, 0, 3.76, 2.56],
     ["b", 3.86, 2.56, 3.76, 2.56],
     ["b", 0, 4.6, 3.86, 2.5],
     ["n", 3.86, 5.12, 3.76, 1.31]
    ]
   ],
   "door": [0, 2.9, "v"]
  },
  {
   "n": "RH 132",
   "e": "🏠",
   "c": "#fae8d2",
   "img": "",
   "type": "3+1+K",
   "size": "123 m²",
   "price": "Request a quote",
   "wall": "#f2c58f",
   "roof": "#c0272d",
   "plan": [
    [
     ["l", 0, 0, 4.44, 6.48],
     ["k", 4.44, 0, 3.14, 3.2],
     ["t", 7.58, 0, 1.26, 3.2],
     ["t", 8.84, 0, 1.88, 3.2],
     ["b", 10.72, 0, 3.81, 4.2],
     ["h", 4.44, 3.2, 6.28, 1.8],
     ["b", 5.2, 5, 2.6, 3.9],
     ["b", 7.9, 5, 2.6, 3.9],
     ["o", 0, 6.48, 4.44, 2.46]
    ]
   ]
  },
  {
   "n": "RH 209",
   "e": "🏘️",
   "c": "#ecd0ab",
   "img": "",
   "type": "3+1+K",
   "size": "131 m²",
   "price": "Request a quote",
   "wall": "#d08a2c",
   "roof": "#c0272d",
   "plan": [
    [
     ["t", 0, 0, 1.93, 2.61],
     ["s", 1.93, 0, 1.88, 2.61, "s"],
     ["h", 0, 2.61, 3.81, 1.26],
     ["k", 0, 3.87, 3.81, 3.86],
     ["l", 3.81, 0, 5.07, 5],
     ["o", 3.81, 5, 5.07, 3]
    ],
    [
     ["t", 0, 0, 1.93, 2.61],
     ["s", 1.93, 0, 1.88, 2.61, "s"],
     ["b", 3.81, 0, 5.07, 2.61],
     ["h", 0, 2.61, 8.88, 1.26],
     ["b", 0, 3.87, 3.81, 3.86],
     ["h", 3.81, 3.87, 1.19, 3.87],
     ["b", 5, 3.87, 3.88, 3.87]
    ]
   ]
  },
  {
   "n": "RH 210",
   "e": "🏘️",
   "c": "#d1a4a4",
   "img": "",
   "type": "3+1",
   "size": "134 m²",
   "price": "Request a quote",
   "wall": "#8c1c1c",
   "roof": "#c0272d",
   "plan": [
    [
     ["b", 0, 0, 3.29, 5.07],
     ["h", 3.29, 0, 1.16, 2.4],
     ["t", 4.45, 0, 3.28, 2.4],
     ["s", 6, 2.4, 1.73, 2.67, "s"],
     ["l", 3.29, 2.4, 2.71, 6.99],
     ["l", 6, 5.07, 1.73, 4.32],
     ["k", 0, 5.07, 3.29, 4.32],
     ["o", 2.2, 9.39, 2.9, 1.38]
    ],
    [
     ["b", 1.26, 0, 3.24, 5.07],
     ["t", 4.5, 0, 1.98, 2.4],
     ["h", 4.5, 2.4, 1.98, 2.67],
     ["s", 6.47, 2.4, 1.26, 2.67, "s"],
     ["b", 1.26, 5.07, 5, 4.44],
     ["n", 2.6, 9.51, 2.5, 1.26]
    ]
   ]
  },
  {
   "n": "RH 212",
   "e": "🏘️",
   "c": "#d1a4a4",
   "img": "",
   "type": "4+1",
   "size": "149 m²",
   "price": "Request a quote",
   "wall": "#8c1c1c",
   "roof": "#2e8b57",
   "plan": [
    [
     ["b", 0, 0, 2.61, 3.82],
     ["t", 2.61, 0, 1.26, 2.3],
     ["t", 3.87, 0, 1.26, 2.3],
     ["s", 5.13, 0, 2.6, 3.82, "s"],
     ["h", 2.61, 2.3, 2.52, 1.52],
     ["l", 0, 3.82, 7.73, 3.82],
     ["o", 0, 7.64, 7.73, 2.52]
    ],
    [
     ["b", 0, 0, 2.61, 3.82],
     ["t", 2.61, 0, 2.51, 2.4],
     ["s", 5.12, 0, 2.61, 3.82, "s"],
     ["h", 2.61, 2.4, 2.51, 1.42],
     ["b", 0, 3.82, 3.76, 3.82],
     ["b", 3.76, 3.82, 3.97, 3.82],
     ["n", 3.76, 7.64, 3.97, 2.52]
    ]
   ]
  },
  {
   "n": "RH 213",
   "e": "🏘️",
   "c": "#d7e8bb",
   "img": "",
   "type": "4+1",
   "size": "150 m²",
   "price": "Request a quote",
   "wall": "#9bc656",
   "roof": "#c0272d",
   "plan": [
    [
     ["t", 0, 0, 2.5, 2.9],
     ["s", 2.5, 0, 2.6, 2.9, "s"],
     ["b", 5.1, 0, 2.53, 3.86],
     ["h", 0, 2.9, 5.1, 0.96],
     ["l", 0, 3.86, 7.63, 5.07],
     ["o", 0, 8.93, 5, 1.26]
    ],
    [
     ["t", 0, 0, 2.5, 2.9],
     ["s", 2.5, 0, 2.6, 2.9, "s"],
     ["b", 5.1, 0, 2.53, 3.82],
     ["h", 0, 2.9, 5.1, 0.92],
     ["b", 0, 3.82, 3, 5.11],
     ["b", 3, 3.82, 4.63, 5.11],
     ["n", 3, 8.93, 4.63, 1.26]
    ]
   ]
  }
 ],
 "site": {
  "logo": "OLF",
  "name": "One Life Business Consultants, Istanbul",
  "heroTitle": "One solution for your every need.",
  "heroText": "Cargo, logistics, housing and more, all in one place in Istanbul.",
  "blue": "#2a52be",
  "lime": "#b4c424",
  "navy": "#1b2b48",
  "cream": "#fff3e0"
 },
 "faq": [
  {
   "n": "How do I book a service?",
   "a": "Open the Book now page, pick the services you need and fill in your details. Your request opens in WhatsApp so you can send it to us, and we reply to confirm details and price."
  },
  {
   "n": "How do I get a price for cargo or freight?",
   "a": "Prices depend on what you ship, its weight and size, the route and how fast you need it. Send those details through the booking form or on WhatsApp and we will quote you."
  },
  {
   "n": "How long does shipping take?",
   "a": "It depends on the route, the shipping method (air, sea or road) and customs. We give you an estimate with your quote."
  },
  {
   "n": "Which countries do you serve?",
   "a": "We operate from Istanbul and Accra and handle cargo between Turkey and Ghana. Ask us if you need another destination."
  },
  {
   "n": "What items cannot be shipped?",
   "a": "Some goods are restricted by airlines, shipping lines or customs. Tell us what you plan to send and we will confirm before you pay."
  },
  {
   "n": "Can I see the pre-fabricated houses before I buy?",
   "a": "Yes. On the Prefab Homes page you can explore each model in 3D. The layouts are based on the catalogue floor plans, so ask us for the exact plans and specifications."
  },
  {
   "n": "How do I pay for shop orders?",
   "a": "Your order is sent to us on WhatsApp. We confirm availability, the total, delivery cost and payment method with you. The website does not take card payments."
  },
  {
   "n": "How can I follow up on my shipment?",
   "a": "Message us on WhatsApp with the name you booked under and we will update you."
  },
  {
   "n": "Do you help visitors who are travelling to Turkey?",
   "a": "Yes. Our Inbound Travel Consulting service helps you plan your trip, and the Tours page shows popular destinations."
  }
 ],
 "categories": [
  {
   "id": "shoes",
   "n": "Shoes",
   "e": "👟",
   "c": "#e8d5c0",
   "img": "",
   "d": "Men's and women's shoes",
   "svc": "apparel"
  },
  {
   "id": "ladies",
   "n": "Ladies wear",
   "e": "👗",
   "c": "#f9d5ec",
   "img": "",
   "d": "Dresses, scarves and more",
   "svc": "apparel"
  },
  {
   "id": "mens",
   "n": "Men's wear",
   "e": "🤵",
   "c": "#d0d7e5",
   "img": "",
   "d": "Suits, shirts and more",
   "svc": "apparel"
  },
  {
   "id": "accessories",
   "n": "Accessories",
   "e": "👜",
   "c": "#f0dcc4",
   "img": "",
   "d": "Bags, belts and more",
   "svc": "apparel"
  },
  {
   "id": "hotel-locks",
   "svc": "building",
   "n": "Hotel card locks and systems",
   "e": "🔐",
   "c": "#d6e4f7",
   "img": "",
   "d": "Electronic locks and key card systems for hotels"
  },
  {
   "id": "security-doors",
   "svc": "building",
   "n": "Security doors and accessories",
   "e": "🚪",
   "c": "#e8d5c0",
   "img": "",
   "d": "Doors, handles and door accessories"
  },
  {
   "id": "contract-furniture",
   "svc": "building",
   "n": "Contract furniture",
   "e": "🛋️",
   "c": "#f0dcc4",
   "img": "",
   "d": "Furniture for hotels, offices and projects"
  },
  {
   "id": "home-appliances",
   "svc": "building",
   "n": "Home appliances",
   "e": "🔌",
   "c": "#e3d9f7",
   "img": "",
   "d": "Appliances for homes and hotels"
  },
  {
   "id": "sanitaryware",
   "svc": "building",
   "n": "Sanitaryware and casework",
   "e": "🚿",
   "c": "#cfe0e6",
   "img": "",
   "d": "Bathroom fittings and fitted cabinetry"
  }
 ],
 "destinations": [
  {
   "id": "istanbul",
   "n": "Istanbul",
   "e": "🕌",
   "c": "#f6d365",
   "img": "",
   "d": "Palaces, mosques, bazaars and the Bosphorus"
  },
  {
   "id": "cappadocia",
   "n": "Cappadocia",
   "e": "🎈",
   "c": "#fbc2eb",
   "img": "",
   "d": "Fairy chimneys and balloon flights"
  },
  {
   "id": "aegean",
   "n": "Aegean",
   "e": "🏛️",
   "c": "#96e6a1",
   "img": "",
   "d": "Ancient cities and thermal pools"
  },
  {
   "id": "mediterranean",
   "n": "Mediterranean",
   "e": "🏖️",
   "c": "#7be8d6",
   "img": "",
   "d": "Turquoise coast and old harbours"
  }
 ]
};
