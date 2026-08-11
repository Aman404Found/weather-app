const fs = require('fs');
const path = require('path');

// Try reading from process.env (Netlify) or local .env file
let apiKey = process.env.WEATHER_API_KEY || '';

if (!apiKey) {
    const envPath = path.join(__dirname, '../.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/WEATHER_API_KEY\s*=\s*(.*)/);
        if (match && match[1]) {
            apiKey = match[1].trim();
        }
    }
}

const configContent = `/* Generated automatically during build time */
export const CONFIG = {
    WEATHER_API_KEY: '${apiKey}',
    BASE_URL: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
};

export default CONFIG;
`;

const targetPath = path.join(__dirname, '../src/config.js');
fs.writeFileSync(targetPath, configContent, 'utf8');

console.log('✅ Build script: Successfully injected WEATHER_API_KEY into src/config.js!');
