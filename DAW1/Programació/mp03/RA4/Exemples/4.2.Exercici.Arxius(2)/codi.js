// Ruta al fitxer JSON
const JSON_URL = "./pokemon_data.json";

// Variables globals
let selectedPokemon = []; // Pokémon seleccionats
let credits = 2000; // Crèdits inicials

// Funció per carregar els Pokémon i mostrar-los a la graella
async function loadPokemonGrid() {
    try {
        const response = await fetch(JSON_URL);
        const pokemons = await response.json();

        const gridContainer = document.getElementById("pokemon-grid");
        gridContainer.innerHTML = ""; // Neteja la graella

        pokemons.forEach(pokemon => {
            const card = document.createElement("div");
            card.className = "pokemon-card";
            card.dataset.name = pokemon.name;
            card.dataset.points = pokemon.points;

            // Genera el nom de l'arxiu d'imatge substituint espais per guions baixos i eliminant els punts
            const imageName = pokemon.name.replace(/ /g, "_") + ".png";

            const img = document.createElement("img");
            img.src = `./images/${imageName}`;
            img.alt = pokemon.name;

            const name = document.createElement("h3");
            name.textContent = pokemon.name;

            const types = document.createElement("p");
            types.textContent = `Types: ${pokemon.types.join(", ")}`;

            const points = document.createElement("p");
            points.textContent = `Points: ${pokemon.points}`;

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(types);
            card.appendChild(points);

            // Afegir funcionalitat de selecció
            card.addEventListener("click", () => toggleSelection(card));

            gridContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading Pokémon data:", error);
    }
}

// Funció per alternar la selecció d'un Pokémon
function toggleSelection(card) {
    const pokemonName = card.dataset.name;
    const pokemonPoints = parseInt(card.dataset.points);

    // Verifica si ja està seleccionat
    const index = selectedPokemon.findIndex(p => p.name === pokemonName);

    if (index === -1) {
        // Si no està seleccionat, comprova els crèdits disponibles
        if (credits >= pokemonPoints) {
            selectedPokemon.push({ name: pokemonName, points: pokemonPoints });
            credits -= pokemonPoints;
            card.classList.add("selected");
            updateCreditsDisplay();
        } else {
            alert("No tens prou crèdits per afegir aquest Pokémon!");
        }
    } else {
        // Si ja està seleccionat, elimina'l
        selectedPokemon.splice(index, 1);
        credits += pokemonPoints;
        card.classList.remove("selected");
        updateCreditsDisplay();
    }
}

// Funció per mostrar l'equip seleccionat
function showTeam() {
    const teamGrid = document.getElementById("selected-team-grid");
    teamGrid.innerHTML = ""; // Neteja la graella

    if (selectedPokemon.length === 0) {
        teamGrid.textContent = "El teu equip està buit!";
        return;
    }

    selectedPokemon.forEach(pokemon => {
        const card = document.createElement("div");
        card.className = "pokemon-card";

        // Genera el nom de l'arxiu d'imatge
        const imageName = pokemon.name.replace(/ /g, "_").replace(/\./g, "") + ".png";

        const img = document.createElement("img");
        img.src = `./images/${imageName}`;
        img.alt = pokemon.name;

        const name = document.createElement("h3");
        name.textContent = pokemon.name;

        const points = document.createElement("p");
        points.textContent = `Points: ${pokemon.points}`;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(points);

        teamGrid.appendChild(card);
    });
}

// Funció per actualitzar la visualització dels crèdits
function updateCreditsDisplay() {
    const creditsDisplay = document.getElementById("credits-display");
    creditsDisplay.textContent = `Crèdits disponibles: ${credits}`;
}

// Carrega la graella quan la pàgina s'ha carregat
document.addEventListener("DOMContentLoaded", () => {
    loadPokemonGrid();

    // Configura el botó Show Team
    const showTeamButton = document.getElementById("show-team");
    showTeamButton.addEventListener("click", showTeam);

    // Mostra els crèdits inicials
    updateCreditsDisplay();
});
