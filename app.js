// Select the button and container
const fetchButton = document.getElementById('fetch-pokemon');
const pokemonContainer = document.getElementById('pokemon-container');

// Function to fetch Pokémon data from the API
async function fetchPokemon() {
    try {
        // Fetch data for the first 10 Pokémon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await response.json();

        // Clear the container before adding new Pokémon
        pokemonContainer.innerHTML = '';

        // Iterate over each Pokémon
        for (const pokemon of data.results) {
            // Fetch detailed data for each Pokémon
            const pokemonDetails = await fetch(pokemon.url).then((res) => res.json());

            // Create and display Pokémon card
            displayPokemon(pokemonDetails);
        }
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

// Function to create and display a Pokémon card
function displayPokemon(pokemon) {
    // Create a container for the Pokémon card
    const card = document.createElement('div');
    card.className = 'pokemon-card';

    // Add Pokémon name and image
    card.innerHTML = `
        <h3>${pokemon.name}</h3>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    `;

    // Append the card to the container
    pokemonContainer.appendChild(card);
}

// Add event listener to the fetch button
fetchButton.addEventListener('click', fetchPokemon);
