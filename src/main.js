/* ==========================================================================
   APPLICATION ENTRY POINT (src/main.js)
   Execution Flow:
   1. Imports state, API service, and UI rendering modules
   2. Initializes initial weather fetch for default city ("Tokyo")
   3. Binds event listeners to Search Form, Geolocation button, and Refresh button
   4. Orchestrates async data fetching -> state updating -> UI rendering flow
   ========================================================================== */

import state from './state.js';
import { fetchWeatherData } from './api.js';
import { elements, updateUI, setLoading, showError } from './ui.js';

/**
 * Controller function to load weather for a given city.
 * @param {string} city - City query string
 */
const loadWeather = async (city) => {
    state.isLoading = true;
    setLoading(true);

    try {
        const data = await fetchWeatherData(city);
        state.weatherData = data;
        state.currentCity = city;
        state.error = null;

        // Render data into DOM
        updateUI(data);
    } catch (err) {
        state.error = err.message;
        showError(err.message);
    } finally {
        state.isLoading = false;
        setLoading(false);
    }
};

/**
 * Event handler for Search Form submit
 * @param {Event} e - Form submit event
 */
const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = elements.cityInput.value.trim();

    if (!query) {
        showError('Please enter a city name to search.');
        return;
    }

    loadWeather(query);
    elements.cityInput.value = ''; // Clear search input field
};

/**
 * Event handler for Geolocation Button click
 * Uses Browser Geolocation API to fetch user's latitude & longitude.
 */
const handleGeolocation = () => {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser.');
        return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            // Visual Crossing supports lat,lon format (e.g. "28.61,77.20")
            loadWeather(`${lat},${lon}`);
        },
        (error) => {
            setLoading(false);
            showError('Unable to retrieve location. Please enter a city manually.');
        }
    );
};

/**
 * Event handler for Refresh Button click
 */
const handleRefresh = () => {
    loadWeather(state.currentCity);
};

/**
 * Main application initialization setup
 */
const init = () => {
    // 1. Attach Event Listeners
    if (elements.searchForm) {
        elements.searchForm.addEventListener('submit', handleSearchSubmit);
    }

    if (elements.geoBtn) {
        elements.geoBtn.addEventListener('click', handleGeolocation);
    }

    if (elements.refreshBtn) {
        elements.refreshBtn.addEventListener('click', handleRefresh);
    }

    // 2. Fetch initial weather for default city (Tokyo)
    loadWeather(state.currentCity);
};

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', init);
