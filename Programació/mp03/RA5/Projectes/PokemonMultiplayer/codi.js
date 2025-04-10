import { PokemonTeamViewModel } from "./MVVM/viewModel.js";
import { PokemonUI } from "./MVVM/view.js";

// Variables globals
let credits = 200; // Crèdits inicials
const JSON_URL = './json/pokemon_data.json';

// Carrega la graella quan la pàgina s'ha carregat
document.addEventListener("DOMContentLoaded", () => {
    const viewModel = new PokemonTeamViewModel(credits);
    const vista = new PokemonUI(viewModel, JSON_URL);
    vista.init();
});
