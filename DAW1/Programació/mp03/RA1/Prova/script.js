const AGUA_PER_KG = 0.035;
const ACTIVITAT_FACTORS = {
    baixa: 0.0,
    moderada: 0.02,
    alta: 0.04
};


//Declaracions variables
let rawWeight, rawTemp;
let weight = 0.0;
let activity = 0;
let temperature = 0.0;
let base = 0.0;
let resultat = 0;
let resultatMostrat = false;

const TEMPERATURA_FACTOR = 0.01; // Litres addicionals per cada grau per sobre de 25°C

function calculateWater() {
    rawWeight = document.getElementById("weight").value; // Rebem el pes
    activity = document.getElementById("activity").value; // Rebem l'activitat
    rawTemp = document.getElementById("temperature").value; // Rebem la temperatura

    if(tryErrors()){ // Comprovem que no hi hagi cap error abans de procedir.
        weight = parseFloat(rawWeight); // Convertim el pes a float
        temperature = parseTemp(); // Convertim la temperatura a float i si cal li restem 25.

        base = weight * AGUA_PER_KG; // Calculem la base
        base += weight * ACTIVITAT_FACTORS[activity]; // Sumem l'extra per activitat
        resultat = base + temperature * TEMPERATURA_FACTOR * weight; // Sumem l'extra per temperatura
        displayResult(`Necessites beure ${resultat.toFixed(2)} litres d'aigua al dia.`); // Mostrem el resultat
    }
}

//Mètode per mostrar el resultat perquè no m'agrada la línia de codi, queda més net amb el mètode.
function displayResult(msg) {
    document.getElementById("resultat").innerHTML = msg;

}

// Mètode per convertir la temperatura a float, si és major de 25 li restem 25, si no retornem 0 directament.
function parseTemp() {
    temperature = parseFloat(rawTemp);
    if (temperature > 25) return temperature - 25;
    else return 0;
}

// Mètode per comprovar errors i mostrar el missatge que calgui. Retorna true si no es troba cap error.
function tryErrors() {
    weight = parseFloat(rawWeight);
    temperature = parseFloat(rawTemp);
    if (rawWeight == "" || isNaN(weight) || weight <=0) {
        displayResult("Introdueix un número vàlid al pes.");
        return false;
    }
    if (activity != "baixa" && activity != "moderada" && activity != "alta") {
        displayResult("La activitat introduïda no és una opció vàlida.");
        return false;
    }
    if (rawTemp == "" || isNaN(temperature)) {
        displayResult("Introdueix un número vàlid a la temperatura.");
        return false;
    }
    return true;
}