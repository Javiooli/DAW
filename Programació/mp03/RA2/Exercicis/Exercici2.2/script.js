// Definició de la classe
class Agenda {

    mostrarDataActual(date) {
        return `Avui és ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    }
}

function executar() {
    let date = new Date();
    let agenda = new Agenda();
    document.getElementById("resultat").innerHTML = agenda.mostrarDataActual(date);

}