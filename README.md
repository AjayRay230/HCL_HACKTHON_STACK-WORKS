# 🏥 Smart Pharmacy Inventory Management System

## 📌 Overview

The Smart Pharmacy Inventory Management System is a full-stack application designed to automate medicine sales, stock monitoring, and expiry tracking in a pharmacy.

The system ensures that:

* Medicines are never out of stock
* Expiry is automatically monitored
* Suppliers are notified without manual intervention

---

## 🎯 Project Goal

Build a system where a pharmacist can:

* Sell medicines
* Automatically trigger supplier notifications
* Track expiry risks visually
* Avoid manual inventory management

---

## 🧠 Problem Approach

We follow an automation-first design:

**Key Idea:**

```
Human → performs sale  
System → handles everything else automatically
```

**Architecture Strategy:**

* Backend handles business logic & automation
* Frontend handles UI & visual alerts
* Event-driven flow: Sell → Trigger reorder → Delayed restock

---

## 🗄️ Data Model

### Medicine Entity

| Field         | Description                     |
| ------------- | ------------------------------- |
| name          | Medicine name (e.g., Dolo 650)  |
| salt          | Composition (e.g., Paracetamol) |
| stock         | Current quantity                |
| reorderLevel  | Minimum safe stock              |
| expiryDate    | Expiry date                     |
| supplierEmail | Supplier contact                |

---

## ⚙️ Backend Features (Spring Boot)

### 1. 💊 Sell Medicine

* Stock is reduced on each sale
* If stock < quantity → sale blocked
* If stock < reorder level:

  * Email sent to supplier
  * Restock scheduled after 30 seconds

---

### 2. 📧 Auto-Order System

* Trigger: Stock below reorder level
* Sends email notification to supplier

---

### 3. ⏱️ Delayed Auto Restock

* Restock happens after 30 seconds
* Uses ScheduledExecutorService

---

### 4. 🔍 Smart Search API

* Search by name OR salt
* Example: "Paracetamol" → Dolo, Crocin, Panadol

---

### 5. ⏳ Expiry Monitoring

* Runs every 2 minutes
* Detects:

  * Expired medicines
  * Near expiry (<30 days)
  * Warning (<90 days)

---

## 🎨 Frontend Features (React)

### 1. 📊 Dashboard

* Displays all medicines
* Live updates after actions

---

### 2. 🎨 Expiry Color Coding

| Condition | Color     |
| --------- | --------- |
| < 30 days | 🔴 Red    |
| < 90 days | 🟡 Yellow |
| Safe      | ⚪ Default |

---

### 3. 🔎 Smart Search

* Search by name or salt
* Instant filtering

---

### 4. 💸 Sell Action

* Input quantity
* Calls backend API
* Updates UI instantly

---

### 5. 🧾 Receipt Generator

* Generates receipt after sale
* Download as PDF

---

### 6. ➕ Add Medicine

* Dynamic form
* Saves to database

---

### 7. 🔐 Authentication

* JWT-based security
* Protected APIs

---

## 🔄 System Flow

```
User clicks SELL
        ↓
Backend updates stock
        ↓
If below reorder level
        ↓
Email sent to supplier
        ↓
Restock scheduled (30 sec delay)
        ↓
Stock restored automatically
```

---

## 🚀 Demo Script

1. Show dashboard
2. Perform a sale
3. Show email trigger
4. Wait 30 sec → stock refilled
5. Show expiry highlights

---

## 🛠️ Tech Stack

### Backend

* Java
* Spring Boot
* Spring Security (JWT)
* JPA / Hibernate
* PostgreSQL

### Frontend

* React.js
* Tailwind CSS
* Axios

### Other

* JavaMailSender
* jsPDF

---

## ⭐ Key Highlights

* Automated inventory system
* Event-driven restocking
* Expiry monitoring
* Smart search by salt
* Clean architecture

---

## System Design 




## 📌 Future Improvements

* WebSocket real-time updates
* Supplier dashboard
* WhatsApp alerts
* Inventory analytics

---

## 👨‍💻 Author
Team - STACK-WORKS

Team Members

Ajay Kumar Ray
Vikash Kumar Kharwar 
Manogna Savva
Saket Kumar Sahu
Dimple Kaushik Kanchuboina
Final Year B.Tech (EIE)
NIT Nagaland
