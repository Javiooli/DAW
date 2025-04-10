import { PokemonTeamViewModel } from "./viewModel.js";

export class PokemonUI {
    constructor(viewModel, jsonURL) {
        this.viewModel = viewModel;
        this.jsonURL = jsonURL;
        this.gridContainer = null;
        this.teamGrid = null;
        this.creditsDisplay = null;
        this.clearTeamButton = null;
        this.sortTeamButton = null;
        this.sortOptionsForm = null;
    }

    async init() {
        this.cacheDom();
        this.bindEvents();
        await this.fetchAndLoadPokemons();
        this.renderGlobalList();
        this.updateCreditsDisplay();
    }

    cacheDom() {
        this.gridContainer = document.getElementById("pokemon-grid");
        this.teamGrid = document.getElementById("selected-team-grid");
        this.creditsDisplay = document.getElementById("credits-display");
        this.clearTeamButton = document.getElementById("clear-team");
        this.sortTeamButton = document.getElementById("sort-team");
        this.sortOptionsForm = document.getElementById("sort-options-form");
    }

    bindEvents() {
        this.clearTeamButton.addEventListener("click", this.clearTeam.bind(this));
        this.sortTeamButton.addEventListener("click", this.handleSortOptions.bind(this));
    }


    // Funció per carregar els Pokémon
    async fetchAndLoadPokemons() {
        try {
            const response = await fetch(this.jsonURL);
            const pokemonsJSON = await response.json();
            this.viewModel.getGlobalList().loadPokemons(pokemonsJSON);

        } catch (error) {
            console.error("Error loading Pokémon data:", error);
        }
    }

    // Funció per mostrar els Pokémon a la graella
    renderGlobalList() {
        try {
            const pokemons = this.viewModel.getGlobalList().allPokemons;

            this.gridContainer.innerHTML = ""; // Neteja la graella

            const cardsArray = this.generateCards(pokemons);

            cardsArray.forEach(card => {
                // Afegir funcionalitat de selecció
                card.addEventListener("click", () => this.toggleSelection(card));
                this.gridContainer.appendChild(card);
            })

        } catch (error) {
            console.error("Error rendering Pokémon list:", error);
        }
    }

    generateCards(pokemons) {
        const cardArray = [];

        pokemons.forEach(pokemon => {
            const card = document.createElement("div");
            card.className = "pokemon-card";
            card.dataset.name = pokemon.name;
            card.dataset.points = pokemon.points;
            card.dataset.object = pokemon;

            // Genera el nom de l'arxiu d'imatge substituint espais per guions baixos i eliminant els punts

            const img = document.createElement("img");
            img.src = `./images/${pokemon.image}`;
            img.alt = pokemon.name;

            const name = document.createElement("h3");
            name.textContent = pokemon.name;

            // Crear les icones dels tipus
            const typesContainer = document.createElement("div");
            typesContainer.className = "types-container";

            pokemon.types.forEach(type => {
                const typeIcon = document.createElement("img");
                typeIcon.src = `./images/types/${type}.svg`;
                typeIcon.alt = type;
                typeIcon.className = "type-icon";
                typeIcon.style = "width: 30px; height: 30px;"
                typesContainer.appendChild(typeIcon);
            });

            const types = document.createElement("p");
            types.textContent = (pokemon.types.length > 1 ? `Types: ${pokemon.types.join(", ")}` : `Type: ${pokemon.types.join(", ")}`);

            const points = document.createElement("p");
            points.textContent = `Points: ${pokemon.points}`;

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(typesContainer);
            card.appendChild(types);
            card.appendChild(points);

            cardArray.push(card);

            
        });

        return cardArray;
    }


    // Funció per alternar la selecció d'un Pokémon
    toggleSelection(card) {
        let check = false;
        const pokemonName = card.dataset.name;
        // Verifica si ja està seleccionat
        const index = this.viewModel.team.selectedTeam.findIndex(p => p.name === pokemonName);


        if (index === -1) {
            // Si no està seleccionat, comprova els crèdits disponibles i que no tenim ja 6 Pokémon afegits
            check = this.viewModel.team.selectedTeam.length < 6;
            if (check) {    check = check && this.viewModel.addPokemonToTeam(pokemonName);  }
            else {          alert("Equip complert (Màx. 6 Pokémon).");  }

            if (check) {    card.classList.add("selected"); }

        } else {
            // Si ja està seleccionat, elimina'l
            check = this.viewModel.removePokemonFromTeam(pokemonName);
            if (check) {    card.classList.remove("selected");  }

        }
        this.showTeam();
        this.updateCreditsDisplay();
    }

    // Funció per mostrar l'equip seleccionat
    showTeam() {
        this.teamGrid.innerHTML = ""; // Neteja la graella

        if (this.viewModel.team.selectedTeam.length === 0) {
            const emptyMessage = document.createElement("div");
            emptyMessage.id = "team-grid-empty-message"; // Afegeix un id per estilitzar
            emptyMessage.textContent = "El teu equip està buit!";
            this.teamGrid.appendChild(emptyMessage);
            return;
        }


        this.generateCards(this.viewModel.team.selectedTeam).forEach(card => {
            // Afegir funcionalitat d'eliminació
            card.addEventListener("click", () => {
                Array.from(this.gridContainer.children).forEach(carta => {
                    let nom = carta.dataset.name;
                    if (nom == card.dataset.name) {
                        this.toggleSelection(carta);
                    }
                })
            });
            this.teamGrid.appendChild(card);
        });
    }

    handleSortOptions() {
        const sortMethod = this.sortOptionsForm.querySelector('input[name="sort-method"]:checked').value;
        const sortCriteria = this.sortOptionsForm.querySelector('input[name="sort-criteria"]:checked').value;
        this.viewModel.sortGlobalList(sortCriteria, sortMethod);
        this.renderGlobalList();
        Array.from(this.gridContainer.children).forEach(carta => {
            let nom = carta.dataset.name
            if (this.isPokemonInTeam(nom)) {
                carta.classList.add("selected");
            }
        });
    }

    updateCreditsDisplay() {
        this.creditsDisplay.textContent = `Crèdits disponibles: ${this.viewModel.getCredits()}`;
    }

    isPokemonInTeam(pokemonName) {
        let itIs = false;
        if (!pokemonName) { console.error("No s'ha rebut nom.");    return  } // Evita elements sense nom
        Array.from(this.viewModel.team.selectedTeam).forEach(pokemon => {
            if (!itIs && pokemon.name.toLowerCase() == pokemonName.toLowerCase()) {
                itIs = true;
            }
        });
        return itIs;
    }

    clearTeam() {
        Array.from(this.gridContainer.children).forEach(carta => {
            let nom = carta.dataset.name
            if (this.isPokemonInTeam(nom)) {
                this.toggleSelection(carta)
            }
        });
    }
}