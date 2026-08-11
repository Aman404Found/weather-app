# 🌤️ Atmosphere — Weather Dashboard

An elegant, modern glassmorphic weather web application built using **Vanilla JavaScript (ES Modules)**, **HTML5**, and **CSS3**. Powered by the **Visual Crossing Weather API**, Atmosphere delivers real-time weather analytics, detailed statistics, and a native 24-hour horizontal forecast timeline.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![API](https://img.shields.io/badge/Visual_Crossing-API-008080?style=for-the-badge)](https://www.visualcrossing.com/)

---

## 🔗 Live Demo

👉 **[Click Here for Live Demo](taupe-mousse-983e82.netlify.app)**

---

## ✨ Features

- **🌐 Live City Search**: Search weather condition details for any city worldwide with automatic URL encoding and input sanitization (`encodeURIComponent` & `.trim()`).
- **📍 Current Location Detection**: Instantly fetch local weather using the browser's native **Geolocation API** (`navigator.geolocation`).
- **💎 Glassmorphism UI**: Premium dark mode aesthetic crafted with backdrop blurs (`backdrop-filter: blur()`), HSL slate color palettes, ambient drop shadows, and subtle micro-interactions.
- **📱 24-Hour Timeline Forecast**: Smooth horizontal scroll timeline enforcing mobile-native snapping via CSS Scroll Snap (`scroll-snap-type: x mandatory`).
- **📊 Auto-Fit Statistics Grid**: Fully responsive metric grid (`Wind Speed`, `Rain Chance`, `Humidity`, `UV Index`) using CSS Grid (`repeat(auto-fit, minmax(130px, 1fr))`) without requiring heavy media queries.
- **⚡ GPU-Accelerated Micro-Animations**: Smooth entry keyframes (`fadeInUp`), loading spinners (`spin`), and skeleton shimmers (`pulse`) for tactile user feedback.
- **🛡️ Defensive Error Handling**: Complete network validation checking `response.ok` before parsing JSON to catch HTTP 400/401 errors gracefully.
- **🔐 Zero-Leak Environment Security**: Automated build-time key injection (`scripts/build-env.js`) ensuring API keys are never exposed in Git source code.

---

## 🛠️ Tech Stack & Design System

- **Language**: JavaScript (ES6+ Modules)
- **Styling**: Modular Vanilla CSS3 (Custom Design Tokens in `:root`)
- **Typography**: `Outfit` Google Font
- **API**: [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)
- **Deployment**: Netlify + Automated Build-Time Environment Injection

---

## 📁 Project Architecture

Organized following industry-standard separation of concerns:

```text
Weather App/
├── index.html            # Main HTML5 Semantic Layout
├── style.css             # Main Entry Stylesheet (Imports modular CSS)
├── netlify.toml          # Netlify Build Configuration
├── package.json          # npm Project Scripts & Config
├── .env                  # Local Environment Variables (Ignored in Git)
├── .env.example          # Template for Environment Configuration
├── .gitignore            # Git Exclusions File
├── scripts/              # Build Scripts
│   └── build-env.js      # Automated Build-Time Key Injection Script
├── css/                  # CSS Design System Modules
│   ├── variable.css      # CSS Variables & Design Tokens (:root)
│   ├── base.css          # Reset, Typography & Application Container
│   ├── animations.css    # GPU Keyframe Animations (@keyframes)
│   └── components.css    # Search Pill, Hero Card, Stats Grid & Timeline
└── src/                  # ES Module JavaScript Core
    ├── config.js         # Generated Environment Config Module
    ├── state.js          # Central Application State & Date Helpers
    ├── api.js            # Network Service & Visual Crossing Fetch Logic
    ├── ui.js             # DOM Caching, Emoji Mapper & Render Functions
    └── main.js           # Main App Controller & Event Listener Wiring
```

---

## 🚀 How to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Aman404Found/weather-app.git
   cd weather-app
   ```

2. **Configure Local Environment**:
   Create a `.env` file and insert your Visual Crossing API key:
   ```bash
   cp .env.example .env
   ```
   Add your key inside `.env`:
   ```env
   WEATHER_API_KEY=your_visual_crossing_api_key_here
   ```

3. **Build & Inject Config**:
   Run the local build script to inject your key into `src/config.js`:
   ```bash
   npm run build
   ```

4. **Launch Local Server**:
   Open `index.html` via VS Code **Live Server** or run:
   ```bash
   npx serve .
   ```

---

## 🔑 Netlify Deployment & Security

Secrets are protected from GitHub using automated build-time injection:

1. In **Netlify Site Settings** ➔ **Environment variables**, set `WEATHER_API_KEY`.
2. When deploying, Netlify runs `npm run build` (`netlify.toml`).
3. `scripts/build-env.js` injects `WEATHER_API_KEY` into `src/config.js` on Netlify's server during build.
4. Your API key remains **100% hidden from Git commits**.

---

## 📌 Project Challenge

This project was built as part of the **roadmap.sh** Frontend Project Roadmap challenges:
- 🔗 **Project Link**: [https://roadmap.sh/projects/weather-app](https://roadmap.sh/projects/weather-app)
