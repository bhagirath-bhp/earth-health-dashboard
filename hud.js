function createText(text, size, color) {
    const loader = new THREE.FontLoader();
    return new Promise((resolve) => {
        loader.load('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/fonts/helvetiker_regular.typeface.json', (font) => {
            const geometry = new THREE.TextGeometry(text, {
                font: font,
                size: size,
                height: 0.1,
            });
            const material = new THREE.MeshBasicMaterial({ color: color });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(-5, 5, 0); // Position the text in the scene
            resolve(mesh);
        });
    });
}

async function init() {
    // Existing init code...

    // Add static text HUD elements
    const healthText = await createText('Earth Health Dashboard', 1, 0xffffff);
    scene.add(healthText);

    // Add more HUD elements as needed
    // e.g., Create a text mesh for CO2 levels and add to the scene
    const co2Text = await createText('CO2 Levels: N/A', 0.5, 0x00ff00);
    co2Text.position.set(-5, 4, 0);
    scene.add(co2Text);

    const regionText = await createText('Region: N/A', 0.5, 0x00ff00);
    regionText.position.set(-5, 3, 0);
    scene.add(regionText);

    // Update the overlay and HUD elements as needed
    function updateHUD(co2Level, region) {
        document.getElementById('co2-level').textContent = co2Level;
        document.getElementById('region').textContent = region;
        // Update Three.js text meshes as well
        co2Text.geometry = new THREE.TextGeometry('CO2 Levels: ' + co2Level, {
            font: font,
            size: 0.5,
            height: 0.1,
        });
        regionText.geometry = new THREE.TextGeometry('Region: ' + region, {
            font: font,
            size: 0.5,
            height: 0.1,
        });
    }

    // Example usage of updateHUD
    updateHUD('400 ppm', 'North America');

    // Continue with existing animation loop and other code...
}
