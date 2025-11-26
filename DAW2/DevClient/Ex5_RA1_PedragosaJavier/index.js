const express = require('express'); //Importació de la biblioteca Express, carregant-la per fer servir les funcionalitats.
const path = require('path') // Importació de la llibreria path per poder enviar l'arxiu HTML com a resposta
const app = express(); //La variable app, representa el servidor web que estem construint i sobre el que configurarem les rutes, gestió de peticions, etc.
const port = 3000; //Decidim el port del localhost, http://localhost:3000

// Middleware per parsejar el cos de les peticions POST (formularis i JSON)
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json


/*Definim una ruta HTTP de tipus GET per a la URL arrel /.
Quan algú accedeix a aquesta adreça, s'executa la funció que rep 2 paràmetres:
la sol·licitud (req) i la resposta (res). */
app.use(express.static(path.join(__dirname, "public"))); // Això és necessari per poder enviar els arxius de la carpeta public a la resposta del servidor
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

/*Aquesta línia posa el servidor a "escoltar" el port 3000, fent que el servidor s'activi i estigui esperant peticions.
Quan el servidor s'inicia, s'executa la funció que imprimeix un missatge informant que està funcionant i a on es pot accedir. */
app.listen(port, () => {
    console.log(`Servidor escoltant a http://localhost:${port}`);
});

//Per executar hem d'executar node nomfitxer.js al terminal.