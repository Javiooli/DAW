// Definició de la classe
class Cotxe {
    constructor(marca, model) {
        this.marca = marca; // Atribut marca de l'objecte
        this.model = model; // Atribut model de l'objecte
    }

    descripcio() {
        alert (`Aquest cotxe és un ${this.marca} ${this.model}.`); // Mètode de la classe Persona, només es pot executar sobre objectes de tipus Persona.
    }
}

// Creació d'una instància (objecte)
function exemple() {
    // Creació d'una instància.
    const cotxe1 = new Cotxe('Toyota', "Corolla");
    // Mostrem les dades del cotxe per consola i després cridem el mètode descripcio() de la classe Cotxe.
    console.log(cotxe1.marca); // Expected output: Toyota
    console.log(cotxe1.model); // Expected output: Corolla
    cotxe1.descripcio();
}