// codi.js

document.addEventListener("DOMContentLoaded", function () {
    // ***** Cache DOM Elements *****
    // Player Setup elements
    const twoPlayersToggle = document.getElementById("two-players-toggle");
    const player2Container = document.getElementById("player2-container");
    const player2Input = document.getElementById("player2-name");
    const player1Input = document.getElementById("player1-name");
    const startTeamSelectionButton = document.getElementById("start-team-selection-button");
    const playerSetupSection = document.getElementById("player-setup-section");
  
    // Team Selection elements
    const teamSelectionSection = document.getElementById("team-selection-section");
    const currentPlayerSelection = document.getElementById("current-player-selection");
    const pokemonGrid = document.getElementById("pokemon-grid");
    const nextPlayerButton = document.getElementById("next-player-button");
    const sortOptionsSection = document.getElementById("sort-options-section");
    const sortTeamButton = document.getElementById("sort-team");
  
    // Battle Section element
    const battleSection = document.getElementById("battle-section");
    const currentTurnDisplay = document.getElementById("current-turn-display");
  
    // ***** Global State Variables *****
    let isTwoPlayer = twoPlayersToggle.checked; // initially read from the toggle
    let currentPlayer = 1; // 1 or 2 (if 2, could be a human or CPU)
    let player1Name = "";
    let player2Name = "";
    let team1 = [];
    let team2 = [];
  
    // A dummy list of Pokémon (feel free to expand or modify)
    const pokemonList = [
      { name: "Pikachu", points: 50 },
      { name: "Charmander", points: 60 },
      { name: "Bulbasaur", points: 55 },
      { name: "Squirtle", points: 52 },
      { name: "Eevee", points: 48 },
      { name: "Jigglypuff", points: 40 },
    ];
  
    // ***** Step 1: Toggle – Block/Hide Second Player Input *****
    function updatePlayer2Visibility() {
      if (twoPlayersToggle.checked) {
        player2Container.style.display = "block";
        player2Input.required = true;
        if (player2Input.value === "CPU") {
          player2Input.value = "";
        }
      } else {
        player2Container.style.display = "none";
        player2Input.required = false;
        player2Input.value = "CPU";
      }
      isTwoPlayer = twoPlayersToggle.checked;
    }
  
    twoPlayersToggle.addEventListener("change", updatePlayer2Visibility);
    updatePlayer2Visibility();
  
    // ***** Utility: Render the Pokémon Grid *****
    function renderPokemonGrid() {
      // Clear the grid first
      pokemonGrid.innerHTML = "";
  
      // Create a card for each Pokémon
      pokemonList.forEach(function (pokemon) {
        const card = document.createElement("div");
        card.className = "pokemon-card";
        card.innerHTML = `<h3>${pokemon.name}</h3><p>Points: ${pokemon.points}</p>`;
        card.addEventListener("click", function () {
          togglePokemonSelection(pokemon, card);
        });
  
        // If the Pokémon is already in the current player's team, mark it as selected
        if (
          (currentPlayer === 1 && team1.find((p) => p.name === pokemon.name)) ||
          (currentPlayer === 2 && team2.find((p) => p.name === pokemon.name))
        ) {
          card.classList.add("selected");
        }
        pokemonGrid.appendChild(card);
      });
    }
  
    // ***** Utility: Toggle Selection for a Pokémon *****
    function togglePokemonSelection(pokemon, card) {
      if (currentPlayer === 1) {
        const index = team1.findIndex((p) => p.name === pokemon.name);
        if (index === -1) {
          // Limit team size to, say, 3 Pokémon for this demo
          if (team1.length < 3) {
            team1.push(pokemon);
            card.classList.add("selected");
          } else {
            alert("Player 1's team is full!");
          }
        } else {
          team1.splice(index, 1);
          card.classList.remove("selected");
        }
      } else {
        const index = team2.findIndex((p) => p.name === pokemon.name);
        if (index === -1) {
          if (team2.length < 3) {
            team2.push(pokemon);
            card.classList.add("selected");
          } else {
            alert("Player 2's team is full!");
          }
        } else {
          team2.splice(index, 1);
          card.classList.remove("selected");
        }
      }
    }
  
    // ***** Optional: Sort Options for the Pokémon List *****
    // (Uses the radio button values from the sort-options form)
    function sortPokemonList() {
      const criteria = document.querySelector('input[name="sort-criteria"]:checked').value;
      const method = document.querySelector('input[name="sort-method"]:checked').value;
      // For simplicity, we'll use the built-in sort and ignore the method value.
      pokemonList.sort(function (a, b) {
        if (criteria === "name") {
          return a.name.localeCompare(b.name);
        } else if (criteria === "points") {
          return a.points - b.points;
        } else if (criteria === "type") {
          // No type property available; sort by name instead.
          return a.name.localeCompare(b.name);
        }
      });
      renderPokemonGrid();
    }
    sortTeamButton.addEventListener("click", sortPokemonList);
  
    // ***** Step 2: "Next" Button – Transition from Setup to Team Selection *****
    startTeamSelectionButton.addEventListener("click", function () {
      // Read player names from input fields
      const p1 = player1Input.value.trim();
      let p2 = player2Input.value.trim();
  
      if (!p1) {
        alert("Please enter Player 1 name.");
        return;
      }
      if (isTwoPlayer && !p2) {
        alert("Please enter Player 2 name.");
        return;
      }
      if (!isTwoPlayer) {
        p2 = "CPU";
      }
      player1Name = p1;
      player2Name = p2;
  
      // Hide the player setup section and show the team selection and sort options sections
      playerSetupSection.style.display = "none";
      teamSelectionSection.style.display = "block";
      sortOptionsSection.style.display = "block";
  
      // Set current player to 1 and update the selection prompt
      currentPlayer = 1;
      currentPlayerSelection.textContent = player1Name + ", select your Pokémon";
      nextPlayerButton.style.display = "block";
  
      renderPokemonGrid();
    });
  
    // ***** Step 3: "Next Player" Button – Move from Player 1 to Player 2 or CPU *****
    nextPlayerButton.addEventListener("click", function () {
      if (currentPlayer === 1) {
        // Ensure Player 1 has at least one Pokémon selected (or require a fixed team size)
        if (team1.length === 0) {
          alert("Player 1, please select at least one Pokémon!");
          return;
        }
        if (isTwoPlayer) {
          // Switch to Player 2
          currentPlayer = 2;
          currentPlayerSelection.textContent = player2Name + ", select your Pokémon";
          renderPokemonGrid(); // re-render to show selections for Player 2 (or allow separate selections)
        } else {
          // One-player mode: auto-select team for CPU
          autoSelectCpuTeam();
          transitionToBattle();
        }
      } else if (currentPlayer === 2) {
        // Ensure Player 2 has at least one Pokémon selected
        if (team2.length === 0) {
          alert(player2Name + ", please select at least one Pokémon!");
          return;
        }
        transitionToBattle();
      }
    });
  
    // ***** Utility: Auto-Select Team for CPU (in One-Player Mode) *****
    function autoSelectCpuTeam() {
      // For simplicity, choose the first 3 Pokémon that are not already in Player 1's team.
      team2 = [];
      for (let i = 0; i < pokemonList.length && team2.length < 3; i++) {
        const p = pokemonList[i];
        if (!team1.find((pokemon) => pokemon.name === p.name)) {
          team2.push(p);
        }
      }
      alert("CPU team selected automatically!");
    }
  
    // ***** Step 4: Transition to Battle *****
    function transitionToBattle() {
      // Hide the team selection and sort options sections
      teamSelectionSection.style.display = "none";
      sortOptionsSection.style.display = "none";
  
      // Show the battle section
      battleSection.style.display = "block";
  
      // Update the battle display header—for example, show both team names
      currentTurnDisplay.textContent = "Battle: " + player1Name + " vs " + player2Name;
      // (Optionally, you can also display the teams or start battle animations here.)
    }
  });
  