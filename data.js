// Example CO2 data
function generateRandomDataPoint() {
    const lat = (Math.random() * 180 - 90).toFixed(4);
    const lon = (Math.random() * 360 - 180).toFixed(4);
    const co2 = (Math.random() * (config.CO2.MAX_LEVEL - config.CO2.MIN_LEVEL) + config.CO2.MIN_LEVEL).toFixed(2);

    return {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        co2: parseFloat(co2),
    };
}

const co2Data = [];
const numberOfDataPoints = 2200;

export const getCO2Data = () => {
    for (let i = 0; i < numberOfDataPoints; i++) {
        co2Data.push(generateRandomDataPoint());
    }
    return co2Data;
};