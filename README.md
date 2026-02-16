# Tracking-App

A real-time, privacy-focused location tracking web application built with **Node.js**, **Socket.io**, and **Leaflet.js**. Designed for group coordination in Skardu's challenging terrains.

## 📝 Description
Skardu Live Tracker allows users to create or join private "Tracking Rooms" to see each other's live movement on a map. 
- **Zero Login:** No accounts needed—just a nickname and a Room ID.
- **Instant Privacy:** Markers disappear immediately when a user disconnects.

## ⚠️ Important: Accuracy Disclaimer
* **Mobile Devices:** Highly Recommended. Uses dedicated GPS chips for precise tracking.
* **Laptops/Desktops:** **POOR ACCURACY.** Laptops lack GPS hardware and use IP-based location. If you are in Skardu, a laptop may incorrectly show your location in **Islamabad** due to ISP routing.

---

## 🚀 How to Use (For Contributors/Cloners)

If you have cloned this repository, follow these steps to run it locally:

1. **Install Dependencies:**
   Run this in the project root folder to download all required libraries:
   ```bash
   npm install
   npm run server
