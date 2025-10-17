const express = require('express'); //Importació de la biblioteca Express, carregant-la per fer servir les funcionalitats.
const app = express(); //La variable app, representa el servidor web que estem construint i sobre el que configurarem les rutes, gestió de peticions, etc.
const port = 3000; //Decidim el port del localhost, http://localhost:3000


/*Definim una ruta HTTP de tipus GET per a la URL arrel /. 
Quan algú accedeix a aquesta adreça, s'executa la funció que rep 2 paràmetres: 
la sol·licitud (req) i la resposta (res). En aquest cas, enviem una resposta amb text pla: 
"Hola des d'Express!". 
Serveix per mostrar un contingut senzill en la pàgina d'inici del servidor.*/ 

app.get('/', (req, res) => { 
  res.send('Hola des d\'Express!');
});

/*Aquesta línia posa el servidor a "escoltar" el port 3000, fent que el servidor s'activi i estigui esperant peticions. 
Quan el servidor s'inicia, s'executa la funció que imprimeix un missatge informant que està funcionant i a on es pot accedir. */
app.listen(port, () => {
  console.log(`Servidor escoltant a http://localhost:${port}`);
});

//Per executar hem d'executar node nomfitxer.js al terminal.