async function loadConfig() {
    const response = await fetch('config.json');
    return await response.json();
}
// Utility function to wrap labels
function wrapLabel(label, maxLength) {
    const parts = [];
    for (let i = 0; i < label.length; i += maxLength) {
        parts.push(label.substring(i, i + maxLength));
    }
    return parts.join('\n');
}

// Example usage with co2Data
function formatLabels(data, maxLength) {
    return data.map(item => wrapLabel(`${item.lat}, ${item.lon}`, maxLength));
}

function createCO2Graph() {
    const ctx = document.querySelector('.co2Graph').getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Will be updated dynamically
            datasets: [{
                label: 'CO2 Levels',
                data: [], // Will be updated dynamically
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `CO2 Level: ${context.raw} ppm`;
                        }
                    }
                },
                datalabels: {
                    display: false // Hide data labels if using chartjs-plugin-datalabels
                }
            },
            scales: {
                x: {
                    ticks: {
                        display: false // Hide x-axis labels
                    }
                },
                y: {
                    ticks: {
                        display: false // Hide y-axis labels
                    }
                }
            }
        }
    });
}

function createTemperatureGraph() {
    const ctx = document.querySelector('.temperatureGraph').getContext('2d');
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [], // Will be updated dynamically
            datasets: [{
                label: 'Temperature Data',
                data: [], // Will be updated dynamically
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `Temperature: ${context.raw} °C`;
                        }
                    }
                },
                datalabels: {
                    display: false // Hide data labels if using chartjs-plugin-datalabels
                }
            },
            scales: {
                x: {
                    ticks: {
                        display: false // Hide x-axis labels
                    }
                },
                y: {
                    ticks: {
                        display: false // Hide y-axis labels
                    }
                }
            }
        }
    });
}


async function init() {
    // Assuming fetchData function returns CO2 and temperature data
    const co2Data = Array.from({ length: 10 }, () => ({
        lat: (Math.random() * 180 - 90).toFixed(4),
        lon: (Math.random() * 360 - 180).toFixed(4),
        co2: (Math.random() * 1000).toFixed(2)
    }));
    const temperatureData = Array.from({ length: 10 }, () => ({
        lat: (Math.random() * 180 - 90).toFixed(4),
        lon: (Math.random() * 360 - 180).toFixed(4),
        temperature: (Math.random() * 30 + 10).toFixed(2)
    }));

    const co2Labels = formatLabels(co2Data, 10); // Wrap labels with a max length of 10 characters
    const co2Values = co2Data.map(data => data.co2);

    const tempLabels = formatLabels(temperatureData, 10); // Wrap labels with a max length of 10 characters
    const tempValues = temperatureData.map(data => data.temperature);

    const co2Graph = createCO2Graph();
    co2Graph.data.labels = co2Labels;
    co2Graph.data.datasets[0].data = co2Values;
    co2Graph.update();

    const temperatureGraph = createTemperatureGraph();
    temperatureGraph.data.labels = tempLabels;
    temperatureGraph.data.datasets[0].data = tempValues;
    temperatureGraph.update();
}

init();
