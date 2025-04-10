const PI = 3.14159265;

function calcularArea() {
    //Agafem el valor introduït per l'usuari
    let radi = parseInt(document.getElementById("radi").value);

    //Convertim el valor a número i calculem l'àrea
    if (radi > 0) {
        let area = PI * radi * radi;

        //Canviem el color del resultat depenent de l'àrea del cercle.
        setColor(area);
        //Mostrem el resultat a la pàgina
        document.getElementById("resultat").innerHTML =
            "L'àrea del cercle és: " + area.toFixed(2) + " m<sup>2</sup>.";

    } else if (isNaN(radi)) {//Entrada no és un número vàlid
        document.getElementById("resultat").innerHTML = 
            "Si us plau, introdueix un número.";

    } else {//En aquest cas l'usuari ha introduït un número <= 0
        document.getElementById("resultat").innerHTML = 
            "Si us plau, introdueix un número superior a 0.";
    }
}

function setColor(area) {
    if (area < 100) {
        document.getElementById("resultat").style = "color: green;";
        return;
    }
    if (area < 200) {
        document.getElementById("resultat").style = "color: yellow;"
        return;
    }
    document.getElementById("resultat").style = "color: red;"
}