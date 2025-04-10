/*******************************
 * newTestModel.js (Verbose)
 *******************************/

/**
 * Utility function: safeTest
 * --------------------------
 *  - Runs a small "unit test" (a check).
 *  - If it throws, we set an error message and subtract points if needed.
 *  - Returns `true` if the check passes, or `false` if it fails.
 */
import { PokemonList, PokemonTeam } from "./js/model.js";
async function safeTest(testName, callback) {
  console.group(`Test: ${testName}`);
  try {
    await callback();
    console.log(`✔️ PASSED: ${testName}`);
    console.groupEnd();
    return true;
  } catch (error) {
    console.error(`❌ FAILED: ${testName}`);
    console.error(error);
    console.groupEnd();
    return false;
  }
}

async function newTestModel() {
  console.log("========== Iniciant les proves INTENSES i VERBOSE del model ==========\n");

  // We will keep track of how many tests succeed:
  let score = 0;
  let totalTests = 0;

  // 1. Load data from JSON
  console.log("-> [1] Carregant dades del JSON...");
  const pokemonData = await fetch("pokemon_data.json")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error carregant el JSON:", error);
      return null;
    });

  // If data fails to load, we cannot continue meaningfully.
  // We'll do a partial test but the final mark will be heavily penalized.
  totalTests++;
  if (pokemonData) {
    console.log("   Dades carregades correctament del JSON.");
    score++;
  } else {
    console.error("   No s'han pogut carregar les dades del JSON. Moltes proves fallaran.");
  }

  // 2. Create a PokemonList instance and load the data
  console.log("\n-> [2] Creant instància de PokemonList i carregant dades...");
  const pokemonList = new PokemonList();

  totalTests++;
  let listLoadTestPassed = false;
  try {
    pokemonList.loadPokemons(pokemonData || []);
    if (pokemonList.isLoaded && pokemonList.allPokemons.length > 0) {
      console.log(`   Pokémon carregats a la llista: ${pokemonList.allPokemons.length}`);
      listLoadTestPassed = true;
      score++;
    } else {
      throw new Error("La llista no està carregada correctament o està buida.");
    }
  } catch (error) {
    console.error("   Error al carregar PokémonList:", error);
  }

  // Just for verbosity, let's log the entire loaded array:
  if (listLoadTestPassed) {
    console.log("   Llista de Pokémon carregada (allPokemons):", pokemonList.allPokemons);
  }

  // 3. Sorting tests (only if list is loaded)
  if (listLoadTestPassed) {
    console.log("\n-> [3] Provant funcionalitats d'ordenació (sortPokemons)...");

    // Let’s define a battery of tests to check sorting by 'name', 'points', and 'type'
    // with each of the allowed methods: bubble, insertion, selection.
    const sortingMethods = ["bubble", "insertion", "selection"];
    const sortingCriteria = ["name", "points", "type"];

    for (const method of sortingMethods) {
      for (const criteria of sortingCriteria) {
        totalTests++;
        const testName = `Sort by ${criteria}, method: ${method}`;
        const passed = await safeTest(testName, async () => {
          // We'll clone the original data and re-load to reset the list
          pokemonList._allPokemons = [];
          pokemonList.isLoaded = false;
          pokemonList.loadPokemons(pokemonData);

          // Perform the sort
          pokemonList.sortPokemons(criteria, method);

          // Let's log the new array to be extra verbose:
          console.log("   -> Array després de l'ordenació:", pokemonList.allPokemons);

          // We'll do a small check for `name` or `points` or `type`.
          // Just ensure that after sorting, the array is in ascending order for that criteria.
          const allPokes = pokemonList.allPokemons;
          for (let i = 0; i < allPokes.length - 1; i++) {
            const current = allPokes[i];
            const next = allPokes[i + 1];
            switch (criteria) {
              case "name":
                if (current.name > next.name) {
                  throw new Error(`L'ordre per NOM no és correcte a l'índex ${i} ( '${current.name}' > '${next.name}' ).`);
                }
                break;
              case "points":
                if (current.points > next.points) {
                  throw new Error(`L'ordre per PUNTS no és correcte a l'índex ${i} ( ${current.points} > ${next.points} ).`);
                }
                break;
              case "type":
                // We'll check the .constructor.name in ascending alphabetical order
                const currType = current.constructor.name;
                const nextType = next.constructor.name;
                if (currType > nextType) {
                  throw new Error(`L'ordre per TIPUS no és correcte a l'índex ${i} ( '${currType}' > '${nextType}' ).`);
                }
                break;
            }
          }
        });
        if (passed) score++;
      }
    }
  }

  // 4. Testing PokemonTeam
  console.log("\n-> [4] Provant la classe PokemonTeam (afegir/eliminar Pokémon)...");
  totalTests++;
  let teamTestPassed = false;
  const pokemonTeam = new PokemonTeam(2000); // Start with 2000 credits
  try {
    // We'll pick some known pokemons from the list: e.g. "Charmander", "Pikachu", etc.
    console.log("   Intentant obtenir Charmander i Pikachu per fer proves...");
    const charmander = pokemonList.getPokemonByName("Charmander");
    const pikachu = pokemonList.getPokemonByName("Pikachu");
    if (!charmander || !pikachu) {
      throw new Error("No puc trobar Charmander o Pikachu per provar en la llista.");
    }

    // Add charmander
    console.log("   Afegint Charmander a l'equip...");
    pokemonTeam.addPokemon(charmander);
    
    // Re-add charmander (should fail to add it again, returning false)
    console.log("   Tornant a afegir Charmander (hauria de fallar)...");
    const addedAgain = pokemonTeam.addPokemon(charmander);
    if (addedAgain) {
      console.warn("   [WARN] Charmander s'ha tornat a afegir, però esperàvem un rebuig.");
    }

    // Add pikachu
    console.log("   Afegint Pikachu a l'equip...");
    pokemonTeam.addPokemon(pikachu);

    // Let's see the team array so far
    console.log("   Equip després d'afegir Charmander i Pikachu:", pokemonTeam.selectedTeam);

    // Remove pikachu
    console.log("   Eliminant Pikachu de l'equip...");
    pokemonTeam.removePokemon("Pikachu");

    console.log("\n   PokemonTeam després de les operacions:");
    console.log("   -> Equip actual:", pokemonTeam.getTeamDetails());
    console.log("   -> Crèdits restants:", pokemonTeam.getCredits());

    teamTestPassed = true;
    score++;
    console.log("✔️ PokemonTeam tests passats correctament.");
  } catch (error) {
    console.error("❌ Error en les proves de PokemonTeam:", error);
  }

  // 5. (Optional) More intense checks for getPokemonByName, etc.
  // We'll run a few small tests in safeTest blocks:
  console.log("\n-> [5] Proves avançades (afegir i eliminar múltiples Pokémon)...");
  totalTests++;
  const advancedTeamTest = await safeTest("Afegir i treure múltiples Pokémon de PokemonTeam", () => {
    // Create a new team
    const testTeam = new PokemonTeam(500);
    const bulbasaur = pokemonList.getPokemonByName("Bulbasaur");
    const squirtle = pokemonList.getPokemonByName("Squirtle");

    if (!bulbasaur || !squirtle) {
      throw new Error("No puc trobar Bulbasaur o Squirtle per les proves avançades.");
    }

    // Add them
    console.log("   Afegint Bulbasaur i Squirtle a l'equip de proves...");
    testTeam.addPokemon(bulbasaur);
    testTeam.addPokemon(squirtle);

    // Let's log the team array now
    console.log("   Equip de proves després d'afegir Bulbasaur i Squirtle:", testTeam.selectedTeam);

    // Attempt removing one
    console.log("   Eliminant Bulbasaur de l'equip de proves...");
    testTeam.removePokemon("Bulbasaur");

    // Check final states
    if (testTeam.selectedTeam.find(p => p.name === "Bulbasaur")) {
      throw new Error("Bulbasaur no s'ha eliminat correctament.");
    }
    if (!testTeam.selectedTeam.find(p => p.name === "Squirtle")) {
      throw new Error("Squirtle no s'ha afegit correctament.");
    }

    // Log final state of the team
    console.log("   Equip de proves final:", testTeam.selectedTeam);
  });
  if (advancedTeamTest) score++;

  // 6. Summarize all results and produce final mark
  console.log("\n-> [6] Generant informe final de proves...");

  // Let’s produce a final mark from 0 to 10
  // For each test passed, we awarded +1 to score. We'll clamp final from 0..10.
  const finalMark = Math.min(score, 10); // clamp to 10

  // Show the summary
  console.log("\n=========== INFORME FINAL ===========");
  console.log(`Total de proves: ${totalTests}`);
  console.log(`Proves superades: ${score}`);
  console.log(`Puntuació final: ${finalMark} / 10`);

  // If you want to display it on the web page as well, you can add:
  // const reportEl = document.createElement("div");
  // reportEl.innerHTML = `<h3>Resultat de les proves: ${finalMark} / 10</h3>`;
  // document.body.appendChild(reportEl);

  console.log("========== Final de les proves INTENSES i VERBOSE del model ==========");
}

// Execute the newTestModel on page load
newTestModel();
