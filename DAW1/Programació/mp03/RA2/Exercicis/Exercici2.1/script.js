// Definició de la classe
class Estudiant {
    constructor(nom, curs) {
        this.nom = nom; // Atribut nom de l'objecte
        this.curs = curs; // Atribut curs de l'objecte
    }

    mostrarInfo() {
        return `Em dic ${this.nom} i estic en el curs ${this.curs}.`; // Retorna l'àrea del rectangle multiplicant l'amplada per l'altura.
    }
}

function executar() {
    let estudiant = new Estudiant(document.getElementById("nom").value, document.getElementById("curs").value);
    document.getElementById("resultat").innerHTML = estudiant.mostrarInfo();

}