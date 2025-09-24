const Category = require("../models/Category");

const categories = [
  { name: "smartphones" },
  { name: "laptops" },
  { name: "fragrances" },
  { name: "skincare" },
  { name: "decor" },
  { name: "furniture" },
  { name: "uni sex tops" },
  { name: "mens-shoes" },
  { name: "womens-dress" },
  { name: "sunglasses" },
  { name: "watches" },
  { name: "audio"   },
  { name: "gaming" },
  { name: "wearables" },
];

exports.seedCategory = async () => {
  try {
    await Category.deleteMany();
    await Category.insertMany(categories);
    console.log("✅ Categories seeded successfully");
  } catch (error) {
    console.log("❌ Category seeding failed:", error);
  }
};
