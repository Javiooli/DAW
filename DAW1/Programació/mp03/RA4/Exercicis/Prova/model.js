// =========================
// Classe Base: Pokemon
// =========================
class Pokemon {
  constructor(id, name, image, points, types, specialPower, description) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.points = points;
    this.types = types;
    this.specialPower = specialPower;
    this.description = description;
  }

  displayDetails() {
    return `${this.name} (ID: ${this.id}) - Points: ${this.points}`;
  }
}

// Classes heretades per cada tipus de Pokémon
class GrassPokemon extends Pokemon { }
class FirePokemon extends Pokemon { };
class WaterPokemon extends Pokemon { }
class ElectricPokemon extends Pokemon { }
class BugPokemon extends Pokemon { }
class NormalPokemon extends Pokemon { }
class PoisonPokemon extends Pokemon { }
class PsychicPokemon extends Pokemon { }
class GroundPokemon extends Pokemon { }
class FairyPokemon extends Pokemon { }
class RockPokemon extends Pokemon { }
class IcePokemon extends Pokemon { }
class DragonPokemon extends Pokemon { }
class DarkPokemon extends Pokemon { }
class SteelPokemon extends Pokemon { }
class GhostPokemon extends Pokemon { }
class FightingPokemon extends Pokemon { }
class FlyingPokemon extends Pokemon { }
// =========================
// Carregar dades del JSON. Generació dinàmica de classes
// =========================
/*async function getPokemonTypesFromData() {
  try {
    const response = await fetch("./pokemon_data.json");
    const data = await response.json();
    const uniqueTypes = [
      ...new Set(data.map((pokemon) => pokemon.class_type).filter(Boolean)),
    ];
    return uniqueTypes;
  } catch (error) {
    console.error("Error carregant tipus de Pokémon des del JSON:", error);
    return [];
  }
}*/

// =========================
// Crear Subclasses Dinàmiques
// =========================
/*async function generatePokemonSubclasses() {
  const types = await getPokemonTypesFromData();
 
  types.forEach((type) => {
    globalThis[`${type}`] = class extends Pokemon {
      constructor(id, name, image, points, specialPower) {
        super(id, name, image, points);
        this.specialPower = specialPower || `${type} Special Attack`;
      }
 
      displayDetails() {
        return `${this.name} [${type}] - Points: ${this.points}, Special Power: ${this.specialPower}`;
      }
    };
  });
}*/

// =========================
// Classe: PokemonList
// =========================
export class PokemonList {
  constructor() {
    this._allPokemons = [];
    this.isLoaded = false; // Estat per saber si s'han carregat
  }
  get allPokemons() {
    const sortedPokemons = [...this._allPokemons]; // Còpia de l'array
    return sortedPokemons;
  }
  loadPokemons(data) {
    try {
      data.map((pokemon, index) => {
        switch (pokemon.class_type) {
          case "GrassPokemon":
            this._allPokemons.push(
              new GrassPokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          case "FirePokemon":
            this._allPokemons.push(
              new FirePokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          case "WaterPokemon":
            this._allPokemons.push(
              new WaterPokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          case "ElectricPokemon":
            this._allPokemons.push(
              new ElectricPokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          case "BugPokemon":
            this._allPokemons.push(
              new BugPokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          case "NormalPokemon":
            this._allPokemons.push(
              new NormalPokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          case "PoisonPokemon":
            this._allPokemons.push(
              new PoisonPokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          case "PsychicPokemon":
            this._allPokemons.push(
              new PsychicPokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          case "GroundPokemon":
            this._allPokemons.push(
              new GroundPokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          case "FairyPokemon":
            this._allPokemons.push(
              new FairyPokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          case "RockPokemon":
            this._allPokemons.push(
              new RockPokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          case "IcePokemon":
            this._allPokemons.push(
              new IcePokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          case "DragonPokemon":
            this._allPokemons.push(
              new DragonPokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          case "DarkPokemon":
            this._allPokemons.push(
              new DarkPokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          case "SteelPokemon":
            this._allPokemons.push(
              new SteelPokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          case "GhostPokemon":
            this._allPokemons.push(
              new GhostPokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          case "FightingPokemon":
            this._allPokemons.push(
              new FightingPokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          case "FlyingPokemon":
            this._allPokemons.push(
              new FlyingPokemon(
                index + 1,
                pokemon.name,
                './images/' + pokemon.name + ".png",
                pokemon.points,
                pokemon.types,
                pokemon.special_power,
                pokemon.description
              )
            );
            break;
          default:
            console.log(`No s'ha trobat la classe ${pokemon.class_type}`);
            throw new Error(`Unknown class type: ${pokemon.class_type}`);
        }
      });
      this.isLoaded = true; // Marquem com a carregat
      console.log("Pokémon carregats correctament:", this._allPokemons.length);
    } catch (error) {
      console.error("Error carregant Pokémon des del JSON:", error);
      this.isLoaded = false;
    }
  }

  /*  loadPokemons(data) {
    try {
      this._allPokemons = data.map((pokemon, index) => {
        const { name, image, points, class_type, special_power } = pokemon;
        const imageName = name.replace(/[\s.]/g, "_") + ".png";
 
        if (globalThis[class_type]) {
          return new globalThis[class_type](
            index + 1,
            name,
            image || imageName,
            points,
            special_power
          );
        }
        return new Pokemon(index + 1, name, image || imageName, points);
      });
      this.isLoaded = true; // Marquem com a carregat
      console.log("Pokémon carregats correctament:", this._allPokemons.length);
    } catch (error) {
      console.error("Error carregant Pokémon des del JSON:", error);
      this.isLoaded = false;
    }
  }*/

  sortPokemons(criteria, method) {
    if (!this.isLoaded || this._allPokemons.length === 0) {
      console.error("❌ No tinc pokemons a la llista.");
    } else {
      if (criteria == "name" || criteria == "points" || criteria == "type" || criteria == "number_of_types") { // Afegit criteri number_of_types
        if (
          method == "bubble" ||
          method == "insertion" ||
          method == "selection"
        ) {
          //tot Ok. Comencem a ordenar
          console.log(
            `✅ Ordenat per '${criteria}' amb el mètode '${method}'.`
          );
          let len = this._allPokemons.length;
          switch (method) {
            case "bubble":
              switch (criteria) {
                case "name":
                  for (let i = 0; i < len - 1; i++) {
                    for (let j = 0; j < len - 1 - i; j++) {
                      if (
                        this._allPokemons[j].name > this._allPokemons[j + 1].name
                      ) {
                        // Intercanviem els elements si estan fora d'ordre
                        let temp = this._allPokemons[j];
                        this._allPokemons[j] = this._allPokemons[j + 1];
                        this._allPokemons[j + 1] = temp;
                      }
                    }
                  }
                  break;
                case "points":
                  for (let i = 0; i < len - 1; i++) {
                    for (let j = 0; j < len - i - 1; j++) {
                      if (
                        this._allPokemons[j].points >
                        this._allPokemons[j + 1].points
                      ) {
                        [this._allPokemons[j], this._allPokemons[j + 1]] = [
                          this._allPokemons[j + 1],
                          this._allPokemons[j],
                        ];
                      }
                    }
                  }

                  break;
                case "type":
                  for (let i = 0; i < len - 1; i++) {
                    for (let j = 0; j < len - i - 1; j++) {
                      if (
                        this._allPokemons[j].constructor.name > this._allPokemons[j + 1].constructor.name
                      ) {
                        [this._allPokemons[j], this._allPokemons[j + 1]] = [
                          this._allPokemons[j + 1],
                          this._allPokemons[j],
                        ];
                      }
                    }
                  }
                  break;
                case "number_of_types":
                  for (let i = 0; i < len - 1; i++) {
                    for (let j = 0; j < len - i - 1; j++) {
                      if (
                        this._allPokemons[j].types.length > this._allPokemons[j + 1].types.length
                      ) {
                        [this._allPokemons[j], this._allPokemons[j + 1]] = [
                          this._allPokemons[j + 1],
                          this._allPokemons[j],
                        ];
                      }
                    }
                  }
                  break;
              }
              break;
            case "insertion":
              switch (criteria) {
                case "name":
                  for (let i = 1; i < len; i++) {
                    let key = this._allPokemons[i]; // Copia l'objecte complet
                    let j = i - 1;
                    while (j >= 0 && this._allPokemons[j].name > key.name) {
                      this._allPokemons[j + 1] = this._allPokemons[j];
                      j--;
                    }
                    this._allPokemons[j + 1] = key; // Reinsereix l'objecte complet
                  }

                  break;
                case "points":
                  for (let i = 1; i < len; i++) {
                    let key = this._allPokemons[i]; // Copia l'objecte complet
                    let j = i - 1;
                    while (j >= 0 && this._allPokemons[j].points > key.points) {
                      this._allPokemons[j + 1] = this._allPokemons[j];
                      j--;
                    }
                    this._allPokemons[j + 1] = key; // Reinsereix l'objecte complet
                  }
                  break;
                case "type":
                  for (let i = 1; i < len; i++) {
                    let key = this._allPokemons[i]; // Copia l'objecte complet
                    let j = i - 1;
                    while (j >= 0 && this._allPokemons[j].constructor.name > key.constructor.name) {
                      this._allPokemons[j + 1] = this._allPokemons[j];
                      j--;
                    }
                    this._allPokemons[j + 1] = key; // Reinsereix l'objecte complet
                  }

                  break;
                case "number_of_types":
                  for (let i = 1; i < len; i++) {
                    let key = this._allPokemons[i]; // Copia l'objecte complet
                    let j = i - 1;
                    while (j >= 0 && this._allPokemons[j].types.length > key.types.length) {
                      this._allPokemons[j + 1] = this._allPokemons[j];
                      j--;
                    }
                    this._allPokemons[j + 1] = key; // Reinsereix l'objecte complet
                  }
                  break;
              }
              break;
            case "selection":
              switch (criteria) {
                case "name":
                  for (let i = 0; i < len - 1; i++) {
                    let minIndex = i; // Suposem que el mínim és el primer element no ordenat
                    for (let j = i + 1; j < len; j++) {
                      if (
                        this._allPokemons[j].name <
                        this._allPokemons[minIndex].name
                      ) {
                        minIndex = j; // Actualitzem l'índex del mínim si trobem un element més petit
                      }
                    }
                    // Intercanviar l'element actual amb el mínim trobat
                    if (minIndex !== i) {
                      let temp = this._allPokemons[i];
                      this._allPokemons[i] = this._allPokemons[minIndex];
                      this._allPokemons[minIndex] = temp;
                    }
                  }

                  break;
                case "points":
                  for (let i = 0; i < len - 1; i++) {
                    let minIndex = i; // Suposem que el mínim és el primer element no ordenat
                    for (let j = i + 1; j < len; j++) {
                      if (
                        this._allPokemons[j].points <
                        this._allPokemons[minIndex].points
                      ) {
                        minIndex = j; // Actualitzem l'índex del mínim si trobem un element més petit
                      }
                    }
                    // Intercanviar l'element actual amb el mínim trobat
                    if (minIndex !== i) {
                      let temp = this._allPokemons[i];
                      this._allPokemons[i] = this._allPokemons[minIndex];
                      this._allPokemons[minIndex] = temp;
                    }
                  }

                  break;
                case "type":
                  for (let i = 0; i < len - 1; i++) {
                    let minIndex = i; // Assume the current index has the minimum type
                    for (let j = i + 1; j < len; j++) {
                      // Compare the types (constructor names) alphabetically
                      if (
                        this._allPokemons[j].constructor.name <
                        this._allPokemons[minIndex].constructor.name
                      ) {
                        minIndex = j; // Update the minimum index if a smaller type is found
                      }
                    }
                    // Swap the current element with the minimum element found
                    if (minIndex !== i) {
                      let temp = this._allPokemons[i];
                      this._allPokemons[i] = this._allPokemons[minIndex];
                      this._allPokemons[minIndex] = temp;
                    }
                  }
                  break;
                case "type":
                  for (let i = 0; i < len - 1; i++) {
                    let minIndex = i; // Assume the current index has the minimum type
                    for (let j = i + 1; j < len; j++) {
                      // Compare the types (constructor names) alphabetically
                      if (
                        this._allPokemons[j].types.length <
                        this._allPokemons[minIndex].types.length
                      ) {
                        minIndex = j; // Update the minimum index if a smaller type is found
                      }
                    }
                    // Swap the current element with the minimum element found
                    if (minIndex !== i) {
                      let temp = this._allPokemons[i];
                      this._allPokemons[i] = this._allPokemons[minIndex];
                      this._allPokemons[minIndex] = temp;
                    }
                  }
                  break;
              }
              break;
          }
        } else {
          console.error(
            `❌ El mètode d'ordenació '${method}' no és vàlid. Tria 'bubble', 'insertion' o 'selection'.`
          );
        }
      } else {
        console.error(
          `❌ El criteri d'ordenació '${criteria}' no és vàlid. Tria 'name', 'points' o 'type'.`
        );
      }
    }
  }

  getPokemonByName(name) {
    for (let i = 0; i < this._allPokemons.length; i++) {
      if (this._allPokemons[i].name == name) {
        return this._allPokemons[i];
      }
    }
  }


  // Barreja la llista Pokemon amb l'algorisme Fisher-Yates
  shufflePokemons() {
    const mida = this._allPokemons.length - 1;
    for (let i = 0; i <= mida; i++) {
      let j = Math.floor(Math.random() * mida);
      [this._allPokemons[i], this._allPokemons[j]] = [this._allPokemons[j], this._allPokemons[i]];
    }
  }
}

// =========================
// Classe: PokemonTeam
// =========================
export class PokemonTeam {
  constructor(credits = 2000) {
    this.selectedTeam = [];
    this.credits = credits;
  }
  addPokemon(pokemon) {
    const oldPokemon = this.selectedTeam.find((oldPokemon) => oldPokemon.name === pokemon) || null;
    if (!oldPokemon) {
      this.selectedTeam.push(pokemon);
      this.credits -= pokemon.points;
      //      console.log(`Pokemon ${pokemon.name} not found in the list. Added to your team.`);
      return true;
    }
    else {
      //      console.warn(`Pokemon ${pokemon} was already in the list.`);
      return false;
    }
  }
  removePokemon(pokemonName) {
    const index = this.selectedTeam.findIndex((p) => p.name === pokemonName);
    if (index !== -1) {
      this.credits += this.selectedTeam[index].points;
      this.selectedTeam.splice(index, 1);
    }
  }

  getTeamDetails() {
    return this.selectedTeam
      .map((pokemon) => pokemon.displayDetails())
      .join("\n");
  }

  getCredits() {
    return this.credits;
  }
}

// =========================
// (Your existing classes omitted for brevity)
// =========================
//
// class Pokemon {...}
// class GrassPokemon extends Pokemon {...}
// class FirePokemon extends Pokemon {...}
// ...
