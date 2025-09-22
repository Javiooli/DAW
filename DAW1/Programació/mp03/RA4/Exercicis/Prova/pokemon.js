
/*// =========================
// Inicialitzar Subclasses
// =========================
generatePokemonSubclasses().then(() =>
  console.log("Subclasses generades correctament.")
);*/

// =========================
// Exportació
// =========================
if (typeof module !== "undefined") {
  module.exports = {
    Pokemon,
    PokemonList,
    PokemonTeam,
    PokemonTeamViewModel,
  };
}
