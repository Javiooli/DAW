import { PokemonList, PokemonTeam, Player } from "./model.js";


// Classe que gestiona les interaccions entre la vista i el model
export class PokemonTeamViewModel {
    constructor(credits) {
        this.player1 = null;
        this.player2 = null;
        this.currentPlayer = null;
        this.team = new PokemonTeam(credits); // Part del model que gestiona l'equip de Pokémon seleccionats
        this.pokemonList = new PokemonList(); // Part del model que conté la llista de tots els Pokémon
    }

    initializeMatch(player1Name, player2Name) {
        const credits = this.team.getCredits();
        this.player1 = new Player(player1Name, credits);
        this.player2 = new Player(player2Name, credits);
        this.currentPlayer = this.player1;
        // alert("Hi ha " + this.pokemonList.allPokemons.length + " Pokemon.");
    }

    switchPlayer(theresCPU) {
        if ((this.currentPlayer == null || this.currentPlayer == this.player2)) {
            this.currentPlayer = this.player1;

        } else if (!theresCPU) {
            this.currentPlayer = this.player2;

        } else {
            this.autoSelectCpuTeam();
        }
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    areTeamsComplete() {
        if (this.player1.team.length == this.player1.team.maxTeamSize && this.player2.team.length == this.player2.team.maxTeamSize)
            return true;
        else
            return false;
    }

    // Mètode per afegir un Pokémon al PokemonTeam donat el seu nom per paràmetre.
    addPokemonToTeam(name) {
        if (name != null)
            try {
                const pokemon = this.pokemonList.getPokemonByName(name);
                return this.currentPlayer.addPokemon(pokemon, this.currentPlayer.name == "CPU" ? false : true);
            } catch(e) {
                console.error(e);
            }
    }
    
    // Mètode per eliminar un Pokémon del PokemonTeam donat el seu nom per paràmetre.
    removePokemonFromTeam(name) {
        if (name != null)
            return this.currentPlayer.removePokemon(name);
    }

    // Mètode per cridar el mètode d'ordenació del PokemonList
    sortGlobalList(criteria, method) {
        if (criteria != null && method != null)
            this.pokemonList.sortPokemons(criteria, method);
    }

    // Mètode per rebre la llista sencera de tots els Pokémon
    getGlobalList() {
        return this.pokemonList;
    }

    // Mètode per anunciar els detalls de l'equip per consola.
    getTeamDetails() {
        alert(this.currentPlayer.getTeamDetails());
    }

    // Mètode per recuperar la quantitat de crèdits disponibles al PokemonTeam
    getCredits() {
        return this.currentPlayer.getCredits();
    }

    setPlayerNames(player1Name, player2Name) {
        if (player1Name)
            this.player1.name = player1Name;
        if (player2Name)
            this.player2.name = player2Name;
    }

    autoSelectCpuTeam() {
        if (this.player2.getName() == "CPU") {
            let iter = 0;
            this.currentPlayer = this.player2;
            const starterCredits = this.player2.getCredits();
            const pokemonList = [...this.pokemonList.sortPokemons('points', 'selection')];
            let availablePokemon = pokemonList.length - 1;
            while (this.player2.getCredits() >= 10 && this.player2.team.selectedTeam.length < this.player2.team.maxTeamSize) {
                iter ++
                let pokeIndex = Math.floor(Math.random() * availablePokemon);
                if (!this.addPokemonToTeam(pokemonList[pokeIndex].name)) {
                    availablePokemon = availablePokemon * (this.player2.getCredits() / starterCredits);
                }
            }
            console.log(`${iter} iteracions per generar l'equip.`);
        }
    }

    async startBattle() {
        return this.fightRound();
    }

    async fightRound() {
        if (this.player1.team.selectedTeam.length < 1 || this.player2.team.selectedTeam.length < 1) return true;
        let loser = 0;

        const player1Fighter = await this.getRandomFighter(this.player1.team);
        const player2Fighter = await this.getRandomFighter(this.player2.team);

        if (player1Fighter.power == player2Fighter.power) loser = 3;
        else loser = (player1Fighter.power > player2Fighter.power ? 1 : 2);

        switch (loser) {
            case 1:
                this.player1.team.selectedTeam.forEach(pokemon => {
                    if (pokemon.name == player1Fighter.name)
                        pokemon.subtractPower(player2Fighter.power)
                });
                this.player2.team.removePokemon(player2Fighter.name);
                alert(`El ${player1Fighter.name} de ${this.player1.getName()} ha debilitat el ${player2Fighter.name} de ${this.player2.getName()}!`);
                break;
            case 2:
                this.player2.team.selectedTeam.forEach(pokemon => {
                    if (pokemon.name == player2Fighter.name)
                        pokemon.subtractPower(player1Fighter.power)
                });                
                this.player1.team.removePokemon(player1Fighter.name);
                alert(`El ${player2Fighter.name} de ${this.player2.getName()} ha debilitat el ${player1Fighter.name} de ${this.player1.getName()}!`);
                break;
            case 3:
                let restar = Math.floor(player1Fighter.power/2);
                this.player1.team.selectedTeam.forEach(pokemon => {
                    if (pokemon.name == player1Fighter.name)
                        pokemon.subtractPower(restar)
                });
                this.player2.team.selectedTeam.forEach(pokemon => {
                    if (pokemon.name == player2Fighter.name)
                        pokemon.subtractPower(restar)
                }); 
                alert(`El ${player1Fighter.name} de ${this.player1.getName()} i el ${player2Fighter.name} de ${this.player2.getName()} han empatat!`);
                break;
        }

        if (this.player1.team.selectedTeam.length < 1) {
            alert (`Guanya ${this.player2.getName()}!`);
            return true;
        } else if (this.player2.team.selectedTeam.length < 1) {
            alert (`Guanya ${this.player1.getName()}!`);
            return true;
        } else
            return false;


        
    }

    getRandomFighter(team) {
        const teamRange = team.selectedTeam.length - 1;
        return team.selectedTeam[Math.floor(Math.random() * teamRange)]
    }
}