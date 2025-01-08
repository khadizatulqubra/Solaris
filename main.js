document.addEventListener('DOMContentLoaded', () => {
    // Reference to the search input field and planet elements
    const searchInput = document.getElementById('planet-search');
    const planets = document.querySelectorAll('.planet');
    const detailsContainer = document.getElementById('details-container');
    const planetDetails = document.getElementById('planet-details');
    const closeModalButton = document.getElementById('close-details'); // Get close button

    // Initialize planetData as an empty array
    let planetData = [];

    async function fetchPlanetData() {
        try {
            const response = await fetch('http://localhost:3000/bodies'); // Adjust URL as needed
            const data = await response.json();
            console.log('Fetched Data:', data); // Log the fetched data
            
            // Assign planetData to the 'bodies' array from the response
            planetData = data.bodies; // Now planetData will be the array of planets
    
            // Check if data is an array
            if (Array.isArray(planetData)) {
                console.log('Planet Data is an array:', planetData);
            } else {
                console.error('Planet data is not an array:', planetData);
            }
        } catch (error) {
            console.error('Error fetching planet data:', error);
        }
    }
    

    // Call fetchPlanetData when the page loads
    fetchPlanetData();

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
            
            // Ensure planetData is an array and contains the planet
            if (Array.isArray(planetData)) {
                const planetInfo = planetData.find(p => p.name === planetName);

                if (planetInfo) {
                    renderPlanetDetails(planetInfo);
                } else {
                    console.error(`Planet ${planetName} not found in planetData`);
                }
            } else {
                console.error('planetData is not an array or is empty');
            }
        });
    });
});
