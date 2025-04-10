import { PokemonList, PokemonTeam } from "./model.js";


// Classe que gestiona les interaccions entre la vista i el model
export class PokemonTeamViewModel {
    constructor(points) {
        this.team = new PokemonTeam(points); // Part del model que gestiona l'equip de Pokémon seleccionats
        this.list = new PokemonList(); // Part del model que conté la llista de tots els Pokémon
    }

    // Mètode per afegir un Pokémon al PokemonTeam donat el seu nom per paràmetre.
    addPokemonToTeam(name) {
        if (name != null)
            try {
                const pokemon = this.list.getPokemonByName(name);
                return this.team.addPokemon(pokemon);
            } catch(e) {
                console.error(e);
            }
    }
    
    // Mètode per eliminar un Pokémon del PokemonTeam donat el seu nom per paràmetre.
    removePokemonFromTeam(name) {
        if (name != null)
            return this.team.removePokemon(name);
    }

    // Mètode per cridar el mètode d'ordenació del PokemonList
    sortGlobalList(criteria, method) {
        if (criteria != null && method != null)
            this.list.sortPokemons(criteria, method);
    }

    // Mètode per rebre la llista sencera de tots els Pokémon
    getGlobalList() {
        return this.list;
    }

    // Mètode per anunciar els detalls de l'equip per consola.
    getTeamDetails() {
        alert(this.team.getTeamDetails());
    }

    // Mètode per recuperar la quantitat de crèdits disponibles al PokemonTeam
    getCredits() {
        return this.team.getCredits();
    }
}