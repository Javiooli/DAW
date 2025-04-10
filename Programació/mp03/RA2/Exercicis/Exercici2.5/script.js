class Biblioteca {
    
    constructor(){
        this.llistaLlibres = [];
    }
    
    afegirLlibre(llibre){
        this.llistaLlibres.push(llibre);
        console.log(`Llibre afegit: ${llibre.obtenirDetalls})`);
        console.log("Llibres actuals: ", this.llistaLlibres.map(llibre => llibre.obtenirDetalls()));
    }
    
    eliminarLlibre(titol){
        _.remove(this.llistaLlibres, (llibre) => llibre.titol === titol);
        console.log("Llibres actuals: ", this.llistaLlibres.map(llibre => llibre.obtenirDetalls()));
    }
    
    cercarPerAutor(autor){
        const llibresTrobats = _.filter(this.llistaLlibres, {autor: autor});
        console.log(`Llibres trobats per '${autor}': `, llibresTrobats.map(llibre => llibre.obtenirDetalls()));
        return llibresTrobats;
    }
}

class Llibre {
    constructor (titol, autor, any){
        this.titol = titol;
        this.autor = autor;
        this.any = any;
    }

    obtenirDetalls(){
        return `Títol: ${this.titol}, Autor: ${this.autor}, Any: ${this.any}`;
    }
}

const biblioteca = new Biblioteca();

function afegir() {
    date = new Date();
    titol = document.getElementById("titol").value;
    autor = document.getElementById("autor").value;
    any = parseInt(document.getElementById("any").value);

    if (titol != "") {
        if (autor != "") {
            if (any != NaN) {
                if (any <= date.getFullYear()) {
                    biblioteca.afegirLlibre(new Llibre(titol, autor, any));
                } else alert("Si us plau, introdueix un any vàlid.");
            } else alert("Si us plau, introdueix l'any.");
        } else alert("Si us plau, introdueix l'autor.");
    } else alert("Si us plau, introdueix el títol.");
}

function eliminar(){
    titol = document.getElementById("titoldel").value;
    if (titol != null) {
        biblioteca.eliminarLlibre(titol);
    } else alert("Si us plau, introdueix el títol.");
}

function cercar(){
    autor = document.getElementById("autorsearch").value;
    if (autor != "") {
        biblioteca.cercarPerAutor(autor);
    } else alert("Si us plau, introdueix l'autor.")
}