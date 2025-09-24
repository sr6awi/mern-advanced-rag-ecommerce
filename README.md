# 🛒 MERN + Advanced RAG E-commerce Platform

🚀 A **full-stack MERN e-commerce platform** enhanced with an **Advanced RAG (Retrieval-Augmented Generation) AI Assistant**.  
This project combines modern **e-commerce features** with **AI-powered conversational search, recommendations, and intelligent assistance**.

---

## 📌 Features
- 🛍️ Full e-commerce flow (products, categories, cart, wishlist, checkout, orders)
- 👤 User authentication (signup, login, JWT, role-based access)
- 📦 Admin dashboard for product & order management
- 🛡️ Secure payments & order tracking
- 💬 **AI Assistant powered by RAG**:
  - Contextual product Q&A
  - Conversational recommendations
  - Intelligent search across catalog
  - Smart order & user support

---

## ⚙️ Tech Stack
### 🔹 Backend
- Node.js, Express.js
- MongoDB + Mongoose
- JWT Authentication
- OpenAI API (RAG assistant)

### 🔹 Frontend
- React + Redux Toolkit
- TailwindCSS / ShadCN UI
- Framer Motion animations
- Lottie files integration

---

## 📂 Repository Structure
📦 mern-advanced-rag-ecommerce  
┣ 📂 backend → REST APIs, database models, RAG assistant integration  
┣ 📂 frontend → React app (UI, state, AI assistant widget)  
┣ 📜 README.md → Project documentation  
┣ 📜 package.json → Dependencies  

---

## 🏗️ System Architecture

```plaintext
         ┌───────────────────────┐
         │       Frontend        │
         │ React + Redux Toolkit │
         │  (User Interface)     │
         └───────────┬───────────┘
                     │
        HTTP / REST  │
                     ▼
         ┌───────────────────────┐
         │       Backend         │
         │ Node.js + Express     │
         │ Auth, Products, Orders│
         │ RAG API Integration   │
         └───────────┬───────────┘
                     │
       MongoDB       │    LLM API
   (Products, Users, │   (LLMs, RAG Q&A)
   Orders, Embeddings│
                     ▼
         ┌───────────────────────┐
         │   RAG Assistant       │
         │ Vector Store (FAISS)  │
         │ Embedding Retrieval   │
         │ Contextual Answers    │
         └───────────────────────┘
