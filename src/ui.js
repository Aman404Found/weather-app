/* ==========================================================================
   UI RENDERING MODULE (src/ui.js)
   Purpose: Caches DOM element references, renders weather state into the DOM,
            builds the 24-hour horizontal forecast timeline dynamically, 
            and handles visual loading/error states.
   ========================================================================== */

import state from './state.js';

// 1. DOM Element Cache (Cached using exact HTML IDs and Class selectors)
export const elements = {
    searchForm: document.querySelector('#search-form'),
    cityInput: document.querySelector('#city-input'),
    geoBtn: document.querySelector('#geo-btn'),
    searchBtn: document.querySelector('#search-btn'),
    refreshBtn: document.querySelector('#refresh-btn'),
    weatherCard: document.querySelector('#weather-card'),
    cityName: document.querySelector('#city-name'),
    currentDate: document.querySelector('#current-date'),
    tempNumber: document.querySelector('#temp-number'),
    tempUnit: document.querySelector('#temp-unit'),
    conditionEmoji: document.querySelector('.weather-icon-emoji'),
    conditionText: document.querySelector('#weather-condition'),
    windSpeed: document.querySelector('#wind-speed'),
    rainChance: document.querySelector('#rain-chance'),
    humidity: document.querySelector('#humidity'),
    uvIndex: document.querySelector('#uv-index'),
    hourlyScroll: document.querySelector('#hourly-scroll')
};

// 2. Weather Condition to Emoji Map (Maps API icon string to friendly emoji)
const weatherIconMap = {
    'clear-day': '☀️',
    'clear-night': '🌙',
    'partly-cloudy-day': '⛅',
    'partly-cloudy-night': '🌤️',
    'cloudy': '☁️',
    'rain': '🌧️',
    'showers-day': '🌦️',
    'showers-night': '🌧️',
    'snow': '❄️',
    'snow-showers-day': '🌨️',
    'thunder-rain': '⛈️',
    'thunder-showers-day': '⛈️',
    'wind': '💨',
    'fog': '🌫️'
};

/**
 * Returns a friendly weather emoji based on API condition string or icon name.
 * @param {string} iconName - Icon string returned from Visual Crossing (e.g. "partly-cloudy-day")
 * @returns {string} Emoji representation
 */
const getWeatherEmoji = (iconName) => {
    return weatherIconMap[iconName] || '🌤️';
};

/**
 * Helper to determine UV index intensity text.
 * @param {number} uv - UV index number
 * @returns {string} Formatted UV string (e.g. "5 (Moderate)")
 */
const formatUVIndex = (uv) => {
    const num = Math.round(uv || 0);
    if (num <= 2) return `${num} (Low)`;
    if (num <= 5) return `${num} (Moderate)`;
    if (num <= 7) return `${num} (High)`;
    if (num <= 10) return `${num} (Very High)`;
    return `${num} (Extreme)`;
};

/**
 * Updates main Hero Weather Card with current weather data.
 * @param {Object} data - Visual Crossing API weather response object
 */
export const renderHeroCard = (data) => {
    const current = data.currentConditions;
    if (!current) return;

    // Update location name & current date string
    elements.cityName.textContent = data.resolvedAddress || state.currentCity;
    elements.currentDate.textContent = state.getFormattedDate();

    // Update temperature and condition text using .textContent
    elements.tempNumber.textContent = Math.round(current.temp);
    elements.conditionText.textContent = current.conditions || 'Clear';

    // Update weather emoji
    if (elements.conditionEmoji) {
        elements.conditionEmoji.textContent = getWeatherEmoji(current.icon);
    }

    // Update detailed statistics
    elements.windSpeed.textContent = `${Math.round(current.windspeed || 0)} km/h`;
    elements.rainChance.textContent = `${Math.round(current.precipprob || 0)}%`;
    elements.humidity.textContent = `${Math.round(current.humidity || 0)}%`;
    elements.uvIndex.textContent = formatUVIndex(current.uvindex);
};

/**
 * Renders the 24-Hour Timeline horizontal scroll items dynamically.
 * @param {Object} data - Visual Crossing API weather response object
 */
export const renderHourlyTimeline = (data) => {
    if (!data.days || !data.days[0] || !data.days[0].hours) return;

    const hours = data.days[0].hours; // Array of 24 hour objects for today
    const currentHourString = new Date().getHours();

    // Clear static HTML placeholder hourly cards
    elements.hourlyScroll.innerHTML = '';

    hours.forEach((hourObj) => {
        // hourObj.datetime format is "HH:mm:ss" (e.g., "14:00:00")
        const hourNumber = parseInt(hourObj.datetime.split(':')[0], 10);
        const displayTime = `${String(hourNumber).padStart(2, '0')}:00`;

        const isCurrentHour = hourNumber === currentHourString;

        // Create hourly card container
        const card = document.createElement('div');
        card.className = `hourly-card${isCurrentHour ? ' now-card' : ''}`;

        card.innerHTML = `
            <span class="hourly-time">${isCurrentHour ? 'NOW' : displayTime}</span>
            <span class="hourly-icon" style="font-size: 1.5rem; text-align: center; display: block;">${getWeatherEmoji(hourObj.icon)}</span>
            <span class="hourly-temp">${Math.round(hourObj.temp)}°</span>
            <span class="hourly-rain">${Math.round(hourObj.precipprob || 0)}%</span>
        `;

        elements.hourlyScroll.appendChild(card);
    });
};

/**
 * Updates entire UI layout with new API data.
 * @param {Object} data - API response payload
 */
export const updateUI = (data) => {
    if (!data) return;

    // Trigger hero card animation refresh
    elements.weatherCard.classList.remove('animate-fade-in');
    void elements.weatherCard.offsetWidth; // Trigger DOM reflow for re-animation
    elements.weatherCard.classList.add('animate-fade-in');

    renderHeroCard(data);
    renderHourlyTimeline(data);
};

/**
 * Toggles loading animation state on buttons and components.
 * @param {boolean} isLoading 
 */
export const setLoading = (isLoading) => {
    if (isLoading) {
        elements.refreshBtn.classList.add('spinning');
        elements.searchBtn.disabled = true;
    } else {
        elements.refreshBtn.classList.remove('spinning');
        elements.searchBtn.disabled = false;
    }
};

/**
 * Displays error message alert to the user.
 * @param {string} errorMsg 
 */
export const showError = (errorMsg) => {
    alert(errorMsg || 'Something went wrong. Please try again.');
};

export default {
    elements,
    renderHeroCard,
    renderHourlyTimeline,
    updateUI,
    setLoading,
    showError
};