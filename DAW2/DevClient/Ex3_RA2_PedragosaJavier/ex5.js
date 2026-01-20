/*
    Exercicis Inventari
    Exercici 5 - Estadístiques de l'inventari
    Javier Pedragosa, DAW2
    Desenv. Entorn Client

    Enunciat:
    Calcula:
    Total d'unitats en estoc
    Total venuts
    Producte amb més estoc
    Producte amb menys estoc
    
    Requisits:
    Usar reduce()
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

    // Funció que troba els 3 productes més venuts i els retorna.
    ranking() {
        const ordenat = this.items.sort(function(a, b) {
            return b.venuts - a.venuts
        })

        console.log(" == Top 3 productes més venuts ==\n1. " + ordenat[0].nom + ", " + ordenat[0].venuts + " unitats venudes.\n2. " + ordenat[1].nom + ", " + ordenat[1].venuts + " unitats venudes.\n3. " + ordenat[2].nom + ", " + ordenat[2].venuts + " unitats venudes.")
        alert(" == Top 3 productes més venuts ==\n1. " + ordenat[0].nom + ", " + ordenat[0].venuts + " unitats venudes.\n2. " + ordenat[1].nom + ", " + ordenat[1].venuts + " unitats venudes.\n3. " + ordenat[2].nom + ", " + ordenat[2].venuts + " unitats venudes.")
    }

    // Funció que retorna els productes amb estoc 0
    senseEstoc() {
        return this.items.filter(item => item.stock === 0);
    }

    //  Funció que retorna true si hi ha productes sense estoc, false en cas contrari
    hiHaSenseEstoc() {
        return this.senseEstoc().length > 0;
    }
    
    // Funció que calcula el total d'unitats en estoc usant reduce()
    totalEstoc() {
        return this.items.reduce((acumulador, item) => {
            return acumulador + item.stock;
        }, 0);
    }

    // Funció que calcula el total d'unitats venudes usant reduce()
    totalVenuts() {
        return this.items.reduce((acumulador, item) => {
            return acumulador + item.venuts;
        }, 0);
    }

    // Funció que troba el producte amb més estoc usant reduce()
    producteMesEstoc() {
        if (this.items.length === 0) {
            throw new Error("L'inventari està buit.");
        }
        
        return this.items.reduce((max, item) => {
            return (item.stock > max.stock) ? item : max;
        });
    }

    // Funció que troba el producte amb menys estoc usant reduce()
    producteMenysEstoc() {
        if (this.items.length === 0) {
            throw new Error("L'inventari està buit.");
        }
        
        return this.items.reduce((min, item) => {
            return (item.stock < min.stock) ? item : min;
        });
    }

    // Funció que mostra totes les estadístiques de l'inventari
    mostrarEstadistiques() {
        const totalEstoc = this.totalEstoc();
        const totalVenuts = this.totalVenuts();
        const mesEstoc = this.producteMesEstoc();
        const menysEstoc = this.producteMenysEstoc();

        const estadistiques = 
            "=== ESTADÍSTIQUES DE L'INVENTARI ===\n\n" +
            "Total d'unitats en estoc: " + totalEstoc + "\n" +
            "Total d'unitats venudes: " + totalVenuts + "\n\n" +
            "Producte amb més estoc:\n" +
            "  - " + mesEstoc.nom + ": " + mesEstoc.stock + " unitats\n\n" +
            "Producte amb menys estoc:\n" +
            "  - " + menysEstoc.nom + ": " + menysEstoc.stock + " unitats";

        console.log(estadistiques);
        alert(estadistiques);
        
        return estadistiques;
    }
}

function test(_args) {    
    // Crear productes amb diferents quantitats d'estoc
    const productNames = ["Poma", "Sabata", "Tablet", "Corda", "Funda Mòbil"];
    var products = [];
    for (const product of productNames) {
        products.push(new Item(product, Math.round(Math.random() * 100)));
    }
    const inventari = new Inventari(products);

    // Realitzar algunes compres aleatòries per generar vendes
    console.log("\n--- Realitzant compres aleatòries ---");
    for (var i = 0; i < 20; i++) {
        try {
            const productAleatori = productNames[Math.round(Math.random() * 4)];
            const quantitat = 1 + Math.round(Math.random() * 9);
            inventari.comprar(productAleatori, quantitat);
        } catch (e) {
            // Si no hi ha prou estoc, continuem amb la següent compra
        }
    }

    // Mostrar l'estat actual de l'inventari
    console.log("\n--- Estat de l'inventari després de les compres ---");
    inventari.llistarProductes();

    // Mostrar les estadístiques de l'inventari usant reduce()
    console.log("\n");
    inventari.mostrarEstadistiques();
}

test();