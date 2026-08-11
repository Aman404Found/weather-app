/* ==========================================================================
   ENVIRONMENT & APPLICATION CONFIGURATION (src/config.js)
   Purpose: Centralizes environment variable resolution so keys are never 
            hardcoded into source code or committed to GitHub.
   ========================================================================== */

export const CONFIG = {
    // Reads from environment variables (Netlify Environment Variables or local build)
    WEATHER_API_KEY: (typeof process !== 'undefined' && process.env?.WEATHER_API_KEY) ||
        (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WEATHER_API_KEY) ||
        (typeof window !== 'undefined' && window.WEATHER_API_KEY) ||
        '',

    // Visual Crossing Base API Endpoint
    BASE_URL: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
};

export default CONFIG;
