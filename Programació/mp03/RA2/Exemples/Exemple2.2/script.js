// Definició de la classe
class Persona {
    constructor(nom, edat) {
        this.nom = nom; // Atribut nom de l'objecte
        this.edat = edat; // Atribut edat de l'objecte
    }

    saluda() {
        console.log(`Hola, em dic ${this.nom} i tinc ${this.edat} anys.`); // Mètode de la classe Persona, només es pot executar sobre objectes de tipus Persona.
    }
}

// Creació d'una instància (objecte)
function exemple() {
    // Creació d'una instància.
    const persona1 = new Persona('Anna', 25);
    // Trucada al mètode saluda() de persona1.
    persona1.saluda(); // Expected output: Hola em dic Anna i tinc 25 anys.

}