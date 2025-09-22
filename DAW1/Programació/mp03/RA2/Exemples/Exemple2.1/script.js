// Definició de la classe
class Animal {
    constructor(nom, edat) {
        this.nom = nom; // Atribut nom de l'objecte
        this.edat = edat; // Atribut edat de l'objecte
    }

    ferSo() {
        console.log(`${this.nom} fa un so.`); // Mètode de la classe Animal, només es pot executar sobre objectes de tipus Animal.
    }
}

// Creació d'una instància (objecte)
function exemple() {
    // Creació de tres instàncies.
    const gos = new Animal('Rex', 5);
    const gat = new Animal('Misae', 19);
    const girafa = new Animal('Jordan', 50);
    // Trucada al mètode ferSo() de cadascuna de les tres instàncies.
    gos.ferSo(); // Expected output: Rex fa un so.
    gat.ferSo(); // Expected output: Misae fa un so.
    girafa.ferSo(); // Expected output: Jordan fa un so.

}