const Brand = require("../models/Brand");

const brands = [
  { name: "adidas" },
  { name: "boho" },
  { name: "fossil" },
  { name: "hm" },
  { name: "home center" },
  { name: "huawei" },
  { name: "ikea" },
  { name: "apple" },
  { name: "l'oreal" },
  { name: "nike" },
  { name: "nivea" },
  { name: "oppo" },
  { name: "versace" },
  { name: "samsung" },
  { name: "rayban" },
  { name: "sauvage" },
  { name: "uniqlo" },
  { name: "zara" },
  { name: "sony" },
  { name: "beats" },
  { name: "asus" },
  { name: "fitbit" },
  { name: "anker" },
];

exports.seedBrand = async () => {
  try {
    await Brand.deleteMany();
    await Brand.insertMany(brands);
    console.log("✅ Brands seeded successfully");
  } catch (error) {
    console.log("❌ Brand seeding failed:", error);
  }
};
