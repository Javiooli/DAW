// Definició de la classe
class Conversor {

    static celsiusAFahrenheit(celsius) {
        return ((celsius * 9/5) + 32).toFixed(2);
    }
    static fahrenheitACelsius(fahrenheit) {
        return ((fahrenheit - 32) * 5/9).toFixed(2);
    }
}

function calcular() {
    let celsius, fahrenheit;
    celsius = document.getElementById("celsius").value;
    fahrenheit = document.getElementById("fahrenheit").value;

    if (isNaN(parseFloat(fahrenheit)) && isNaN(parseFloat(celsius))) document.getElementById("resultat").innerHTML = "Introdueix un valor vàlid.";
    else if (celsius != "" && fahrenheit != "") document.getElementById("resultat").innerHTML = "Introdueix només un valor.";
    else {
        if (celsius == "") document.getElementById("resultat").innerHTML = `${fahrenheit}ºF són ${Conversor.fahrenheitACelsius(fahrenheit)}ºC.`;
        else document.getElementById("resultat").innerHTML = `${celsius}ºC són ${Conversor.celsiusAFahrenheit(celsius)}ºF.`;
        document.getElementById("celsius").value = '';
        document.getElementById("fahrenheit").value = '';
    }
}