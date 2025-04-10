import { PokemonTeamViewModel } from "./viewModel.js";

export class PokemonUI {
    constructor(viewModel, jsonURL) {
        this.viewModel = viewModel;
        this.jsonURL = jsonURL;
        this.teamSection = null;
        this.teamSelectionSection = null;
        this.gridSection = null;
        this.gridContainer = null;
        this.teamGrid = null;
        this.secondTeamGrid = null;
        this.creditsDisplay = null;
        this.clearTeamButton = null;
        this.sortOptionsSection = null;
        this.sortTeamButton = null;
        this.sortOptionsForm = null;
        this.playerSetupSection = null;
        this.twoPlayersToggle = null;
        this.player1NameText = null;
        this.player2NameText = null;
        this.player2Container = null;
        this.startButton = null;
        this.currentPlayerSelectMSG = null;
        this.nextButton = null;
        this.currentPlayerText = null;
        this.battleSection = null;
        this.attackButton = null;
        this.combatBanner1 = null;
        this.combatBanner2 = null;
    }

    async init() {
        this.cacheDom();
        this.bindEvents();
        await this.fetchAndLoadPokemons();
    }

    cacheDom() {
        this.teamSection = document.getElementById("team-section");
        this.teamSelectionSection = document.getElementById("team-selection-section");
        this.gridSection = document.getElementById("pokemon-grid-section");
        this.gridContainer = document.getElementById("pokemon-grid");
        this.teamGrid = document.getElementById("selected-team-grid");
        this.secondTeamGrid = document.getElementById("second-team-grid");
        this.creditsDisplay = document.getElementById("credits-display");
        this.clearTeamButton = document.getElementById("clear-team");
        this.sortOptionsSection = document.getElementById("sort-options-section");
        this.sortTeamButton = document.getElementById("sort-team");
        this.sortOptionsForm = document.getElementById("sort-options-form");
        this.playerSetupSection = document.getElementById("player-setup-section");
        this.twoPlayersToggle = document.getElementById("two-players-toggle");
        this.player1NameText = document.getElementById("player1-name");
        this.player2NameText = document.getElementById("player2-name");
        this.player2Container = document.getElementById("player2-container");
        this.startButton = document.getElementById("start-team-selection-button");
        this.currentPlayerSelectMSG = document.getElementById("current-player-selection");
        this.nextButton = document.getElementById("next-player-button");
        this.currentPlayerText = document.getElementById("current-player-selection");
        this.battleSection = document.getElementById("battle-section");
        this.attackButton = document.getElementById("perform-attack-button");
        this.combatBanner1 = document.getElementById("combat-banner-player1");
        this.combatBanner2 = document.getElementById("combat-banner-player2");
    }

    bindEvents() {
        this.clearTeamButton.addEventListener("click", this.clearTeam.bind(this));
        this.sortTeamButton.addEventListener("click", this.handleSortOptions.bind(this));
        this.twoPlayersToggle.addEventListener("change", () => {
            if (this.player2Container.hidden)
                this.player2Container.hidden = false;
            else
                this.player2Container.hidden = true;
        });
        this.startButton.addEventListener("click", this.startTeamSelection.bind(this));
        this.nextButton.addEventListener("click", this.handleNextPlayer.bind(this));
        this.attackButton.addEventListener("click", this.startBattle.bind(this));
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

            // Cambiar fondo en base al power
            const maxPower = this.viewModel.pokemonList.getPokemonByName(pokemon.name).power;
            console.log(`${pokemon.name} | Default power: ${maxPower} | Current power: ${pokemon.power}`);
            if (pokemon.power != maxPower) {
                const healthPercentage = pokemon.power / maxPower;

                let red, green;

                // Si la vida es superior al 50%, transición de verde a amarillo
                if (healthPercentage > 0.5) {
                    red = Math.floor(255 * (1 - (2 * (healthPercentage - 0.5))));
                    green = 255;
                } else { 
                    // Si la vida es inferior al 50%, transición de amarillo a rojo
                    red = 255;
                    green = Math.floor(255 * (2 * healthPercentage));
                }

                card.style.background = `linear-gradient(to top, 
                rgb(${red}, ${green}, 0) ${healthPercentage * 100 - 2}%, 
                rgba(${red}, ${green}, 0, 0.8) ${healthPercentage * 100}%, 
                rgba(${red}, ${green}, 0, 0.3) ${healthPercentage * 100 + 3}%, 
                transparent ${healthPercentage * 100 + 5}%)`;
            }

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
        const index = this.viewModel.currentPlayer.team.selectedTeam.findIndex(p => p.name === pokemonName);


        if (index === -1) {
            // Si no està seleccionat, comprova els crèdits disponibles i que no tenim ja l'equip complert
            const maxTeamSize = this.viewModel.currentPlayer.team.maxTeamSize;
            check = this.viewModel.currentPlayer.team.selectedTeam.length < maxTeamSize;
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
    showTeam(player = 3) {
        if (player == 1)
            this.secondTeamGrid.innerHTML = ""; // Neteja la graella
        else
            this.teamGrid.innerHTML = "";
        if (player == 3) console.log("regular showTeam execution");
        else if ((player && this.viewModel.currentPlayer == this.viewModel.player2) | (player == 2 && this.viewModel.currentPlayer == this.viewModel.player1))
            this.viewModel.switchPlayer();

        if (this.viewModel.currentPlayer.team.selectedTeam.length === 0) {
            const emptyMessage = document.createElement("div");
            emptyMessage.id = "team-grid-empty-message"; // Afegeix un id per estilitzar
            emptyMessage.textContent = "El teu equip està buit!";
            if (player == 1)
                this.secondTeamGrid.appendChild(emptyMessage);
            else
                this.teamGrid.appendChild(emptyMessage);
                
            return;
        }


        this.generateCards(this.viewModel.currentPlayer.team.selectedTeam).forEach(card => {
            // Afegir funcionalitat d'eliminació
            if (player == 3) {
                card.addEventListener("click", () => {
                    Array.from(this.gridContainer.children).forEach(carta => {
                        let nom = carta.dataset.name;
                        if (nom == card.dataset.name) {
                            this.toggleSelection(carta);
                        }
                    })
                });
            }
            if (player == 1)
                this.secondTeamGrid.appendChild(card);
            else 
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
        Array.from(this.viewModel.currentPlayer.team.selectedTeam).forEach(pokemon => {
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

    startTeamSelection() {
        this.playerSetupSection.style.display = "none";
        this.teamSection.style.display = "block";
        this.teamSelectionSection.style.display = "block";
        this.sortOptionsSection.style.display = "block";
        this.gridSection.style.display = "block";
        const thereIsCPU = this.player2Container.hidden;
        if (thereIsCPU)
            this.nextButton.textContent = "Lluitar!";

        this.viewModel.initializeMatch(this.player1NameText.value, thereIsCPU ? "CPU" : this.player2NameText.value);
        this.currentPlayerText.innerHTML = `${this.viewModel.currentPlayer.name}, select your Pokémon.`;
        this.renderGlobalList();
        this.updateCreditsDisplay();
    }

    handleNextPlayer() {
        const thereIsCPU = this.player2Container.hidden;
        if (!thereIsCPU) {
            this.viewModel.switchPlayer(thereIsCPU);
            this.renderGlobalList();
            this.showTeam();
            this.updateCreditsDisplay();
            this.nextButton.removeEventListener("click", this.handleNextPlayer.bind(this));
            this.nextButton.addEventListener("click", this.transitionToBattle.bind(this));
            this.currentPlayerText.innerHTML = `${this.viewModel.currentPlayer.name}, select your Pokémon.`;
            this.nextButton.textContent = "Lluitar!";
        } else {
            this.viewModel.switchPlayer(thereIsCPU);
            this.transitionToBattle();
        }
    }

    transitionToBattle() {
        this.teamSelectionSection.style.display = "none";
        this.teamSection.style.display = "none";
        this.sortOptionsSection.style.display = "none";
        this.gridSection.style.display = "none";
        this.combatBanner1.innerHTML = `${this.viewModel.player1.name}'s Team`;
        this.combatBanner2.innerHTML = `${this.viewModel.player2.name}'s Team`;
        this.battleSection.style.display = "block";
        this.battleSection.appendChild(this.teamGrid);
        this.showTeams();
    }

    startBattle() {
        this.viewModel.startBattle().then(result => {
            if (result) alert("Recarrega la pàgina per tornar a jugar!");
            this.showTeams();
        });
    }

    showTeams() {
        this.showTeam(1);
        this.showTeam(2);
    }
}