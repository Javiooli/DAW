// Importa el framework Express per crear el servidor web.
const express = require('express');

// Importa el middleware body-parser per processar dades de formularis
//Necessari per llegir formularis o peticions mitjançant métode POST json però no obligatori. 
//El métode POST és l'utilitzat per enviar dades d'un formulari a un servidor HTTP.
const bodyParser = require('body-parser');

// Importa el mòdul 'path' per treballar amb rutes de fitxers
const path = require('path');

// Crea una instància de l'aplicació Express, necessària per afegir les rutes i configurar el servidor.
const app = express();

// Defineix el port on escoltarà el servidor (3000)
const PORT = 3000;

// Configura body-parser per processar dades enviades en format URL (formularis POST)
app.use(bodyParser.urlencoded({ extended: true }));

// Serveix arxius estàtics de la carpeta 'public' utilitzant el path absolut
app.use(express.static(path.join(__dirname, 'public'))); 

// Ruta GET per la portada (‘/’). Retorna el formulari HTML al navegador.
app.get('/', (req, res) => {
  // Envia l'arxiu 'index.html' ubicat dins la carpeta 'public'
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta POST que rep el formulari enviat per l'usuari a '/submit'
app.post('/submit', (req, res) => {
  // Guarda les dades rebudes en una variable (req.body)
  const dades = req.body;
  // Mostra les dades rebudes per pantalla, útil per depurar o guardar a base de dades
  console.log(dades); // Aquí podries guardar les dades a la base de dades
  // Respon amb un missatge HTML confirmant l'enviament, mostrant les dades rebudes
  res.send(`<h1 style="text-align:center;">Formulari enviat correctament!</h1><pre>${JSON.stringify(dades, null, 2)}</pre>`);
});

// Inicia el servidor i l’escolta pel port definit, mostrant un missatge per la consola
app.listen(PORT, () => {
  console.log(`Servidor en marxa a http://localhost:${PORT}`);
});