/* ==========================================================================
   GLOBAL APPLICATION STATE (src/state.js)
   Purpose: Central source of truth for weather data, active search city, 
            loading status, and unit preferences across all modules.
   ========================================================================== */

const state = {
    // Current active city query (Defaults to Tokyo)
    currentCity: 'Tokyo',

    // Full JSON response object returned by Visual Crossing Weather API
    weatherData: null,

    // Boolean flag indicating if an active network request is in progress
    isLoading: false,

    // Store error messages if API fetch fails
    error: null,

    // Helper to format today's human-readable date string (e.g., "Tuesday, 11 August 2026")
    getFormattedDate() {
        const now = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return now.toLocaleDateString('en-US', options);
    }
};

export default state;
