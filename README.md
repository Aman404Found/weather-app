# 🌤️ Atmosphere — Weather Dashboard

An elegant, modern glassmorphic weather web application built using **Vanilla JavaScript (ES Modules)**, **HTML5**, and **CSS3**. Powered by the **Visual Crossing Weather API**, Atmosphere delivers real-time weather analytics, detailed statistics, and a native 24-hour horizontal forecast timeline.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![API](https://img.shields.io/badge/Visual_Crossing-API-008080?style=for-the-badge)](https://www.visualcrossing.com/)

---

## 🔗 Live Demo

👉 **[Click Here for Live Demo](https://6a7ac0039aa5a632c326e850--taupe-mousse-983e82.netlify.app)**

---

## ✨ Features

- **🌐 Live City Search**: Search weather condition details for any city worldwide with automatic URL encoding and input sanitization (`encodeURIComponent` & `.trim()`).
- **📍 Current Location Detection**: Instantly fetch local weather using the browser's native **Geolocation API** (`navigator.geolocation`).
- **💎 Glassmorphism UI**: Premium dark mode aesthetic crafted with backdrop blurs (`backdrop-filter: blur()`), HSL slate color palettes, ambient drop shadows, and subtle micro-interactions.
- **📱 24-Hour Timeline Forecast**: Smooth horizontal scroll timeline enforcing mobile-native snapping via CSS Scroll Snap (`scroll-snap-type: x mandatory`).
- **📊 Auto-Fit Statistics Grid**: Fully responsive metric grid (`Wind Speed`, `Rain Chance`, `Humidity`, `UV Index`) using CSS Grid (`repeat(auto-fit, minmax(130px, 1fr))`) without requiring heavy media queries.
- **⚡ GPU-Accelerated Micro-Animations**: Smooth entry keyframes (`fadeInUp`), loading spinners (`spin`), and skeleton shimmers (`pulse`) for tactile user feedback.
- **🛡️ Defensive Error Handling**: Complete network validation checking `response.ok` before parsing JSON to catch HTTP 400/401 errors gracefully.
- **🔐 Environment Variables**: Configured via `.env` and `src/config.js` to protect API keys from git history.

---

## 🛠️ Tech Stack & Design System

- **Language**: JavaScript (ES6+ Modules)
- **Styling**: Modular Vanilla CSS3 (Custom Design Tokens in `:root`)
- **Typography**: `Outfit` Google Font
- **API**: [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)
- **Icons**: Clean emoji mapping system for weather condition feedback

---

## 📁 Project Architecture

Organized following industry-standard separation of concerns:

```text
Weather App/
├── index.html            # Main HTML5 Semantic Layout
├── style.css             # Main Entry Stylesheet (Imports modular CSS)
├── .env                  # Environment Variables (Ignored in Git)
├── .env.example          # Template for Environment Configuration
├── .gitignore            # Git Exclusions File
├── css/                  # CSS Design System Modules
│   ├── variable.css      # CSS Variables & Design Tokens (:root)
│   ├── base.css          # Reset, Typography & Application Container
│   ├── animations.css    # GPU Keyframe Animations (@keyframes)
│   └── components.css    # Search Pill, Hero Card, Stats Grid & Timeline
└── src/                  # ES Module JavaScript Core
    ├── config.js         # Environment & Configuration Token Handler
    ├── state.js          # Central Application State & Date Helpers
    ├── api.js            # Network Service & Visual Crossing Fetch Logic
    ├── ui.js             # DOM Caching, Emoji Mapper & Render Functions
    └── main.js           # Main App Controller & Event Listener Wiring
```

---

## 🚀 How to Run Locally

No build tools or heavy Node dependencies required! Run directly in any modern browser:

1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to create `.env` and add your API key:
   ```bash
   cp .env.example .env
   ```

3. **Launch with a Local Web Server**:
   Because the project uses standard ES Modules (`type="module"`), run a lightweight HTTP server:

   - **Using VS Code**: Right-click `index.html` ➔ **Open with Live Server**.
   - **Using Python**:
     ```bash
     python3 -m http.server 8000
     ```
     Then open `http://localhost:8000` in your browser.

   - **Using Node.js (`npx`)**:
     ```bash
     npx serve .
     ```

---

## 🔑 Environment Configuration

API keys are managed via `.env` and `src/config.js`:

```env
# .env
WEATHER_API_KEY=ACEVYVWVQ3WN3MURAGMTVQRBN
```

`src/config.js` safely exports `CONFIG.WEATHER_API_KEY` for `src/api.js` to consume.

---

## 📌 Project Challenge

This project was built as part of the **roadmap.sh** Frontend Project Roadmap challenges:
- 🔗 **Project Link**: [https://roadmap.sh/projects/weather-app](https://roadmap.sh/projects/weather-app)
