const Product = require("../models/Product");
const axios = require("axios");

exports.chatWithAssistant = async (req, res) => {
  try {
    const { message, user } = req.body;
    const userName = user?.name || "there";
    const loweredMessage = message.toLowerCase();

    const products = await Product.find().populate("category brand").limit(100);

    const priceMatch = loweredMessage.match(/(?:less than|under|below)\s*(\d+)/);
    const maxPrice = priceMatch ? parseFloat(priceMatch[1]) : null;

    const isCheapest = loweredMessage.includes("cheapest") || loweredMessage.includes("lowest");
    const isExpensive = loweredMessage.includes("expensive") || loweredMessage.includes("highest") || loweredMessage.includes("most");

    const keywords = loweredMessage.split(/[\s,?.!]+/).filter(w => w.length > 2);
    const categories = [...new Set(products.map(p => p.category?.name?.toLowerCase()).filter(Boolean))];
    const brands = [...new Set(products.map(p => p.brand?.name?.toLowerCase()).filter(Boolean))];

    const detectedCategory = categories.find(cat => loweredMessage.includes(cat));
    const detectedBrand = brands.find(brand => loweredMessage.includes(brand));

    let matched = products.filter(p => {
      const fullText = `${p.title} ${p.description} ${p.category?.name} ${p.brand?.name}`.toLowerCase();
      const matchesKeyword = keywords.some(word => fullText.includes(word));
      const matchesPrice = maxPrice ? p.price < maxPrice : true;
      const matchesCategory = detectedCategory ? (p.category?.name?.toLowerCase() === detectedCategory) : true;
      const matchesBrand = detectedBrand ? (p.brand?.name?.toLowerCase() === detectedBrand) : true;
      return matchesKeyword && matchesPrice && matchesCategory && matchesBrand;
    });

    if (loweredMessage.includes("perfume")) {
      matched = products.filter(p =>
        p.category?.name?.toLowerCase().includes("perfume")
      );
    }

    if (isCheapest) matched = [...matched].sort((a, b) => a.price - b.price);
    if (isExpensive) matched = [...matched].sort((a, b) => b.price - a.price);

    const selectedProducts = matched.length > 0 ? matched.slice(0, 5) : [];

    const productData = selectedProducts.map(p => ({
      _id: p._id,
      title: p.title,
      price: p.price,
      category: p.category?.name,
      brand: p.brand?.name,
      image: Array.isArray(p.images) ? p.images[0] : p.thumbnail,
      link: `/product-details/${p._id}`,
      description: p.description
    }));

    // Build structured context for LLM (cleaned, no markdown symbols)
    const grouped = {};
    productData.forEach(p => {
      const category = p.category || "Others";
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(p);
    });

    let contextText = `Hello ${userName}, here are some matching products:\n\n`;

    for (const [category, items] of Object.entries(grouped)) {
      contextText += `Category: ${category}\n`;
      items.forEach(p => {
        contextText += `- ${p.title} (${p.brand}) – $${p.price}\n  ${p.description}\n\n`;
      });
    }

    if (!productData.length) {
      contextText = `Hello ${userName}, I couldn’t find matching products for your query. Try asking about a different category, brand, or price range.`;
    }

    // Build LLM prompt
    const prompt = `
You are a smart AI shopping assistant for CIU SHOP.
Use the context below to suggest relevant products based on the user's message.
DO NOT invent or add extra products. ONLY respond based on the provided context.
Keep your tone friendly and concise.

User Message:
${message}

Product Context:
${contextText}
`;

    // LLM call
    const response = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
      model: "llama3-8b-8192",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.5,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      }
    });

    const aiReply = response.data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return res.status(200).json({
      reply: aiReply,
      products: productData
    });

  } catch (error) {
    console.error("❌ RAG AI Assistant Error:", error?.response?.data || error.message);
    return res.status(500).json({ message: "Assistant error", error: error.message });
  }
};
