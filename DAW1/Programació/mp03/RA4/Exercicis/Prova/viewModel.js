import { PokemonList, PokemonTeam } from "./model.js";  // class PokemonList {...}
  // class PokemonTeam {...}
  //
  // =========================
  // Classe: PokemonTeamViewModel
  // =========================
  
  // =========================
  // Classe: PokemonTeamViewModel
  // =========================
  // UML Requirements:
  //  - team: PokemonTeam
  //  - pokemonList: PokemonList
  //  - addPokemonToTeam(name: string): void
  //  - removePokemonFromTeam(name: string): void
  //  - sortGlobalList(criteria: string, method: string): void
  //  - getGlobalList(): List<Pokemon>
  //  - getTeamDetails(): string
  //  - getCredits(): int
  
export class PokemonTeamViewModel {
  constructor() {
    // These attributes must exist per UML
    this.team = new PokemonTeam();
    this.pokemonList = new PokemonList();
  }

  /**
   * Add a Pokémon to the team by name.
   * If it doesn't exist in the global list, log an error.
   * If not enough credits, log an error.
   * If already on the team, it won't add again.
   */
  addPokemonToTeam(name) {
    const pokemon = this.pokemonList.getPokemonByName(name);
    if (!pokemon) {
      console.error("❌ Pokémon not found in the global list.");
      return;
    }

    if (this.team.getCredits() < pokemon.points) {
      console.error("❌ Not enough credits to add this Pokémon!");
      return;
    }

    const success = this.team.addPokemon(pokemon);
    if (!success) {
      console.warn(`⚠️ The Pokémon ${pokemon.name} is already on the team.`);
    }
  }

  /**
   * Remove a Pokémon from the team by name.
   */
  removePokemonFromTeam(name) {
    this.team.removePokemon(name);
  }

  /**
   * Sort the global list by given criteria and method.
   * ('name', 'points', 'type') + ('bubble', 'insertion', 'selection')
   */
  sortGlobalList(criteria, method) {
    this.pokemonList.sortPokemons(criteria, method);
  }

  /**
   * Returns the "raw" array of Pokémon (the global list).
   * We return the actual list of Pokemon objects,
   * though your UML says "List<Pokemon>"—that’s effectively an array in JS.
   */
  getGlobalList() {
    // The UML says "List<Pokemon>", so we return the array of Pokemon objects
    return this.pokemonList.allPokemons;
  }

  /**
   * Returns a string describing the current team (like "Bulbasaur\nCharmander\n...").
   * In your real UI, you may not strictly need this, but it’s in the UML.
   */
  getTeamDetails() {
    return this.team.getTeamDetails();
  }

  /**
   * Returns the current credits remaining.
   */
  getCredits() {
    return this.team.getCredits();
  }


  // Barreja la llista de pokemon
  shufflePokemons() {
    this.pokemonList.shufflePokemons();
  }
}


