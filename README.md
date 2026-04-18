.

🏥 Smart Pharmacy Inventory Management System
📌 Overview

The Smart Pharmacy Inventory Management System is a full-stack application designed to automate medicine sales, stock monitoring, and expiry tracking in a pharmacy.

The system ensures that:

Medicines are never out of stock
Expiry is automatically monitored
Suppliers are notified without manual intervention
🎯 Project Goal

Build a system where a pharmacist can:

Sell medicines
Automatically trigger supplier notifications
Track expiry risks visually
Avoid manual inventory management
🧠 Problem Approach

We approached the problem using automation-first design:

Key Idea:
Human → performs sale  
System → handles everything else automatically
Architecture Strategy:
Backend handles business logic & automation
Frontend handles visual alerts & interaction
Event-driven flow (sell → trigger reorder → delayed restock)
🗄️ Data Model

We use a single main table:

Medicine Entity
Field	Description
name	Medicine name (e.g., Dolo 650)
salt	Composition (e.g., Paracetamol)
stock	Current quantity
reorderLevel	Minimum safe stock
expiryDate	Expiry date
supplierEmail	Supplier contact
⚙️ Backend Features (Spring Boot)
1. 💊 Sell Medicine (Core Logic)
Stock = Stock - SoldQuantity
Logic:
If stock < quantity → ❌ block sale
If stock falls below reorder level:
✅ Send email to supplier
✅ Schedule restock after 30 seconds
2. 📧 Auto-Order System
Triggered when:
Stock < ReorderLevel
Backend sends email:
"Low stock alert for [Medicine Name]"
Simulates real-world procurement
3. ⏱️ Delayed Auto Restock
After email trigger:
Wait 30 seconds → Restock to reorder level
Implemented using:
ScheduledExecutorService
4. 🔍 Smart Search API

Search by:

Medicine name
Salt composition
"Paracetamol" → returns Dolo, Crocin, Panadol
5. ⏳ Expiry Monitoring (Scheduler)
Runs every 2 minutes
Calculates:
Days until expiry
Logs:
❌ Expired
🔴 < 30 days
🟡 < 90 days
🎨 Frontend Features (React)
1. 📊 Dashboard
Displays all medicines
Real-time stock updates
Clean table UI
2. 🎨 Expiry Color Coding
Condition	Color
< 30 days	🔴 Red
< 90 days	🟡 Yellow
Safe	⚪ Normal
3. 🔎 Smart Search
Search by name OR salt
Instant filtering
4. 💸 Sell Action
User inputs quantity
Calls backend API
Updates UI instantly
5. 🧾 Receipt Generator
Generates sale receipt
Download as PDF
6. ➕ Add Medicine
Dynamic form
Saves directly to DB
7. 🔐 Authentication (JWT)
Secure APIs
Token-based access
🔄 System Flow
User clicks SELL
        ↓
Backend updates stock
        ↓
If below reorder:
        ↓
Email sent to supplier
        ↓
Restock scheduled (30 sec delay)
        ↓
Stock restored automatically
🚀 Demo Script (For Judges)
Step 1: Dashboard

“Here is my inventory. All medicines are displayed with expiry indicators.”

Step 2: Sale

“I am selling 5 units. Stock drops below reorder level.”

Step 3: Automation

“System automatically sends an email to supplier.”

Step 4: Auto Restock

“After 30 seconds, stock is refilled automatically.”

Step 5: Expiry Safety

“These medicines are highlighted in red because they expire soon.”

🛠️ Tech Stack
Backend
Java
Spring Boot
Spring Security (JWT)
JPA / Hibernate
PostgreSQL
Frontend
React.js
Tailwind CSS
Axios
Other
JavaMailSender (Email)
jsPDF (Receipt)
⭐ Key Highlights
Fully automated inventory system
Event-driven restocking
Real-time expiry tracking
Smart search using salt composition
Clean full-stack architecture
📌 Future Improvements
WebSocket real-time updates
Supplier dashboard
WhatsApp alerts
Inventory analytics
👨‍💻 Author

Ajay Kumar Ray
Final Year B.Tech (EIE)
NIT Nagaland

If you want, I can also:

Create a GitHub folder structure
Add API documentation (Swagger-style)
Or optimize this for ATS + resume alignment

Just tell me.
