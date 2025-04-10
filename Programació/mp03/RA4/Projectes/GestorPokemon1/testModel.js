// Importa les classes (en un entorn Node.js) o assegura que estan disponibles al navegador
import { PokemonList, PokemonTeam } from "./js/model.js";

// Funció principal per provar les funcionalitats del model
async function testModel() {
    console.log("Iniciant les proves del model...");

    // 1. Carrega les dades del JSON
    const pokemonData = await fetch("pokemon_data.json")
        .then(response => response.json())
        .catch(error => console.error("Error carregant el JSON:", error));

    console.log("Dades carregades:", pokemonData);

    // 2. Crea una instància de PokemonList i carrega els Pokémon
    const pokemonList = new PokemonList();
    pokemonList.loadPokemons(pokemonData);

    console.log("Pokémon disponibles al llistat global:");
    console.log(pokemonList.allPokemons);

    // 3. Ordena el llistat global
    console.log("\nOrdenant Pokémon per nom (Bombolla):");
    pokemonList.sortPokemons("name", "bubble");
    console.log(pokemonList.allPokemons);

    console.log("\nOrdenant Pokémon per punts (Inserció):");
    pokemonList.sortPokemons("points", "insertion");
    console.log(pokemonList.allPokemons);

    console.log("\nOrdenant Pokémon per tipus (Selecció):");
    pokemonList.sortPokemons("type", "selection");
    console.log(pokemonList.allPokemons);

    // 4. Crea una instància de PokemonTeam
    const pokemonTeam = new PokemonTeam(2000); // L'equip té 2000 crèdits inicials

    console.log("\nAfegint Pokémon a l'equip:");
    const charmander = pokemonList.getPokemonByName("Charmander");
    if (pokemonTeam.addPokemon(charmander)) {
        console.log("Charmander afegit a l'equip.");
    } else {
        console.log("No s'ha pogut afegir Charmander (crèdits insuficients).");
    }

    const pikachu = pokemonList.getPokemonByName("Pikachu");
    if (pokemonTeam.addPokemon(pikachu)) {
        console.log("Pikachu afegit a l'equip.");
    } else {
        console.log("No s'ha pogut afegir Pikachu (crèdits insuficients).");
    }

    console.log("\nCrèdits restants:", pokemonTeam.getCredits());
    console.log("Equip seleccionat:", pokemonTeam.getTeamDetails());

    console.log("\nEliminant Pikachu de l'equip:");
    pokemonTeam.removePokemon("Pikachu");
    console.log("Equip seleccionat després de l'eliminació:", pokemonTeam.getTeamDetails());
    console.log("Crèdits restants després de l'eliminació:", pokemonTeam.getCredits());
}

// Executa les proves
testModel();
