
export class PokemonUI {
  constructor(viewModel, jsonUrl = "./pokemon_data.json") {
    this.viewModel = viewModel;  // A PokemonTeamViewModel instance
    this.jsonUrl = jsonUrl;      // Path to your JSON
    this.gridContainer = "";
    this.teamGrid =  "";
    this.creditsDisplay =  "";
    this.showTeamButton =  "";
    this.sortTeamButton =  "";
    this.sortOptionsForm =  "";
    this.detailsPopUp = "";
    this.detailsClose = "";
    this.detailsImg = "";
    this.detailsName = "";
    this.detailsTypes = "";
    this.detailsPoints = "";
    this.detailsSp = "";
    this.detailsDescription = "";
    this.shuffleButton = "";
  }

  /**
   * Initialize the entire UI:
   * 1. Cache DOM elements
   * 2. Bind event listeners
   * 3. Load data from JSON
   * 4. Render the initial global list
   * 5. Update credits
   */
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
    this.showTeamButton = document.getElementById("show-team");
    this.sortTeamButton = document.getElementById("sort-team");
    this.sortOptionsForm = document.getElementById("sort-options-form");
    this.detailsPopUp = document.getElementById("details-popup");
    this.detailsClose = document.getElementById("details-close");
    this.detailsImg = document.getElementById("details-img");
    this.detailsName = document.getElementById("details-name");
    this.detailsTypes = document.getElementById("details-types");
    this.detailsPoints = document.getElementById("details-points");
    this.detailsSp = document.getElementById("details-sp");
    this.detailsDescription = document.getElementById("details-description");
    this.shuffleButton = document.getElementById("shuffle-team");
  }

  bindEvents() {
    // Button to show the current team
    this.showTeamButton.addEventListener("click", () => this.showTeam());

    // Button to sort
    this.sortTeamButton.addEventListener("click", () => this.handleSortOptions());

    // Button to close details popup
    this.detailsClose.addEventListener("click", () => {this.detailsPopUp.style.display = "none";});

    // Button to shuffle pokemon list
    this.shuffleButton.addEventListener("click", () => this.handleShuffle());
  }

  async fetchAndLoadPokemons() {
    try {
      const response = await fetch(this.jsonUrl);
      const data = await response.json();
      // Load the JSON data into the view model's PokemonList
      this.viewModel.pokemonList.loadPokemons(data);
    } catch (error) {
      console.error("Error loading Pokémon data:", error);
    }
  }

  renderGlobalList() {
    if (!this.gridContainer) return;
    this.gridContainer.innerHTML = "";

    // We get the global list from the ViewModel per UML's getGlobalList()
    const globalPokemons = this.viewModel.getGlobalList();

    globalPokemons.forEach((pokemon) => {
      const card = document.createElement("div");
      card.className = "pokemon-card";
      card.dataset.name = pokemon.name;
      card.dataset.points = pokemon.points;

      // Build an image name
      const imageName = pokemon.name.replace(/ /g, "_").replace(/\./g, "") + ".png";
      const img = document.createElement("img");
      img.src = `./images/${imageName}`;
      img.alt = pokemon.name;

      const nameEl = document.createElement("h3");
      nameEl.textContent = pokemon.name;

      const pointsEl = document.createElement("p");
      pointsEl.textContent = `Points: ${pokemon.points}`;

      card.appendChild(img);
      card.appendChild(nameEl);
      card.appendChild(pointsEl);

      // Check if this Pokémon is already in the team
      const isInTeam = this.isPokemonInTeam(pokemon.name);
      if (isInTeam) {
        card.classList.add("selected");
      }

      // Click -> add or remove
      card.addEventListener("click", (event) => this.toggleSelection(card, event)); // Afegim event per si es polsa shift mostrar el popup

      this.gridContainer.appendChild(card);
    });
  }

  toggleSelection(card, event) {
    const pokemonName = card.dataset.name;
    const isInTeam = this.isPokemonInTeam(pokemonName);

    if (event.shiftKey) { // Si es prem shift, mostrarem el popup
      const pokemon = this.viewModel.pokemonList.getPokemonByName(pokemonName); // Primer rebem l'objecte pokemon per passarlo al metode
      if (pokemon) { // Si l'hem trobat, cridem el metode per mostrar i omplir el popup
        this.showDetailsPopup(pokemon);
      }
      return;
    }

    if (isInTeam) {
      // remove from team
      this.viewModel.removePokemonFromTeam(pokemonName);
      card.classList.remove("selected");
    } else {
      // add to team
      this.viewModel.addPokemonToTeam(pokemonName);
      // if successfully added (i.e., no console error about credits)
      // there's no direct "success" boolean, but we could read logs or do custom checks.
      // For simplicity, we'll re-check if it is on the team now:
      if (this.isPokemonInTeam(pokemonName)) {
        card.classList.add("selected");
      }
    }

    this.updateCreditsDisplay();
  }

  showTeam() {
    if (!this.teamGrid) return;
    this.teamGrid.innerHTML = "";

    // The UML does not define a "getTeam()" array method, 
    // but we can read from the internal property directly:
    const selectedTeam = this.viewModel.team.selectedTeam;

    if (selectedTeam.length === 0) {
      this.teamGrid.textContent = "El teu equip està buit!";
      return;
    }

    selectedTeam.forEach((pokemon) => {
      const card = document.createElement("div");
      card.className = "pokemon-card";

      const imageName = pokemon.name.replace(/ /g, "_").replace(/\./g, "") + ".png";
      const img = document.createElement("img");
      img.src = `./images/${imageName}`;
      img.alt = pokemon.name;

      const nameEl = document.createElement("h3");
      nameEl.textContent = pokemon.name;

      const pointsEl = document.createElement("p");
      pointsEl.textContent = `Points: ${pokemon.points}`;

      card.appendChild(img);
      card.appendChild(nameEl);
      card.appendChild(pointsEl);

      this.teamGrid.appendChild(card);
    });
  }

  handleSortOptions() {
    if (!this.sortOptionsForm) return;
    // Extract radio values
    const criteria = this.sortOptionsForm.querySelector(
      'input[name="sort-criteria"]:checked'
    )?.value;

    const method = this.sortOptionsForm.querySelector(
      'input[name="sort-method"]:checked'
    )?.value;

    // Use the UML method on the view model
    this.viewModel.sortGlobalList(criteria, method);

    // Re-render
    this.renderGlobalList();
  }

  updateCreditsDisplay() {
    if (!this.creditsDisplay) return;
    this.creditsDisplay.textContent = `Crèdits disponibles: ${this.viewModel.getCredits()}`;
  }

  /**
   * Quick helper: check if a Pokemon is in the team by name.
   * Because the UML does not provide a "isPokemonInTeam()" method, 
   * we have to check the internal property:
   */
  isPokemonInTeam(name) {
    return this.viewModel.team.selectedTeam.some((p) => p.name === name);
  }

  // Mètode per barrejar els Pokémon de la llista Pokémon
  handleShuffle() {
    this.viewModel.shufflePokemons(); // Cridem el mètode del viewModel
    this.renderGlobalList(); // Re-renderitzem la llista
  }

  // Metode per mostrar el popup amb els detalls del pokemon
  showDetailsPopup(pokemon) {
    this.detailsPopUp.style.display = "block"; // Mostrem la seccio
    this.detailsImg.src = pokemon.image; // Enganxem la imatge
    this.detailsName.textContent = pokemon.name; // Enganxem el nom
    this.detailsTypes.textContent = pokemon.types.length > 1 ? `${pokemon.types[0]}, ${pokemon.types[1]}` : pokemon.types[0]; // Si te 1 tipus, l'enganxem, si no, n'enganxem els dos
    this.detailsPoints.textContent = pokemon.points; // Enganxem els punts
    this.detailsSp.textContent = pokemon.specialPower; // Enganxem el poder especial
    this.detailsDescription.textContent = pokemon.description; // Enganxem la descripcio
  }
}
