// ===== DEMO DATA: edit, add or remove items here. Add photos by putting files in an img/ folder and setting img:"img/name.jpg" =====
const TOURS=[
 {id:"t1",n:"Historic Istanbul",region:"Istanbul",e:"🕌",c:"linear-gradient(160deg,#f6d365,#fda085)",days:"3 days",price:"From $240",d:"Walk through the heart of old Istanbul, where Europe meets Asia.",hl:["Hagia Sophia and the Blue Mosque","Topkapi Palace","Grand Bazaar and Spice Market"]},
 {id:"t2",n:"Bosphorus Cruise",region:"Istanbul",e:"⛴️",c:"linear-gradient(160deg,#89f7fe,#66a6ff)",days:"Half day",price:"From $35",d:"See palaces, fortresses and waterfront homes from the water.",hl:["Both continents in one trip","Dolmabahce and Rumeli Fortress views","Tea on deck at sunset"]},
 {id:"t3",n:"Cappadocia Balloons",region:"Cappadocia",e:"🎈",c:"linear-gradient(160deg,#fbc2eb,#a6c1ee)",days:"2 days",price:"From $320",d:"Fairy chimneys, cave hotels and sunrise balloon flights.",hl:["Hot air balloon at sunrise (weather permitting)","Goreme Open Air Museum","Cave hotel stay"]},
 {id:"t4",n:"Pamukkale Terraces",region:"Aegean",e:"♨️",c:"linear-gradient(160deg,#e0f7fa,#80deea)",days:"2 days",price:"From $210",d:"White travertine pools and ancient Hierapolis.",hl:["Natural thermal terraces","Hierapolis ancient city","Antique Pool swim"]},
 {id:"t5",n:"Ephesus and Izmir",region:"Aegean",e:"🏛️",c:"linear-gradient(160deg,#d4fc79,#96e6a1)",days:"2 days",price:"From $230",d:"Walk the marble streets of one of the best preserved ancient cities.",hl:["Library of Celsus","Temple of Artemis site","House of the Virgin Mary"]},
 {id:"t6",n:"Antalya Riviera",region:"Mediterranean",e:"🏖️",c:"linear-gradient(160deg,#43e97b,#38f9d7)",days:"4 days",price:"From $380",d:"Turquoise coast, old town harbour and waterfalls.",hl:["Kaleici old town","Duden waterfalls","Boat trip along the coast"]}];
const PRODUCTS=[
 {id:"p1",n:"Men's Leather Oxford",cat:"Shoes",e:"👞",c:"#e8d5c0",price:85,sizes:["40","41","42","43","44","45"],d:"Handcrafted leather dress shoe."},
 {id:"p2",n:"Women's Block Heels",cat:"Shoes",e:"👠",c:"#f7d6e0",price:70,sizes:["36","37","38","39","40"],d:"Comfortable heels for events and office."},
 {id:"p3",n:"Men's Sneakers",cat:"Shoes",e:"👟",c:"#d6e4f7",price:60,sizes:["40","41","42","43","44","45"],d:"Everyday casual sneakers."},
 {id:"p4",n:"Elegant Pink Dress",cat:"Ladies wear",e:"👗",c:"#f9d5ec",price:95,sizes:["S","M","L","XL","XXL"],d:"Flowing dress in sizes up to plus size."},
 {id:"p5",n:"Silk Scarf",cat:"Ladies wear",e:"🧣",c:"#e3d9f7",price:25,d:"Soft printed scarf."},
 {id:"p6",n:"Men's Two-Piece Suit",cat:"Men's wear",e:"🤵",c:"#d0d7e5",price:210,sizes:["48","50","52","54","56"],d:"Tailored fit suit."},
 {id:"p7",n:"Leather Handbag",cat:"Accessories",e:"👜",c:"#f0dcc4",price:75,d:"Spacious everyday bag."},
 {id:"p8",n:"Leather Belt",cat:"Accessories",e:"🧵",c:"#e6dccd",price:30,d:"Genuine leather belt."}];
