async function loadConfig() {
    const response = await fetch('config.json');
    return await response.json();
}

async function init() {
    const config = await loadConfig();

    // Create the scene
    const scene = new THREE.Scene();

    // Create the camera
    const camera = new THREE.PerspectiveCamera(
        config.CAMERA.FOV,
        window.innerWidth / window.innerHeight,
        config.CAMERA.NEAR,
        config.CAMERA.FAR
    );
    camera.position.z = config.CAMERA.POSITION_Z;

    // Create the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Function to create a hollow sphere with vertices only
    function createHollowSphereVertices(
        outerRadius,
        innerRadius,
        widthSegments,
        heightSegments
    ) {
        const vertices = [];

        // Adjust height segments based on latitude sampling
        for (let i = 0; i <= heightSegments; i++) {
            const theta = Math.PI * i / heightSegments;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            // Non-uniform distribution: denser at the equator
            const numLongitudeSegments = Math.round(widthSegments * (0.5 * (1 + Math.sin(theta))));

            for (let j = 0; j <= numLongitudeSegments; j++) {
                const phi = (j * 2 * Math.PI) / numLongitudeSegments;
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);

                // Outer sphere
                vertices.push(
                    outerRadius * cosPhi * sinTheta,
                    outerRadius * cosTheta,
                    outerRadius * sinPhi * sinTheta
                );

                // Inner sphere
                // vertices.push(innerRadius * cosPhi * sinTheta, innerRadius * cosTheta, innerRadius * sinPhi * sinTheta);
            }
        }

        return vertices;
    }

    const {
        OUTER_RADIUS,
        INNER_RADIUS,
        WIDTH_SEGMENTS,
        HEIGHT_SEGMENTS
    } = config.SPHERE;

    // Create vertices for the hollow sphere
    const vertices = createHollowSphereVertices(
        OUTER_RADIUS,
        INNER_RADIUS,
        WIDTH_SEGMENTS,
        HEIGHT_SEGMENTS
    );

    // Create buffer geometry
    const geometry = new THREE.BufferGeometry();
    const verticesAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    geometry.setAttribute("position", verticesAttribute);

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

    for (let i = 0; i < numberOfDataPoints; i++) {
        co2Data.push(generateRandomDataPoint());
    }

    // Function to convert latitude and longitude to Cartesian coordinates
    function latLonToCartesian(lat, lon, radius) {
        const theta = ((lat + 90) * Math.PI) / 180;
        const phi = ((lon + 180) * Math.PI) / 180;

        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.cos(theta);
        const z = radius * Math.sin(theta) * Math.sin(phi);

        return new THREE.Vector3(x, y, z);
    }

    // Function to find the nearest vertex to a given coordinate
    function findNearestVertex(coordinate) {
        const vertices = geometry.attributes.position.array;
        let minDistance = Infinity;
        let nearestIndex = -1;

        for (let i = 0; i < vertices.length; i += 3) {
            const vertex = new THREE.Vector3(
                vertices[i],
                vertices[i + 1],
                vertices[i + 2]
            );
            const distance = vertex.distanceTo(coordinate);

            if (distance < minDistance) {
                minDistance = distance;
                nearestIndex = i;
            }
        }

        return nearestIndex;
    }

    // Function to map CO2 levels to color
    function co2ToColor(co2) {
        const normalizedCO2 = Math.min(1, (co2 - config.CO2.MIN_LEVEL) / (config.CO2.MAX_LEVEL - config.CO2.MIN_LEVEL));
        return new THREE.Color(`hsl(${(1 - normalizedCO2) * 240}, 100%, 50%)`);
    }

    // Apply CO2 data to the vertices
    const colors = [];
    for (let i = 0; i < geometry.attributes.position.count; i++) {
        colors.push(1, 1, 1); // Default to white
    }

    co2Data.forEach((data) => {
        const coordinate = latLonToCartesian(data.lat, data.lon, OUTER_RADIUS);
        const nearestIndex = findNearestVertex(coordinate);
        const color = co2ToColor(data.co2);
        colors[nearestIndex] = color.r;
        colors[nearestIndex + 1] = color.g;
        colors[nearestIndex + 2] = color.b;
    });

    // Update geometry with vertex colors
    geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
    );

    // Create a PointsMaterial with vertex colors
    const pointsMaterial = new THREE.PointsMaterial({
        size: config.VERTEX.SIZE,
        vertexColors: THREE.VertexColors,
    });

    // Create points
    const points = new THREE.Points(geometry, pointsMaterial);
    scene.add(points);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        points.rotation.y += 0.002;
        points.rotation.x += 0.001;
        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
}

init();