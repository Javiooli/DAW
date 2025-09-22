import { GameViewModel } from './viewModel/gameViewModel.js';

document.addEventListener('DOMContentLoaded', () => {
    const game = new GameViewModel();
    game.startGame();
});
