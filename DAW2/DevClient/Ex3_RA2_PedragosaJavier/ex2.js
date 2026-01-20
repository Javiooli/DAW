/*
    Exercicis Inventari
    Exercici 2 - Alta i baixa de productes
    Javier Pedragosa, DAW2
    Desenv. Entorn Client

    Enunciat:
    Implementa un sistema d'alta i baixa de productes a l'inventari.
*/

// Classe producte, amb les següents propietats:
// String nom: nom del producte
// int stock: quantitat disponible del producte
// int venuts: unitats venudes del producte
class Item {
    constructor(nom, stock_inicial) {
        if (typeof nom !== 'string' || nom.trim() === '') {
            throw new Error('El nom ha de ser un string vàlid no buit');
        }
        if (!Number.isInteger(stock_inicial) || stock_inicial < 0) {
            throw new Error('El stock ha de ser un enter vàlid no negatiu');
        }
        this.nom = nom;
        this.stock = stock_inicial;
        this.venuts = 0;
    }

    // Funció que resta la quantitat al stock i la suma a les unitats venudes.
    comprar(amount) {
        if (!Number.isInteger(amount) || amount < 0) {
            throw new Error('La quantitat comprada ha de ser un enter vàlid no negatiu');
        }
        if (amount > this.stock) {
            throw new Error('No hi ha suficient stock per comprar ' + amount + ' unitats de ' + this.nom + ".");
        }
        this.stock -= amount;
        this.venuts += amount;
    }
}

// Classe inventari, llista de productes. Només té una propietat:
// Item[] items: llista de productes, objectes tipus Item.
class Inventari {
    constructor(items) {
        if (items.length < 5) {
            throw new Error("Han d'haver com a mínim 5 productes.");
        }
        this.items = [];
        console.log("Afegint " + items.length + " productes a l'inventari...");
        for (const item of items) {
            this.items.push(item);
            console.log("Afegits/des " + item.stock + " unitats de " + item.nom + " a l'inventari.");
        }
        alert(this.llistarProductes());
    }

    // Funció que llista tots els productes a l'inventari juntament amb el stock i les unitats venudes.
    llistarProductes() {
        var llista = "-- Llista de productes --\n";
        for (const item of this.items) {
            llista += "- " + item.nom + ", Stock: " + item.stock + ", Venuts: " + item.venuts + ".\n"; 
        }
        console.log(llista);
        return llista;
    }

    // Funció que cerca entre els productes de l'inventari algun que tingui el nom passat per paràmetre.
    cercarProducte(nom) {
        console.log("Cercant " + nom + " a l'inventari...");
        for (const item of this.items) {
            if (item.nom.toLowerCase() == nom.toLowerCase()) {
                console.log(item.nom + " trobat.");
                return item;
            }
        }
        throw new Error("No s'ha trobat el producte " + nom + ".");
    }

    // Funció que després de validar paràmetres, cerca el nom del producte a l'inventari i efectua la compra.
    comprar(nom, quantitat) {
        console.log(nom);
        if (typeof nom !== 'string' || nom.trim() === '') {
            throw new Error('El nom ha de ser un string vàlid no buit');
        }
        if (!Number.isInteger(quantitat) || quantitat < 0) {
            throw new Error('La quantitat a comprar ha de ser un enter vàlid no negatiu');
        }
        console.log("Iniciant compra de " + quantitat + " unitats de " + nom + "...");
        try {
            this.cercarProducte(nom).comprar(quantitat);
        } catch (e) {
            alert(e);
            return;
        }
        alert(quantitat + " unitats de " + nom + " comprats/des!");
        alert(this.llistarProductes());
    }

    // Funció que després de validar paràmetres i comprovar que no hi hagi un producte amb el mateix
    // nom ja a l'inventari, l'afegeix a la llista.
    altaProducte(nom, quantitat) {
        if (typeof nom !== 'string' || nom.trim() === '') {
            throw new Error('El nom ha de ser un string vàlid no buit');
        }
        if (!Number.isInteger(quantitat) || quantitat < 0) {
            throw new Error('La quantitat a comprar ha de ser un enter vàlid no negatiu');
        }
        try {
            this.cercarProducte(nom);
        } catch (e) {
            this.items.push(new Item(nom, quantitat));
            alert("Producte " + nom + " afegit a l'inventari.");
            alert(this.llistarProductes());
            return;
        }
        throw new Error("Producte " + nom + " ja existeix a l'inventari.");
    }

    // Funció que després de validar el paràmetre, elimina el producte de l'inventari.
    baixaProducte(nom) {
        if (typeof nom !== 'string' || nom.trim() === '') {
            throw new Error('El nom ha de ser un string vàlid no buit');
        }
        try {
            const index = this.items.indexOf(this.cercarProducte(nom));
            this.items.splice(index);
            console.log(nom + " eliminat/da de l'inventari.");
            alert(nom + " eliminat/da de l'inventari.");
            this.llistarProductes();
        } catch (e) {
            alert(e);
        }
    }
}

function test(_args) {
    const productNames = ["Poma", "Sabata", "Tablet", "Corda", "Funda Mòbil"];
    var products = [];
    for (const product of productNames) {
        products.push(new Item(product, Math.round(Math.random() * 100)));
    }
    const inventari = new Inventari(products);

    const newProducts = ["Pera", "Xancleta", "Mòbil", "Motxilla", "Protector Pantalla"];
    for (const product of newProducts) {
        inventari.altaProducte(product, Math.round(Math.random() * 100));
    }

    inventari.baixaProducte("Tablet");
    inventari.baixaProducte("Poma");
}

test();