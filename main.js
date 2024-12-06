document.addEventListener('DOMContentLoaded', () => {
    // Reference to the search input field and planet elements
    const searchInput = document.getElementById('planet-search');
    const planets = document.querySelectorAll('.planet');
    const detailsContainer = document.getElementById('details-container');
    const planetDetails = document.getElementById('planet-details');
    const closeModalButton = document.getElementById('close-details'); // Get close button

    // JSON data for planets
    const planetData = [
        { name: 'Mercury', latinName: 'Mercurius', description: 'Mercury is the closest planet to the Sun.', rotation: 58.6, orbitalPeriod: 88, circumference: 4879, distance: 57909227, temp: { day: 430, night: -180 }, moons: [] },
        { name: 'Venus', latinName: 'Venus', description: 'Venus is the second planet from the Sun.', rotation: 243, orbitalPeriod: 225, circumference: 12104, distance: 108208930, temp: { day: 462, night: 462 }, moons: [] },
        { name: 'Earth', latinName: 'Terra', description: 'Earth is the third planet from the Sun and the only known planet to support life.', rotation: 1, orbitalPeriod: 365, circumference: 40075, distance: 149598023, temp: { day: 15, night: -40 }, moons: ['Moon'] },
        { name: 'Mars', latinName: 'Mars', description: 'Mars is the fourth planet from the Sun and known as the Red Planet.', rotation: 1.03, orbitalPeriod: 687, circumference: 21200, distance: 227939100, temp: { day: 20, night: -60 }, moons: ['Phobos', 'Deimos'] },
        { name: 'Jupiter', latinName: 'Jupiter', description: 'Jupiter is the fifth planet from the Sun and the largest in the solar system.', rotation: 0.41, orbitalPeriod: 4333, circumference: 439264, distance: 778340821, temp: { day: -108, night: -163 }, moons: ['Io', 'Europa', 'Ganymede', 'Callisto'] },
        { name: 'Saturn', latinName: 'Saturnus', description: 'Saturn is the sixth planet from the Sun and is known for its prominent ring system.', rotation: 0.45, orbitalPeriod: 10759, circumference: 365882, distance: 1426725413, temp: { day: -139, night: -178 }, moons: ['Titan', 'Rhea', 'Enceladus'] },
        { name: 'Uranus', latinName: 'Uranus', description: 'Uranus is the seventh planet from the Sun and is unique for rotating on its side.', rotation: 0.72, orbitalPeriod: 30687, circumference: 159354, distance: 2870658186, temp: { day: -195, night: -224 }, moons: ['Miranda', 'Ariel', 'Umbriel', 'Titania'] },
        { name: 'Neptune', latinName: 'Neptunus', description: 'Neptune is the eighth planet from the Sun and is known for its deep blue color.', rotation: 0.67, orbitalPeriod: 60190, circumference: 155600, distance: 4498258000, temp: { day: -200, night: -218 }, moons: ['Triton'] }
    ];

    // Function to filter planets based on search input
    searchInput.addEventListener('input', (e) => {
        const searchQuery = e.target.value.toLowerCase();
        planets.forEach(planet => {
            const planetName = planet.dataset.name.toLowerCase();
            planet.style.display = planetName.includes(searchQuery) ? 'block' : 'none';
        });
    });

    // Function to render planet details in the modal
    function renderPlanetDetails(planet) {
        planetDetails.innerHTML = `
            <h2>${planet.name} (${planet.latinName})</h2>
            <p>${planet.description}</p>
            <ul>
                <li><strong>Rotation:</strong> ${planet.rotation} Earth days</li>
                <li><strong>Orbital Period:</strong> ${planet.orbitalPeriod} Earth days</li>
                <li><strong>Circumference:</strong> ${planet.circumference} km</li>
                <li><strong>Distance from Sun:</strong> ${planet.distance} km</li>
                <li><strong>Temperature (Day):</strong> ${planet.temp.day}°C</li>
                <li><strong>Temperature (Night):</strong> ${planet.temp.night}°C</li>
                <li><strong>Moons:</strong> ${planet.moons.length > 0 ? planet.moons.join(', ') : 'None'}</li>
            </ul>
        `;
        detailsContainer.style.display = 'block'; // Show the modal
    }

    // Close modal when the close button is clicked
    closeModalButton.addEventListener('click', () => {
        detailsContainer.style.display = 'none'; // Hide the modal
    });

    // Event listener for each planet to show details
    planets.forEach(planet => {
        planet.addEventListener('click', () => {
            const planetName = planet.dataset.name;
            const planetInfo = planetData.find(p => p.name === planetName);
            renderPlanetDetails(planetInfo);
        });
    });
});
