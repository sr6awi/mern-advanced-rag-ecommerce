const { connectToDB } = require("../database/db");
const Product = require("../models/Product");
const Brand = require("../models/Brand");
const Category = require("../models/Category");
const User = require("../models/User");
const Address = require("../models/Address");

const { seedBrand } = require("./Brand");
const { seedCategory } = require("./Category");
const { seedProduct } = require("./Product");
const { seedUser } = require("./User");
const { seedAddress } = require("./Address");

const seedData = async () => {
  try {
    await connectToDB();
    console.log("🔥 Wiping old data...");

    await Product.deleteMany();
    await Brand.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();
    await Address.deleteMany();

    console.log("✅ Database cleaned. Seeding fresh data...");

    await seedBrand();
    await seedCategory();
    await seedProduct();
    await seedUser();
    await seedAddress();

    console.log("✅ Seed completed successfully.");
  } catch (error) {
    console.log("❌ Seed failed:", error);
  }
};

seedData();
