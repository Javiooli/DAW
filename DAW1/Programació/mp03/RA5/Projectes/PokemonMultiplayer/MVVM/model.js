// Classe que representa un Pokémon
class Pokemon {
    // Constructor que inicialitza les propietats d'un Pokémon
    constructor (id, name, image, points, types, specialPower) {
        // Assigna l'ID del Pokémon
        this._id = id;
        // Assigna el nom del Pokémon
        this._name = name;
        // Assigna la imatge del Pokémon
        this._image = image;
        // Assigna els punts del Pokémon
        this._points = points;
        // Assigna els tipus del Pokémon
        this._types = types;
        // Assigna el poder especial del Pokémon
        this._specialPower = specialPower;
    }

    // Getter per obtenir els punts del Pokémon
    get points() {
        return this._points;
    }

    // Getter per obtenir el nom del Pokémon
    get name() {
        return this._name;
    }

    // Getter per obtenir els tipus del Pokémon
    get types() {
        return this._types;
    }

    get image() {
        return this._image;
    }

    get power() {
        return this._specialPower;
    }

    // Mètode per mostrar els detalls bàsics del Pokémon (nom, ID i punts)
    displayDetails() {
        return (`${this._name} amb ID ${this._id}. Punts: ${this._points}.`);
    }

    subtractPower(power) {
        this._specialPower -= power
    }
}

// Classe que representa l'equip de Pokémon
export class PokemonTeam {
    // Constructor que inizialitza l'equip amb el seu nom
    constructor(credits) {
        this._selectedTeam = [];  // Inicialitza un array buit per als Pokémon de l'equip
        this._credits = credits;
        this.maxTeamSize = 6;
    }

    get selectedTeam() {
        const equip = [...this._selectedTeam];
        return equip;
    }

    // Mètode per afegir un Pokémon a l'equip
    addPokemon(pokemon, isPlayer) {
        if (pokemon && pokemon.points <= this._credits) {
            if (this._selectedTeam.find(p => p.name === pokemon.name) === undefined) { // Comprovem que entra pokémon per paràmetre, que tenim punts suficients i que el pokémon no es trobi ja a l'equip.
                this._credits -= pokemon.points; // Restem els crèdits que val el Pokémon
                this._selectedTeam.push(pokemon); // Afegim el Pokémon a l'equip
                console.log(`\n${pokemon.name} afegit a l'equip.`);
                return true; // Retornem true per que al TestModel s'enviï el missatge correcte
            }
        } else if (isPlayer){
            alert("Crèdits insuficients.");
        }
        
        return false; // En cas que no s'hagi entrat cap Pokémon, retornem false per que al TestModel s'enviï el missatge d'error
    }




    // Mètode que elimina un Pokémon de l'equip donat el seu nom
    removePokemon(name) {
        for (let i = 0; i < this._selectedTeam.length; i++) { // Recorrem tota la llista de l'equip
            if (name.toLowerCase() === this._selectedTeam[i].name.toLowerCase()) { // En cas que el nom coincideixi sumem els crèdits, eliminem el Pokémon de l'equip i enviem missatge per consola.
                this._credits += this._selectedTeam[i].points;
                this._selectedTeam.splice(i, 1);
                console.log(`\n${name} eliminat de l'equip.`);
                return true;
            }
        }

        console.error(`Pokémon ${name} no trobat a l'equip.`); // En cas que no s'elimini cap Pokémon de l'equip, enviem missatge d'error per consola.
        return false;
    }

    // Mètode per obtenir els detalls de l'equip (detalls de cada Pokémon)
    getTeamDetails() {
        let teamDetails = '\n'; // String per emmagatzemar els detalls de l'equip
        let i = 1; // Comptador per numerar els Pokémon
        this._selectedTeam.forEach(pokemon => {
            teamDetails += (`${i}. ${pokemon.displayDetails()}\n`); // Concatenem els detalls de cada Pokémon
            i++; // Incrementa el comptador
        });
        return teamDetails; // Retorna els detalls de tots els Pokémon de l'equip
    }

    getCredits() {
        return this._credits;
    }

    

}

// Classe per gestionar la llista de Pokémon emmagatzemada en l'arxiu JSON
export class PokemonList {
    // Constructor que inicialitza la llista de Pokémon i les classes de Pokémon
    constructor() {
        this._allPokemons = []; // Llista de tots els Pokémon
        this._PokemonClasses = {}; // Objecte per emmagatzemar les classes per tipus
        this.isLoaded = false;
    }

    get allPokemons(){
        const sortedPokemons = [...this._allPokemons]; // Còpia completa de l'array, que serà el que retorna el getter.
        return sortedPokemons;
    }

    // Mètode per carregar els Pokémon des de la llista de l'arxiu JSON
    loadPokemons(pokemons) {
        if (pokemons) { // Si la llista de Pokémon no és buida
            // Crea una classe dinàmica per cada tipus de Pokémon
            try {
                pokemons.forEach(({ class_type }) => {
                    if (!this._PokemonClasses[class_type]) { // Si la classe per aquest tipus no existeix
                        this._PokemonClasses[class_type] = class extends Pokemon { // Crea una nova classe
                            constructor(id, name, image, points, types, specialPower) {
                                super(id, name, image, points, types, specialPower); // Crida al constructor de la classe base
                            }

                            // Mètode per mostrar els detalls del Pokémon amb el tipus
                            displayDetails() {
                                const baseDetails = super.displayDetails(); // Obté els detalls bàsics del Pokémon
                                return `Pokemon tipus ${this._types}: ${baseDetails}`;  // Retorna els detalls amb el tipus
                            }
                        }

                        // Assignem el nom de la classe
                        Object.defineProperty(this._PokemonClasses[class_type], 'name', {
                            value: class_type,
                            writable: false
                        });
                    }
                });

                // Crea instàncies de les classes per cada Pokémon
                pokemons.forEach(pokemon => {
                    const PokemonClass = this._PokemonClasses[pokemon.class_type]; // Obté la classe per aquest tipus de Pokémon
                    const instancia = new PokemonClass(
                        this._allPokemons.length, // Assigna un ID únic
                        pokemon.name, // Assigna el nom
                        pokemon.name.replace(/ /g, "_") + ".png", // Assigna la imatge
                        pokemon.points, // Assigna els punts
                        pokemon.types, // Assigna els tipus
                        pokemon.special_power // Assigna el poder especial
                    );
                    this._allPokemons.push(instancia); // Afegeix la instància a la llista de Pokémon
                });


                this.isLoaded = true; // Canviem la propietat per marcar que la llista ha carregat.
                console.log("Dades carregades:", this._allPokemons);
                return true;

            } catch (error) {
                console.error(error);
            }

        } else console.error("No s'ha carregat cap llista de Pokémon vàlida."); // Si no s'ha carregat cap llista, mostra una alerta d'error
        return false;
    }

    // Mètode per rebre l'objecte Pokémon a partir d'un nom donat. Retorna el Pokémon si el troba o false si no.
    getPokemonByName(name) {
        if (name) {
            for (let i = 0; i < this._allPokemons.length; i++) { // Recorrem la llista  de tots els Pokémon
                if (this._allPokemons[i].name.toLowerCase() === name.toLowerCase()) { // En cas que el nom coincideixi amb la posició actual de la llista, retornem l'objecte
                    return _.cloneDeep(this._allPokemons[i]);
                }
            };
        }
        
        return false;
    }

    // Mètode que crida el mètode d'ordenació corresponent depenent del paràmetre "method"
    sortPokemons(criteria, method) {
        if (this.isLoaded && criteria && method) { // Comprovem si la llista de Pokémon s'ha carregat i que s'introdueixen criteri i mètode.
            try {
                switch(method) {
                    case 'bubble': // En cas que el mètode d'ordenació sigui bubble sort, cridem el mètode bubbleSort()
                        return this.bubbleSort(criteria);
                    case 'insertion': // En cas que el mètode d'ordenació sigui insertion sort, cridem el mètode insertionSort()
                        return this.insertionSort(criteria);
                    case 'selection': // En cas que el mètode d'ordenació sigui selection sort, cridem el mètode selectionSort()
                        return this.selectionSort(criteria);
                    default: // En cas que el paràmetre method no coincideixi amb cap dels anteriors, enviem missatge d'error
                        console.error("Mètode no vàlid.");
                        return;
                }
            } catch (error) 
                {   console.error(error);   }
        }
        
        // Missatges d'error en cas de ser necessaris
        if (!this.isLoaded)
            console.error("No hi ha cap llista carregada.");
        if (!criteria)
            console.error("No s'ha introduït cap criteri.");
        if (!method)
            console.error("No s'ha introduït cap mètode.");
    }

    // Mètode per ordenar els Pokémon mitjançant l'algorisme de "bubble sort"
    bubbleSort(criteria) {
        // Ordena els Pokémon en funció del criteri (tipus, nom o punts)
        let array = this._allPokemons;
        switch (criteria) {
            case 'type': // Ordenar per tipus
                for (let i = 1; i < array.length; i++) {  // Itera a través de la llista, començant des del segon element
                    for (let j = 0; j < (array.length - i); j++) {  // Itera des del primer element fins a l'element que s'ha d'ordenar
                        if (array[j].constructor.name > array[j+1].constructor.name) {  // Compara els tipus dels dos Pokémon consecutius
                            [array[j], array[j+1]] = [array[j+1], array[j]];  // Si l'element a l'esquerra és més gran que el de la dreta, els intercanvia utilitzant desestructuració d'arrays
                        }
                    }
                }
                break;

            case 'name': // Ordenar per nom
                for (let i = 1; i < array.length; i++) {  // Itera a través de la llista, començant des del segon element
                    for (let j = 0; j < (array.length - i); j++) {  // Itera des del primer element fins a l'element que s'ha d'ordenar
                        if (array[j].name.toLowerCase() > array[j+1].name.toLowerCase()) {  // Compara els noms dels dos Pokémon consecutius
                            [array[j], array[j+1]] = [array[j+1], array[j]];  // Si l'element a l'esquerra té un nom més gran que el de la dreta, els intercanvia utilitzant desestructuració d'arrays
                        }
                    }
                }
                break;

            case 'points': // Ordenar per punts
                for (let i = 1; i < array.length; i++) {  // Itera a través de la llista, començant des del segon element
                    for (let j = 0; j < (array.length - i); j++) {  // Itera des del primer element fins a l'element que s'ha d'ordenar
                        if (array[j].points > array[j+1].points) {  // Compara els punts dels dos Pokémon consecutius
                            [array[j], array[j+1]] = [array[j+1], array[j]];  // Si l'element a l'esquerra té més punts que el de la dreta, els intercanvia utilitzant desestructuració d'arrays
                        }
                    }
                }
                break;

            default: // En cas que el paràmetre criteria no coincideixi amb cap dels anteriors, enviem missatge d'error
                console.error("Criteri no vàlid.");
                break;
        }
        this._allPokemons = array;
        return array;
    }

    
    // Mètode per ordenar els Pokémon mitjançant l'algorisme de "insertion sort"
    insertionSort(criteria) {    
        let array = this._allPokemons;
        // Ordena els Pokémon en funció del criteri (tipus, nom o punts)
        switch (criteria) {
            case 'type':  // Ordenar per tipus
                for (let i = 1; i < array.length; i++) {  // Comença des del segon element
                    let key = array[i];  // Emmagatzema l'element actual que es vol inserir en la part ordenada
                    let j = i - 1;  // Comença a comparar des de l'element anterior
    
                    // Mentre l'element anterior sigui més gran que l'element actual, mou els elements cap endavant
                    while (j >= 0 && array[j].constructor.name > key.constructor.name) {
                        array[j + 1] = array[j];  // Mou l'element cap endavant
                        j = j - 1;  // Desplaça el índex cap a l'esquerra
                    }
                    array[j + 1] = key;  // Insereix l'element en la seva posició correcta
                }
                break;
    
            case 'name':  // Ordenar per nom
                for (let i = 1; i < array.length; i++) {  // Comença des del segon element
                    let key = array[i];  // Emmagatzema l'element actual que es vol inserir en la part ordenada
                    let j = i - 1;  // Comença a comparar des de l'element anterior
    
                    // Mentre l'element anterior tingui un nom més gran que l'element actual, mou els elements cap endavant
                    while (j >= 0 && array[j].name.toLowerCase() > key.name.toLowerCase()) {
                        array[j + 1] = array[j];  // Mou l'element cap endavant
                        j = j - 1;  // Desplaça el índex cap a l'esquerra
                    }
                    array[j + 1] = key;  // Insereix l'element en la seva posició correcta
                }
                break;
    
            case 'points':  // Ordenar per punts
                for (let i = 1; i < array.length; i++) {  // Comença des del segon element
                    let key = array[i];  // Emmagatzema l'element actual que es vol inserir en la part ordenada
                    let j = i - 1;  // Comença a comparar des de l'element anterior
    
                    // Mentre l'element anterior tingui més punts que l'element actual, mou els elements cap endavant
                    while (j >= 0 && array[j].points > key.points) {
                        array[j + 1] = array[j];  // Mou l'element cap endavant
                        j = j - 1;  // Desplaça el índex cap a l'esquerra
                    }
                    array[j + 1] = key;  // Insereix l'element en la seva posició correcta
                }
                break;

            default: // En cas que el paràmetre criteria no coincideixi amb cap dels anteriors, enviem missatge d'error
                console.error("Criteri no vàlid.");
                break;
        }
        this._allPokemons = array;
        return array;
    }
    

    // Mètode per ordenar els Pokémon mitjançant l'algorisme de "selection sort"
    selectionSort(criteria) {
        let array = this._allPokemons;
        let n = array.length; // Obté la longitud de la llista de Pokémon per saber fins on iterar

        // Ordena els Pokémon en funció del criteri (tipus, nom o punts)
        switch (criteria) {
            case 'type':  // Ordenar per tipus
                // Itera per cada element de la llista
                for (let i = 0; i < n - 1; i++) {
                    let min_idx = i; // Assumeix que l'element actual és el mínim

                    // Compara el tipus de cada Pokémon restant amb el mínim trobat fins ara
                    for (let j = i + 1; j < n; j++) {
                        // Compara els tipus de Pokémon en minúscules per assegurar la comparació no sensible a majúscules
                        if (array[j].constructor.name < array[min_idx].constructor.name) {
                            min_idx = j; // Actualitza l'índex del mínim si es troba un tipus més petit
                        }
                    }

                    // Intercanvia l'element actual amb el mínim trobat
                    let temp = array[i];
                    array[i] = array[min_idx];
                    array[min_idx] = temp;
                }
                break;

            case 'name':  // Ordenar per nom
                // Itera per cada element de la llista
                for (let i = 0; i < n - 1; i++) {
                    let min_idx = i; // Assumeix que l'element actual és el mínim

                    // Compara el nom de cada Pokémon restant amb el mínim trobat fins ara
                    for (let j = i + 1; j < n; j++) {
                        // Compara els noms de Pokémon en minúscules per assegurar la comparació no sensible a majúscules
                        if (array[j].name.toLowerCase() < array[min_idx].name.toLowerCase()) {
                            min_idx = j; // Actualitza l'índex del mínim si es troba un nom més petit
                        }
                    }

                    // Intercanvia l'element actual amb el mínim trobat
                    let temp = array[i];
                    array[i] = array[min_idx];
                    array[min_idx] = temp;
                }
                break;

            case 'points':  // Ordenar per punts
                // Itera per cada element de la llista
                for (let i = 0; i < n - 1; i++) {
                    let min_idx = i; // Assumeix que l'element actual és el mínim

                    // Compara els punts de cada Pokémon restant amb el mínim trobat fins ara
                    for (let j = i + 1; j < n; j++) {
                        // Compara els punts de Pokémon de manera numèrica
                        if (array[j].points < array[min_idx].points) {
                            min_idx = j; // Actualitza l'índex del mínim si es troba un nombre de punts més petit
                        }
                    }

                    // Intercanvia l'element actual amb el mínim trobat
                    let temp = array[i];
                    array[i] = array[min_idx];
                    array[min_idx] = temp;
                }
                break;

            default: // En cas que el paràmetre criteria no coincideixi amb cap dels anteriors, enviem missatge d'error
                console.error("Criteri no vàlid.");
                break;
        }
        this._allPokemons = array;
        return array;
    }
}

// Classe que representa un jugador, amb el seu equip i la gestió d'aquest
export class Player {
    constructor(name, credits) {
        this.name = name;
        this.team = new PokemonTeam(credits);
    }

    getName() {
        return this.name;
    }

    addPokemon(pokemon, theresCPU) {
        return this.team.addPokemon(pokemon, theresCPU);
    }

    removePokemon(pokemonName) {
        return this.team.removePokemon(pokemonName);
    }

    getTeamDetails() {
        return this.team.getTeamDetails();
    }

    getCredits() {
        return this.team.getCredits();
    }

    //TODO
    attack(target) {

    }
}