function createCO2Graph() {
    const ctx = document.querySelector('.co2Graph').getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Add labels dynamically
            datasets: [{
                label: 'CO2 Levels',
                data: [], // Add CO2 data dynamically
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `CO2 Level: ${context.raw} ppm`;
                        }
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
            labels: [], // Add labels dynamically
            datasets: [{
                label: 'Temperature Data',
                data: [], // Add temperature data dynamically
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `Temperature: ${context.raw} °C`;
                        }
                    }
                }
            }
        }
    });
}

async function init() {
    // Existing init code...

    // Create and initialize graphs
    const co2Graph = createCO2Graph();
    const temperatureGraph = createTemperatureGraph();

    // Example function to update graph data
    function updateGraphs(co2Data, temperatureData) {
        const co2Labels = co2Data.map(data => `${data.lat}, ${data.lon}`);
        const co2Values = co2Data.map(data => data.co2);

        const tempLabels = temperatureData.map(data => `${data.lat}, ${data.lon}`);
        const tempValues = temperatureData.map(data => data.temperature);

        co2Graph.data.labels = co2Labels;
        co2Graph.data.datasets[0].data = co2Values;
        co2Graph.update();

        temperatureGraph.data.labels = tempLabels;
        temperatureGraph.data.datasets[0].data = tempValues;
        temperatureGraph.update();
    }

    // Example usage of updateGraphs
    updateGraphs(
        Array.from({ length: 10 }, () => generateRandomDataPoint()), // Example CO2 data
        Array.from({ length: 10 }, () => ({ lat: Math.random() * 180 - 90, lon: Math.random() * 360 - 180, temperature: (Math.random() * 30 + 10).toFixed(2) })) // Example temperature data
    );

    // Continue with existing animation loop and other code...
}