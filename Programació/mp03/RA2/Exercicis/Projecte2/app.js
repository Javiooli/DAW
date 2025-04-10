// Punt d'inici per la implementació del Model, ViewModel i la lògica de la UI

// Implementa una classe Magatzem per gestionar una llista de productes
class Magatzem {
    constructor() {
        this.magatzem = [];
        this.key = 0;
    }

    // Implementa mètodes estàtics per calcular el valor total del magatzem
    static valorTotal(llista) {
        let valorTotal = 0;
        /*for (let i = 0; i < this.magatzem.length; i++) {
            valorTotal += this.magatzem[i].valorTotal();
        }*/
        _.forEach(llista, function (producte) {
            valorTotal += producte.valorTotal();
        })
        return valorTotal;
    }

    valorTotal() {
        let valorTotal = 0;
        /*for (let i = 0; i < this.magatzem.length; i++) {
            valorTotal += this.magatzem[i].valorTotal();
        }*/
        _.forEach(this.magatzem, function (producte) {
            valorTotal += producte.valorTotal();
        })
        return valorTotal;
    }

    // Afegeix la lògica per afegir i eliminar productes de la llista
    afegir(producte){
        //Afegir tasca a la llista interna de tasques.
        this.magatzem.push(producte);
        console.log(`Producte afegit: ${producte.obtenirDetalls()})`);
        console.log("Productes actuals: ", this.magatzem.map(producte => producte.obtenirDetalls()));

        MagatzemViewModel.afegir(producte, this.key);
        this.key++;

        MagatzemViewModel.actualitzarValorTotal(this);
    }
    
    eliminar(id) {
        //Busquem la tasca a la llista del model.
        let producte = _.find(this.magatzem, { id: id });
        //if (la trobem a la llista interna)...
        if (producte) {
            //Eliminem la tasca de la llista interna.
            _.remove(this.magatzem, (producte) => producte.id === id);
            MagatzemViewModel.eliminar(producte.id);
            console.log("Productes actuals: ", this.magatzem.map(prod => prod.obtenirDetalls()));
            MagatzemViewModel.actualitzarValorTotal(this);
        } else alert("Producte no trobat.");
    }

    incrementarStock(id) {
        //Busquem el producte a la llista del model.
        let producte = _.find(this.magatzem, { id: id });
        //if (el trobem a la llista interna)...
        if (producte) {
            producte.incrementarStock();
            MagatzemViewModel.actualitzarValorTotal(this);
            MagatzemViewModel.actualitzarArticle(producte);
        } else alert("Producte no trobat.");
    }

    disminuirStock(id) {
        //Busquem el producte a la llista del model.
        let producte = _.find(this.magatzem, { id: id });
        //if (el trobem a la llista interna)...
        if (producte) {
            producte.disminuirStock();
            MagatzemViewModel.actualitzarValorTotal(this);
            MagatzemViewModel.actualitzarArticle(producte);
        } else alert("Producte no trobat.");
    }
}

// Crea una classe Producte amb les propietats: nom, quantitat, preuUnitari
class Producte {
    // Crea un constructor que inicialitzi aquestes propietats
    constructor(nom, quantitat, preuUnitari, magatzem, silent = false) {
        this.nom = nom;
        this.quantitat = quantitat;
        this.preuUnitari = preuUnitari;
        this.id = magatzem.key;
        if (!silent) console.log(`Producte ${this.obtenirDetalls()} creat.`);
    }

    obtenirDetalls() {
        return (`${this.nom} | x${this.quantitat} | ${this.preuUnitari}€/u`);
    }
    // Implementa mètodes per incrementar i disminuir la quantitat d'un producte, i per calcular el valor total
    incrementarStock(increment = 1) {
        if (!isNaN(increment) && increment > 0)
            this.quantitat += increment;
        else
            alert(increment + " no és una quantitat vàlida.");
    }

    disminuirStock(disminucio = 1) {
        if (!isNaN(disminucio) && disminucio > 0)
            this.quantitat -= disminucio;
        else
            alert(disminucio + " no és una quantitat vàlida.");
    }

    valorTotal() {
        return (this.quantitat * this.preuUnitari);
    }
}

// Crea una classe MagatzemViewModel que gestionarà la lògica entre el model i la vista
class MagatzemViewModel {
    static afegir(producte, key) {
        //Localitzar llista de tasques de la vista.
        let ul = document.getElementById("productList");

        //Crear element per afegir a la llista de la vista.
        let li = document.createElement("li");
        li.className = 'producte';
        li.setAttribute("id", key);
        li.textContent = producte.obtenirDetalls();

        //Crear i afegir botó d'augmentar stock a l'element.
        let botoStockUp = document.createElement('button');
        botoStockUp.className = "StockUp"; 
        botoStockUp.innerText = "↑"
        botoStockUp.addEventListener('click', () => {magatzem.incrementarStock(producte.id)});
        li.appendChild(botoStockUp);

        //Crear i afegir botó de reduir stock a l'element.
        let botoStockDwn = document.createElement('button');
        botoStockDwn.className = "StockDwn"; 
        botoStockDwn.innerText = "↓"
        botoStockDwn.addEventListener('click', () => {magatzem.disminuirStock(producte.id)});
        li.appendChild(botoStockDwn);

        //Crear i afegir botó d'eliminar a l'element.
        let botoEliminar = document.createElement('button');
        botoEliminar.className = "Eliminar"; 
        botoEliminar.innerText = "Eliminar"
        botoEliminar.addEventListener('click', () => {magatzem.eliminar(producte.id)});
        li.appendChild(botoEliminar);

        //Per últim, afegir element a la llista de la vista.
        ul.appendChild(li);
    }
    // Lògica per eliminar un producte de la llista
    static eliminar(id) {
        //Localitzem la llista de la vista.
        let ul = document.getElementById("productList");
        //Localitzem l'element a la llista de la vista.
        let li = document.getElementById(id);
        //Eliminem l'element de la llista de la vista.
        ul.removeChild(li);
    }

    static actualitzarValorTotal(magatzem) {
        //Modifiquem el valor de la vista utilitzant
        document.getElementById("totalValue").innerHTML = Magatzem.valorTotal(magatzem.magatzem);
    }

    static actualitzarArticle(producte) {
        let li = document.getElementById(producte.id);
        li.textContent = producte.obtenirDetalls();

        //Crear i afegir botó d'augmentar stock a l'element.
        let botoStockUp = document.createElement('button');
        botoStockUp.className = "StockUp"; 
        botoStockUp.innerText = "↑"
        botoStockUp.addEventListener('click', () => {magatzem.incrementarStock(producte.id)});
        li.appendChild(botoStockUp);

        //Crear i afegir botó de reduir stock a l'element.
        let botoStockDwn = document.createElement('button');
        botoStockDwn.className = "StockDwn"; 
        botoStockDwn.innerText = "↓"
        botoStockDwn.addEventListener('click', () => {magatzem.disminuirStock(producte.id)});
        li.appendChild(botoStockDwn);

        //Crear i afegir botó d'eliminar a l'element.
        let botoEliminar = document.createElement('button');
        botoEliminar.className = "Eliminar"; 
        botoEliminar.innerText = "Eliminar"
        botoEliminar.addEventListener('click', () => {magatzem.eliminar(producte.id)});
        li.appendChild(botoEliminar);

        
    }
}

let magatzem = new Magatzem();
//Test a consola per comprovar que el mètode estàtic Magatzem.valorTotal() funciona correctament.
console.log("Test mètode estàtic Magatzem.valorTotal(llista). Resultat esperat: 100.");
console.log(Magatzem.valorTotal([new Producte("test1", 1, 50, magatzem, true), new Producte("test2", 2, 25, magatzem, true)]));//Si a consola surt 100 significa que el mètode estàtic funciona.

// Gestiona la interfície d'usuari (UI) i actualitza-la quan els productes es modifiquen
document.addEventListener('DOMContentLoaded', () => {
    // Lògica per afegir un producte
    document.getElementById('addProduct').addEventListener('click', () => {
        // Captura els valors dels inputs
        const nom = document.getElementById('productName').value;
        const quantitat = parseInt(document.getElementById('productQuantity').value);
        const preuUnitari = parseFloat(document.getElementById('productPrice').value);
        // Lògica per crear i afegir un producte a la llista
        if (nom) {
            if (!isNaN(quantitat) && quantitat > 0) {
                if (!isNaN(preuUnitari) && preuUnitari > 0) {
                    magatzem.afegir(new Producte(nom, quantitat, preuUnitari, magatzem));
                } else alert("Introdueix un preu unitari vàlid.");
            } else alert("Introdueix una quantitat vàlida.");
        } else alert("Introdueix un nom.");

        // Netejar els camps del formulari
        document.getElementById('productName').value = '';
        document.getElementById('productQuantity').value = '';
        document.getElementById('productPrice').value = '';
    });

});