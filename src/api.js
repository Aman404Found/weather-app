/* ==========================================================================
   WEATHER API SERVICE MODULE (src/api.js)
   Purpose: Handles network requests to Visual Crossing Weather API using fetch(),
            validates HTTP response status, checks response.ok, and returns 
            normalized weather JSON data.
   ========================================================================== */

import CONFIG from './config.js';

const WEATHER_API_KEY = CONFIG.WEATHER_API_KEY;
const BASE_URL = CONFIG.BASE_URL;

/**
 * Fetches current weather and 24-hour timeline forecast for a given location.
 * @param {string} location - City name, zip code, or lat/lon coordinates (e.g. "Tokyo", "London", "28.61,77.20")
 * @returns {Promise<Object>} JSON data returned by Visual Crossing Weather API
 */
export const fetchWeatherData = async (location) => {
    if (!location || !location.trim()) {
        throw new Error('Please enter a valid city name.');
    }

    // encodeURIComponent handles spaces or special characters in city names (e.g., "New York" -> "New%20York")
    const url = `${BASE_URL}${encodeURIComponent(location.trim())}?unitGroup=metric&key=${WEATHER_API_KEY}&contentType=json`;

    try {
        const response = await fetch(url);

        // CRUCIAL CHECK: fetch() does not throw error on HTTP 400/404/500!
        // We MUST manually check if response.ok is false.
        if (!response.ok) {
            let errorMsg = `Server error (${response.status})`;
            if (response.status === 400) {
                errorMsg = `City "${location}" not found. Please check spelling.`;
            } else if (response.status === 401) {
                errorMsg = 'Invalid API Key. Please check your API credentials.';
            }
            throw new Error(errorMsg);
        }

        // Parse JSON payload once confirmed response.ok is true
        const data = await response.json();
        return data;
    } catch (err) {
        // Re-throw with descriptive message for UI layer to display
        throw err;
    }
};

export default {
    fetchWeatherData
};