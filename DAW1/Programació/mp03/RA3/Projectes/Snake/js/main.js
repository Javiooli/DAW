import { GameViewModel } from "./gameViewModel.js";

document.addEventListener("DOMContentLoaded", () => {
    let gameViewModel = new GameViewModel();
    
    // Listener de teclat per canviar la direcció
    document.addEventListener("keydown", (event) => {
        gameViewModel.registerKey(event.key);
    });

    window.requestAnimationFrame(gameLoop);

    function gameLoop() {//Bucle principal del joc
        let fps = gameViewModel.updateState(); //Definim la velocitat del joc en funció del que retorni updateState(), que dependrà de la puntuació.
        setTimeout(() => { window.requestAnimationFrame(gameLoop); }, 1000 / fps );
    }
  });
  