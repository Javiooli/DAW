import { changeColorBox } from './domActions.js';


let startTime = null;
let timeoutId = null;

export function initGame() {
  // Configuracions inicials... -> que no he hagut de fer
}

export function handleStart() {
  // Reiniciem startTime i per si aquest intent fos erroni, no tenir problemes al passar un startTime que no fos 'null'.
  startTime = null;
  // TODO:
  // 1. Deshabilitar botó START i habilitar STOP
  let startBtn = document.getElementById('start-btn'); // Declarem els dos botons
  let stopBtn = document.getElementById('stop-btn');
  startBtn.disabled = true; // Desactivem el de Start i activem el de Stop
  stopBtn.disabled = false;
  // 2. Generar un temps aleatori (1s - 4s)
  let randomTime = Math.random() * 4000;
  // 3. Fer un setTimeout que, passats aquests segons, canviï el color (#color-box)
  //    i guardi el moment (Date.now()) a startTime.
  let colors = ["red", "green", "blue"]; // Array amb els tres colors bàsics per després canviar el color de la caixa per un d'aquests aleatòriament
  let colorBox = document.getElementById('color-box'); // Declarem la caixa de color
  let randomColor = Math.floor(Math.random() * 3); // Generem un Int de 0 a 2 per escollir aleatòriament el color

  // 4. Guardar el timeoutId per poder gestionar-lo si cal.
  timeoutId = setTimeout(() => {
    changeColorBox(colors[randomColor]); // Canviem el color de la caixa
    startTime = Date.now(); // Gravem el moment a startTime
  }, randomTime);
}

export function handleStop() {
  // TODO:
  // 1. Si s'ha fet el canvi de color (startTime != null),
  //    calcular la diferència entre Date.now() i startTime.
  let diferencia = null;
  if (startTime != null) { // Si tenim startTime, calculem la diferencia
    diferencia = Date.now() - startTime;
  } else { // Si no, eliminem el timeout per que no es posi de cap color la capsa ni comptem ni res.
    clearTimeout(timeoutId);
  }
  // 2. Restaurar l'estat del joc (botons, color, etc.)
  let startBtn = document.getElementById('start-btn'); // Declarem els tres elements a reiniciar
  let stopBtn = document.getElementById('stop-btn');
  let colorBox = document.getElementById('color-box');

  startBtn.disabled = false; // Tornem a activar el boto de Start, desactivem el de Stop i tornem a posar la caixa en gris
  stopBtn.disabled = true;
  colorBox.style.backgroundColor = "grey";
  // 3. Retornar el temps de reacció o null si s'ha premut abans d'hora.
  return diferencia; // Diferencia es null si s'ha premut abans d'hora
}
