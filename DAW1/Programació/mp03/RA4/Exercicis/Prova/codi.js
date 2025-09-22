import { PokemonUI } from "./view.js";
import { PokemonTeamViewModel } from "./viewModel.js";
// Instantiate your ViewModel (matching UML exactly)
const viewModel = new PokemonTeamViewModel();

// Instantiate your UI class, passing the ViewModel
const ui = new PokemonUI(viewModel);

// When DOM is ready, initialize everything
document.addEventListener("DOMContentLoaded", () => {
  ui.init();
});
