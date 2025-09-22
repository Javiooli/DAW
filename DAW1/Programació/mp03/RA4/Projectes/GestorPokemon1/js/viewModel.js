class PokemonTeamViewModel {
    constructor(team) {
        this._team = team;
    }

    //TODO
    addPokemon(name, type, points) {
        this._team.addPokemon(new Pokemon())
    }

    //TODO
    getTeamDetails() {
        alert(this._team.getTeamDetails());
    }

    //TODO
    sortTeam(criteria, method) {
        switch(method) {
            case 'bubble':
                this._team.bubbleSort(criteria);
                break;
            case 'insertion':
                this._team.insertionSort(criteria);
                break;
            case 'selection':
                this._team.selectionSort(criteria);
                break;
        }
    }
}