// Definició de la classe
class Rectangle {
    constructor(amplada, altura) {
        this.amplada = amplada; // Atribut marca de l'objecte
        this.altura = altura; // Atribut model de l'objecte
    }

    area() {
        return this.amplada * this.altura; // Retorna l'àrea del rectangle multiplicant l'amplada per l'altura.
    }

    perimetre() {
        return 2 * (this.amplada + this.altura); // Retorna el perímetre del rectangle multiplicant per dos la suma de l'amplada per l'altura.
    }
}

function calcArea() {
/*  Declaració variables. rawWeight i rawHeight son les cadenes de text rebudes dels dos camps a omplir a la pàgina.
    weight i height són les conversions a Float d'aquestes cadenes de text.*/
    let rawAmplada = document.getElementById("amplada").value;
    let rawAltura = document.getElementById("altura").value;
    let amplada = parseFloat(rawAmplada);
    let altura = parseFloat(rawAltura);

    //Comencem les comprovacions en cas d'error i enviem el missatge d'error al mètode canviarResultat().
    if (rawAmplada == "" && rawAltura == "") alert ("Introdueix números vàlids a l'amplada i l'altura.");
    else if (rawAmplada == "") alert ("Introdueix un número vàlid a l'amplada.");
    else if (rawAltura == "") alert ("Introdueix un número vàlid a l'altura.");
    else if (amplada <= 0 && altura <= 0) alert ("L'amplada i l'altura introduïts són iguals o menors que 0.");
    else if (amplada <= 0) alert ("L'amplada introduïda és igual o menor que 0.");
    else if (altura <= 0) alert ("L'altura introduïda és igual o menor que 0.");
    else if (amplada > 0 && altura > 0) { /* Aquest últim cas, després de comprovar que no s'hagi donat error, comprova que els valors
                                                siguin vàlids només per curar-nos en salut.*/
        let rect1 = new Rectangle(amplada, altura);
        let area = rect1.area();
        document.getElementById("resultat").innerHTML = `L'àrea és ${area} metres.`;

    } else alert ("Error desconegut.");/*  En cas de no haver detectat l'error, i encara i així rebre valors que no compleixen amb les nostres
                                                        condicions, enviem un missatge d'error genèric.*/
}

function calcPerimetre() {
    /*  Declaració variables. rawWeight i rawHeight son les cadenes de text rebudes dels dos camps a omplir a la pàgina.
    weight i height són les conversions a Float d'aquestes cadenes de text.*/
    let rawAmplada = document.getElementById("amplada").value;
    let rawAltura = document.getElementById("altura").value;
    let amplada = parseFloat(rawAmplada);
    let altura = parseFloat(rawAltura);

    //Comencem les comprovacions en cas d'error i enviem el missatge d'error al mètode canviarResultat().
    if (rawAmplada == "" && rawAltura == "") alert ("Introdueix números vàlids a l'amplada i l'altura.");
    else if (rawAmplada == "") alert ("Introdueix un número vàlid a l'amplada.");
    else if (rawAltura == "") alert ("Introdueix un número vàlid a l'altura.");
    else if (amplada <= 0 && altura <= 0) alert ("L'amplada i l'altura introduïts són iguals o menors que 0.");
    else if (amplada <= 0) alert ("L'amplada introduïda és igual o menor que 0.");
    else if (altura <= 0) alert ("L'altura introduïda és igual o menor que 0.");
    else if (amplada > 0 && altura > 0) { /* Aquest últim cas, després de comprovar que no s'hagi donat error, comprova que els valors
                                                siguin vàlids només per curar-nos en salut.*/
        let rect1 = new Rectangle(amplada, altura);
        let area = rect1.perimetre();
        document.getElementById("resultat").innerHTML = `El perímetre és ${area} metres.`;

    } else alert ("Error desconegut.");/*  En cas de no haver detectat l'error, i encara i així rebre valors que no compleixen amb les nostres
                                                        condicions, enviem un missatge d'error genèric.*/
}