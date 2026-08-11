/* ==========================================================================
   ENVIRONMENT & APPLICATION CONFIGURATION (src/config.js)
   Purpose: Centralizes environment variables, API endpoints, and fallback keys
            so credentials work both locally (.env) and on static hosts (Netlify).
   ========================================================================== */

export const CONFIG = {
    // API Key loaded from environment variables with fallback for client-side web hosting (Netlify/GitHub Pages)
    WEATHER_API_KEY: (typeof process !== 'undefined' && process.env?.WEATHER_API_KEY) ||
                     (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WEATHER_API_KEY) ||
                     'ACEVYVWVQ3WN3MURAGMTVQRBN',

    // Visual Crossing Base API Endpoint
    BASE_URL: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
};

export default CONFIG;
