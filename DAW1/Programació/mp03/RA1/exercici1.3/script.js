let valor1Raw, valor2Raw;

function operaDosValors (valor1=null, valor2=null) {        //Paràmetres per defecte són null per a la variant avançada de l'exercici.
    if (valor1 === null && valor2 === null) {               //Comprovem si s'han donat paràmetres (8 i 4) per discriminar si s'executa el bàsic o l'avançat
        valor1Raw = prompt("Introdueix el primer número: ") //Demanem primer nombre per dur a terme la variant avançada.
        valor2Raw = prompt("Introdueix el segon número: ")  //Demanem segon nombre per dur a terme la variant avançada.
        valor1 = parseInt(valor1Raw);                       //Prompt retorna String, el convertim a Int.
        valor2 = parseInt(valor2Raw);                       //Prompt retorna String, el convertim a Int.
    }

    if (!isNaN(valor1-valor2)){ //Discriminem si les variables són correctes, és a dir, si en la variant avançada l'usuari ha introduït números vàlids.
        let suma = valor1 + valor2;     //Sumem els dos números i enregistrem el resultat.
        let resta = valor1 - valor2;    //Restem els dos números i enregistrem el resultat.
        let prod = valor1 * valor2;     //Multipliquem els dos números i enregistrem el resultat.
        let quocient = valor1 / valor2; //Dividim els dos números i enregistrem el resultat.
        console.log(suma);              //Mostrem el resultat de la suma per consola.
        console.log(resta);             //Mostrem el resultat de la resta per consola.
        console.log(prod);              //Mostrem el resultat del producte per consola.
        console.log(quocient);          //Mostrem el resultat de la divisió per consola.
        
        alert(valor1 + " + " + valor2 + " = " + suma);    //Llancem alerta per mostrar el resultat de la suma.
        alert(valor1 + " - " + valor2 + " = " + resta);   //Llancem alerta per mostrar el resultat de la resta.
        alert(valor1 + " x " + valor2 + " = " + prod);    //Llancem alerta per mostrar el resultat del producte.
        alert(valor1 + " / " + valor2 + " = " + quocient);//Llancem alerta per mostrar el resultat de la divisió.

    } else {    //En aquest cas els valors que s'han donat mitjançant els prompt no són números vàlids, comprobat a la condició del 'if'.
        console.log("Error: '" + valor1Raw + "' i/o '" + valor2Raw + "' no són números.");    //Mostrem missatge d'error per consola.
        alert("Error: '" + valor1Raw + "' i/o '" + valor2Raw + "' no són números.");          //Llancem alerta amb el missatge d'error.
    }
}