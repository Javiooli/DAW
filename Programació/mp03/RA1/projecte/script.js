const IMC_MAX = 25.0;
const IMC_MIN = 18.5;


function calcularIMC() {
    /*  Declaració variables. rawWeight i rawHeight son les cadenes de text rebudes dels dos camps a omplir a la pàgina.
        weight i height són les conversions a Float d'aquestes cadenes de text.*/
    let rawWeight = document.getElementById("weight").value;
    let rawHeight = document.getElementById("height").value;
    let weight = parseFloat(rawWeight);
    let height = parseFloat(rawHeight);

    /*  Buidem la valoració on diu si l'IMC és saludable o no, perquè en cas de tornar a omplir amb dades errònies, és
        poc polit (encara que bastant còmic) que encara mostri la valoració anterior.*/
    document.getElementById("valoracio").innerHTML = "";

    //Per defecte, el text es mostre vermell. En cas que s'hagi de mostrar verd, es modifica en el moment.
    document.getElementById("resultat").style = "color: red; background-color: rgba(0, 0, 0, 0.5); margin-left: auto; margin-right: auto; padding: 10px; border-radius: 15px; max-width: 500px; width: 100%;box-sizing: border-box;";

    //Comencem les comprovacions en cas d'error i enviem el missatge d'error al mètode canviarResultat().
    if (rawWeight == "" && rawHeight == "") canviarResultat("Introdueix números vàlids al pes i l'alçada.");
    else if (rawWeight == "") canviarResultat("Introdueix un número vàlid al pes.");
    else if (rawHeight == "") canviarResultat("Introdueix una alçada vàlida.");
    else if (weight <= 0 && height <= 0) canviarResultat("El pes i l'alçada introduïts són iguals o menors que 0.");
    else if (weight <= 0) canviarResultat("El pes introduït és igual o menor que 0.");
    else if (height <= 0) canviarResultat("L'alçada introduïda és igual o menor que 0.");
    else if (weight > 0 && height > 0) { /* Aquest últim cas, després de comprovar que no s'hagi donat error, comprova que els valors
                                            siguin vàlids només per curar-nos en salut.*/

        let IMC = weight / (height * height); //Declarem i calculem l'IMC amb la fòrmula proporcionada.

        valorar(IMC); //Cridem el mètode valorar() amb l'IMC com a paràmetre per a seleccionar el missatge de valoració.
        canviarResultat("L'Índex de Massa Corporal és: " + IMC.toFixed(2) + "."); //Enviem el missatge que notifica el resultat del càlcul de l'IMC.

    } else canviarResultat("Error desconegut.");/*  En cas de no haver detectat l'error, i encara i així rebre valors que no compleixen amb les nostres
                                                    condicions, enviem un missatge d'error genèric.*/


}

function valorar(IMC) { //Mètode per modificar tant la valoració com el color dels textos depenent de si l'IMC supera o no el valor de la constant LIMIT_IMC.
    document.getElementById("valoracio").style = "color: red; background-color: rgba(0, 0, 0, 0.5); margin-left: auto;margin-right: auto; padding: 10px; border-radius: 15px; max-width: 500px; width: 100%;box-sizing: border-box;";
    if (IMC > IMC_MAX) {//Si és superior, posem la valoració pertinent i no modifiquem el color perquè ja partim del color vermell per defecte.
        document.getElementById("valoracio").innerHTML = "Sobrepès.";
        return;
    } else if (IMC < IMC_MIN) {
        document.getElementById("valoracio").innerHTML = "Pes insuficient.";
        return;
    }
    //En cas que sigui inferior, canviem els textos a verd i enviem la valoració d'"IMC Saludable.".
    document.getElementById("resultat").style = "color: green; background-color: rgba(0, 0, 0, 0.5); margin-left: auto; margin-right: auto; padding: 10px; border-radius: 15px; max-width: 500px; width: 100%;box-sizing: border-box;";
    document.getElementById("valoracio").style = "color: green; background-color: rgba(0, 0, 0, 0.5); margin-left: auto; margin-right: auto; padding: 10px; border-radius: 15px; max-width: 500px; width: 100%;box-sizing: border-box;";
    document.getElementById("valoracio").innerHTML = "IMC Saludable.";


}

//Mètode creat per a netejar el codi, i no tenir tots aquests document.getElementById.etc pel mig per cadascun dels missatges d'error.
function canviarResultat(text) {
    document.getElementById("resultat").innerHTML = text;
}