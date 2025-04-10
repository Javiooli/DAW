import { initGame, handleStart, handleStop } from './modules/gameLogic.js';
import { renderMessage, renderNewTime } from './modules/domActions.js';
import { addReactionTime } from './modules/dataStore.js';

// Punt d'entrada principal

document.addEventListener('DOMContentLoaded', () => {
  initGame();

  // Botons (es poden exportar i fer-los variables globals, si cal)
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');

  // Listeners
  startBtn.addEventListener('click', () => {
    handleStart();
    renderMessage("Esperant el canvi de color...");
  });

  stopBtn.addEventListener('click', () => {
    const time = handleStop();
    if (time !== null) {
      // Guardar temps a dataStore
      addReactionTime(time);
      // Pintar a la UI
      renderNewTime(time);
      renderMessage(`Has trigat ${time} ms!`);
    }
    else{
      // el què ha de fer en cas que l'usuari premi stop abans d'hora
      renderNewTime(time);
      renderMessage(`Has premut el botó abans d'hora!`);
    }
  });
});
