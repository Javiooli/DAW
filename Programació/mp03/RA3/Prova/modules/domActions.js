import { getAllTimes } from './dataStore.js';

let errors = 0;

export function changeColorBox(newColor) {
  const box = document.getElementById('color-box');
  box.style.backgroundColor = newColor;
}

export function renderMessage(msg) {
  const msgElement = document.getElementById('message');
  msgElement.textContent = msg;
}

// Per poder reutilitzar codi, utilitzo aquesta mateixa funcio tant en el cas que l'intent fos exitos com en cas de premer Stop abans de temps.
// Aquesta distincio la faig segons si el parametre 'time' es null o no.
export function renderNewTime(time) {
  if (time != null) { // Si rebem temps, per tant l'intent ha sigut exitos:
    const list = document.getElementById('history-list'); // Primer declarem la llista d'intents exitosos
    while(list.firstChild) { // Mentre la llista tingui elements,
      list.removeChild(list.firstChild); // Els eliminem.
    }
    let timesArr = getAllTimes(); // Recuperem l'array de temps dels intents
    timesArr.forEach(element => { // Per cada element de l'array
      let li = document.createElement("li"); // Creem un element 'li'
      li.appendChild(document.createTextNode(element)); // Inserim el temps a l'element
      list.appendChild(li); // I inserim l'element a la llista
    });
  } else { // Si no rebem temps:
    let errorTxt = document.getElementById('error-p'); // Declarem el text amb el nombre d'intents erronis
    errors++; // Sumem 1 als errors
    errorTxt.innerHTML = `Errors: ${errors}`; // I modifiquem el text amb el nombre d'intents erronis nou
  }
}
