const Product = require("../models/Product");
const Brand = require("../models/Brand");
const Category = require("../models/Category");

const products = [
  {
    title: "Adidas UltraBoost Running Shoes",
    description: "Experience unmatched comfort and performance with Adidas UltraBoost, designed for athletes and everyday wear.",
    price: 299,
    discountPercentage: 15,
    stockQuantity: 100,
    brand: "adidas",
    category: "mens-shoes",
    thumbnail: "/images/products/adidas1.jpg",
    images: [
      "/images/products/adidas1.jpg",
      "/images/products/adidas2.jpg",
      "/images/products/adidas3.jpg"
    ],
    isDeleted: false
  },

  {
    title: "Boho Macrame Wall Hanging",
    description: "Add a natural, handcrafted charm to your space with this Boho macrame wall decor — perfect for bedrooms, living rooms, and cozy corners.",
    price: 79,
    discountPercentage: 10,
    stockQuantity: 40,
    brand: "boho",
    category: "decor",
    thumbnail: "/images/products/boho1.jpg",
    images: [
      "/images/products/boho1.jpg",
      "/images/products/boho2.jpg"
    ],
    isDeleted: false
  },

  {
    title: "Fossil Men's Chronograph Watch",
    description: "A timeless Fossil chronograph watch featuring a stainless steel case and a genuine leather strap — the perfect blend of style and precision.",
    price: 189,
    discountPercentage: 12,
    stockQuantity: 60,
    brand: "fossil",
    category: "watches",
    thumbnail: "/images/products/fossil1.jpg",
    images: [
      "/images/products/fossil1.jpg",
      "/images/products/fossil12.jpg",
      "/images/products/fossil3.jpg"
    ],
    isDeleted: false
  },
  
  {
    title: "H&M Cotton Unisex T-Shirt",
    description: "Comfortable and casual, this H&M unisex cotton t-shirt is perfect for everyday wear. Soft fabric and a relaxed fit for all genders.",
    price: 59,
    discountPercentage: 8,
    stockQuantity: 80,
    brand: "hm",
    category: "uni sex tops",
    thumbnail: "/images/products/hm1.jpg",
    images: [
      "/images/products/hm1.jpg",
      "/images/products/hm2.jpg",
      "/images/products/hm3.jpg"
    ],
    isDeleted: false
  },

  {
    title: "Home Center Wooden Wall Shelf Decor",
    description: "Modern circular wall shelf with minimalistic decor. Ideal for organizing books, candles, and plants with elegance.",
    price: 129,
    discountPercentage: 10,
    stockQuantity: 25,
    brand: "home center",
    category: "furniture",
    thumbnail: "/images/products/home1.jpg",
    images: [
      "/images/products/home1.jpg",
      "/images/products/home2.jpg"
    ],
    isDeleted: false
  },

  {
    title: "Huawei Nova 11 Pro",
    description: "Sleek design meets power — the Huawei Nova 11 Pro features a stunning display, high-resolution camera, and long-lasting battery life.",
    price: 599,
    discountPercentage: 11,
    stockQuantity: 70,
    brand: "huawei",
    category: "smartphones",
    thumbnail: "/images/products/huawei1.jpg",
    images: [
      "/images/products/huawei1.jpg",
      "/images/products/huawei2.jpg",
      "/images/products/huawei3.jpg"
    ],
    isDeleted: false
  },

  {
    title: "IKEA LED Strip Light – Warm White",
    description: "Flexible and modern LED strip light from IKEA. Perfect for under-cabinet lighting, ambient glow, or creative home decor setups.",
    price: 39,
    discountPercentage: 6,
    stockQuantity: 100,
    brand: "ikea",
    category: "decor",
    thumbnail: "/images/products/ikea1.jpg",
    images: [
      "/images/products/ikea1.jpg",
      "/images/products/ikea2.jpg",
      "/images/products/ikea3.jpg"
    ],
    isDeleted: false
  }, 
  {
    title: "Apple iPhone 15 Pro",
    description: "The all-new iPhone 15 Pro with A17 chip, titanium body, and industry-leading camera system. Power meets elegance.",
    price: 1199,
    discountPercentage: 5,
    stockQuantity: 50,
    brand: "apple",
    category: "smartphones",
    thumbnail: "/images/products/iphone15.jpg",
    images: [
      "/images/products/iphone15.jpg",
      "/images/products/iphone15_2.png",
      "/images/products/iphone15_3.jpg"
    ],
    isDeleted: false
  },

  {
    title: "L'Oréal Paris Revitalift Anti-Aging Cream",
    description: "Revitalize your skin with L'Oréal's Revitalift Night and Day creams. Powered by Retinol and Niacinamide to reduce wrinkles, firm skin, and deeply hydrate.",
    price: 79,
    discountPercentage: 10,
    stockQuantity: 120,
    brand: "l'oreal",
    category: "skincare",
    thumbnail: "/images/products/l'oreal1.jpg",
    images: [
      "/images/products/l'oreal1.jpg",
      "/images/products/l'oreal2.jpg",
      "/images/products/l'oreal3.png"
    ],
    isDeleted: false
  },

  {
    title: "Apple MacBook Pro 16-inch M2",
    description: "Unleash power and creativity with the MacBook Pro featuring the Apple M2 chip, Liquid Retina display, and all-day battery life.",
    price: 2499,
    discountPercentage: 7,
    stockQuantity: 35,
    brand: "apple",
    category: "laptops",
    thumbnail: "/images/products/macbookpro1.jpg",
    images: [
      "/images/products/macbookpro1.jpg",
      "/images/products/macbookpro2.jpg",
      "/images/products/macbookpro3.jpg"
    ],
    isDeleted: false
  },

  {
    title: "Nike Sportswear Full-Zip Hoodie",
    description: "Stay warm and stylish with Nike’s signature full-zip hoodie collection. Soft fleece, bold designs, and iconic branding for all-day comfort.",
    price: 119,
    discountPercentage: 10,
    stockQuantity: 75,
    brand: "nike",
    category: "uni sex tops",
    thumbnail: "/images/products/nike1.jpg",
    images: [
      "/images/products/nike1.jpg",
      "/images/products/nike2.jpg",
      "/images/products/nike3.jpg"
    ],
    isDeleted: false
  },

  {
    title: "Nivea Soft Moisturizing Cream 75ml",
    description: "Nivea Soft is a light, non-greasy moisturizing cream enriched with Jojoba Oil and Vitamin E. Perfect for face, body, and hands — leaves your skin soft and refreshed.",
    price: 25,
    discountPercentage: 5,
    stockQuantity: 150,
    brand: "nivea",
    category: "skincare",
    thumbnail: "/images/products/nivea1.jpg",
    images: [
      "/images/products/nivea1.jpg",
      "/images/products/nivea2.jpg"
    ],
    isDeleted: false
  },

  {
    title: "OPPO F23 5G Smartphone",
    description: "Flaunt your superpower with the OPPO F23 — featuring blazing-fast 5G, powerful performance, and an ultra-slim design.",
    price: 449,
    discountPercentage: 8,
    stockQuantity: 65,
    brand: "oppo",
    category: "smartphones",
    thumbnail: "/images/products/oppo1.jpg",
    images: [
      "/images/products/oppo1.jpg",
      "/images/products/oppo2.png",
      "/images/products/oppo3.png"
    ],
    isDeleted: false
  },

  {
    title: "Versace Eros Najim Parfum",
    description: "Versace Eros Najim is a bold oriental woody fragrance launched in 2024. With notes of caramel, oud, and incense — it's perfect for fall and winter evenings.",
    price: 169,
    discountPercentage: 10,
    stockQuantity: 50,
    brand: "versace",
    category: "fragrances",
    thumbnail: "/images/products/perfume1.jpg",
    images: [
      "/images/products/perfume1.jpg",
      "/images/products/perfume2.jpg"
    ],
    isDeleted: false
  },

  {
    title: "Samsung Galaxy S23 Ultra 5G",
    description: "The Samsung Galaxy S23 Ultra redefines flagship performance with a 200MP camera, built-in S Pen, and a stunning 6.8'' AMOLED display. Built for creators and pros.",
    price: 1399,
    discountPercentage: 6,
    stockQuantity: 45,
    brand: "samsung",
    category: "smartphones",
    thumbnail: "/images/products/phone1.jpg",
    images: [
      "/images/products/phone1.jpg",
      "/images/products/phone2.jpg"
    ],
    isDeleted: false
  },
  {
    title: "Ray-Ban Aviator Classic Sunglasses",
    description: "Timeless design meets premium quality with Ray-Ban Aviator Classic. Featuring gold metal frame, green G-15 lenses, and 100% UV protection.",
    price: 159,
    discountPercentage: 9,
    stockQuantity: 70,
    brand: "rayban",
    category: "sunglasses",
    thumbnail: "/images/products/rayban1.jpg",
    images: [
      "/images/products/rayban1.jpg",
      "/images/products/rayban2.jpg",
      "/images/products/rayban3.jpg"
    ],
    isDeleted: false
  },

  {
    title: "Dior Sauvage Parfum",
    description: "An intense and magnetic fragrance by Dior. Sauvage Parfum blends bold bergamot, amber, and vanilla to create a powerful, warm scent for men.",
    price: 179,
    discountPercentage: 10,
    stockQuantity: 55,
    brand: "sauvage",
    category: "fragrances",
    thumbnail: "/images/products/sauvage1.jpg",
    images: [
      "/images/products/sauvage1.jpg",
      "/images/products/suavage2.jpg",
      "/images/products/suavage3.jpg"
    ],
    isDeleted: false
  },

  {
    title: "Uniqlo U Crew Neck T-Shirt – 3 Pack",
    description: "Uniqlo U’s signature oversized crew neck t-shirts made from heavyweight cotton. Clean design, soft feel, and modern fit for everyone.",
    price: 69,
    discountPercentage: 7,
    stockQuantity: 90,
    brand: "uniqlo",
    category: "uni sex tops",
    thumbnail: "/images/products/uniqlo1.jpg",
    images: [
      "/images/products/uniqlo1.jpg",
      "/images/products/uniqlo2.jpg",
      "/images/products/uniqlo3.jpg"
    ],
    isDeleted: false
  },

  {
    title: "Zara Floral Midi Dress – 3 Style Pack",
    description: "Elegant and vibrant, this Zara floral midi dress collection offers a flattering fit with beautiful prints for spring, summer, or casual occasions.",
    price: 149,
    discountPercentage: 10,
    stockQuantity: 60,
    brand: "zara",
    category: "womens-dress",
    thumbnail: "/images/products/zara1.jpg",
    images: [
      "/images/products/zara1.jpg",
      "/images/products/zara2.jpg",
      "/images/products/zara3.png"
    ],
    isDeleted: false
  },

  {
  title: "Sony WH-1000XM3 Bluetooth Wireless Over Ear Headphones with Mic (Silver)",
  description: "Digital noise cancelling: Industry leading Active Noise Cancellation (ANC)... Voice assistant: Alexa enabled (In-built)... Frequency response: 4 Hz–40,000 Hz.",
  price: 73,
  discountPercentage: 11,
  stockQuantity: 2,
  brand: "sony",
  category: "audio",
  thumbnail: "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg",
  images: [
    "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg"
  ],
  isDeleted: false
  },

{
  title: "Samsung Galaxy Buds2 Pro Wireless Earbuds with ANC",
  description: "Premium Hi-Fi sound with intelligent Active Noise Cancellation. Ergonomic fit, 360 audio, and seamless connectivity for Samsung Galaxy devices.",
  price: 99,
  discountPercentage: 5,
  stockQuantity: 5,
  brand: "samsung",
  category: "audio",
  thumbnail: "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947415830-61g0TqEyf4L._SL1500_.jpg",
  images: [
    "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947415830-61g0TqEyf4L._SL1500_.jpg"
  ],
  isDeleted: false
},
{
  title: "Beats Studio3 Wireless Noise Cancelling Over-Ear Headphones",
  description: "Pure Adaptive Noise Cancelling (Pure ANC) actively blocks external noise. Real-time audio calibration preserves a premium listening experience.",
  price: 119,
  discountPercentage: 12,
  stockQuantity: 6,
  brand: "beats",
  category: "audio",
  thumbnail: "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947457454-61YgZzJgWJL._SL1500_.jpg",
  images: [
    "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947457454-61YgZzJgWJL._SL1500_.jpg"
  ],
  isDeleted: false
},
{
  title: "ASUS ROG Keris Wireless Gaming Mouse – RGB Lightweight",
  description: "Ultralight 79g wireless gaming mouse with tri-mode connectivity, ROG push-fit switch sockets, and Aura Sync RGB lighting.",
  price: 49,
  discountPercentage: 7,
  stockQuantity: 1,
  brand: "asus",
  category: "gaming",
  thumbnail: "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947374836-51SkAVUTnaL._SL1000_.jpg",
  images: [
    "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947374836-51SkAVUTnaL._SL1000_.jpg"
  ],
  isDeleted: false
},
{
  title: "Fitbit Charge 5 Advanced Health & Fitness Tracker",
  description: "Track heart rate, sleep, stress, and more. Includes built-in GPS, ECG app, Daily Readiness Score, and 6-month Fitbit Premium membership.",
  price: 599,
  discountPercentage: 9,
  stockQuantity: 100,
  brand: "fitbit",
  category: "wearables",
  thumbnail: "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947437981-61ZXwnUYbpL._SL1500_.jpg",
  images: [
    "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947437981-61ZXwnUYbpL._SL1500_.jpg"
  ],
  isDeleted: false
},
{
  title: "Anker Soundcore Motion+ Bluetooth Speaker - Hi-Res 30W",
  description: "Hi-Res audio with Qualcomm aptX, 30W sound output, extended bass, and IPX7 waterproof design. Ideal for indoor and outdoor use.",
  price: 349,
  discountPercentage: 6,
  stockQuantity: 100,
  brand: "anker",
  category: "audio",
  thumbnail: "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947474459-61Uih3pEbzL._SL1500_.jpg",
  images: [
    "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947474459-61Uih3pEbzL._SL1500_.jpg"
  ],
  isDeleted: false
}






];



exports.seedProduct = async () => {
  try {
    const brands = await Brand.find();
    const categories = await Category.find();

    const getBrandId = (name) =>
      brands.find((b) => b.name.toLowerCase() === name.toLowerCase())?._id;

    const getCategoryId = (name) =>
      categories.find((c) => c.name.toLowerCase() === name.toLowerCase())?._id;

    const mappedProducts = products.map((product) => ({
      ...product,
      brand: getBrandId(product.brand),
      category: getCategoryId(product.category),
    }));

    // ✅ Add this block to detect missing mappings:
    mappedProducts.forEach((p) => {
      if (!p.brand || !p.category) {
        console.log(`❌ Invalid product: ${p.title}`);
        console.log(`   → brand: ${p.brand}, category: ${p.category}`);
      }
    });

    await Product.deleteMany(); 
    await Product.insertMany(mappedProducts);

    console.log("✅ Products seeded successfully");
  } catch (error) {
    console.log("❌ Product seeding failed:", error);
  }
};