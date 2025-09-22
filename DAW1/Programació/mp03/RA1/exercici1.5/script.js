/*
Aquesta funció intentarà convertir un número enter (tipus de variable Int) a cadena de text (tipus de variable String),
i viceversa. A través de la consola podrem observar el comportament d'aquest tipus d'operacions quan els valors que es
donen no són vàlids.
Un apunt personal és que esperava que saltessin excepcions, però en comptes d'això he aprés que les operacions es realitzen,
amb la característica que retornen valors que marquen l'error, com ara NaN o [Object undefined].
*/

function conversions() {
    let num = 29012003;             //Declarem número enter que intentarem convertir a cadena de text.
    let str = "Javier Pedragosa";   //Declarem cadena de text que intentarem convertir a número enter.
    
    console.log("Convertint cadena de text a número...");   //Missatge merament informatiu (i estètic).
    console.log(parseInt(str));                             //Missatge que mostrarà el resultat d'intentar convertir una cadena de text a número enter.

    console.log("------------------------------------------")//Missatge purament estètic.

    console.log("Convertint número a cadena de text...");   //Missatge merament informatiu (i estètic).
    console.log(toString(num));                             //Mssatge que mostrarà el resultat d'intentar convertir un número enter a cadena de text.

}