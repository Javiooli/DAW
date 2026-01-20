/*
    Exercicis Inventari
    Exercici 7 - Set de categories
    Javier Pedragosa, DAW2
    Desenv. Entorn Client

    Enunciat:
    Afegeix una propietat categoria a cada producte.
    Crea un Set amb les categories úniques i mostra-les ordenades.
    
    Requisits:
    - No permetre duplicats
    - Convertir Set a array
    
    Criteris d'avaluació:
    - Ús correcte de Set
    - Conversió i ordenació
*/

// Classe producte, amb les següents propietats:
// String nom: nom del producte
// int stock: quantitat disponible del producte
// int venuts: unitats venudes del producte
// String categoria: categoria del producte (EXERCICI 7)
class Item {
    constructor(nom, stock_inicial, categoria = 'Sense categoria') {
        if (typeof nom !== 'string' || nom.trim() === '') {
            throw new Error('El nom ha de ser un string vàlid no buit');
        }
        if (!Number.isInteger(stock_inicial) || stock_inicial < 0) {
            throw new Error('El stock ha de ser un enter vàlid no negatiu');
        }
        if (typeof categoria !== 'string' || categoria.trim() === '') {
            throw new Error('La categoria ha de ser un string vàlid no buit');
        }
        this.nom = nom;
        this.stock = stock_inicial;
        this.venuts = 0;
        this.categoria = categoria;
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
        // === EXERCICI 6: Inicialitzar Map d'estoc ===
        this.mapEstoc = new Map();
        
        console.log("Afegint " + items.length + " productes a l'inventari...");
        for (const item of items) {
            this.items.push(item);
            console.log("Afegits/des " + item.stock + " unitats de " + item.nom + " a l'inventari.");
        }
        // Inicialitzar el Map amb els productes inicials
        this.actualitzarMapDesDeArray();
        alert(this.llistarProductes());
    }

    // Funció que llista tots els productes a l'inventari juntament amb el stock i les unitats venudes.
    llistarProductes() {
        var llista = "-- Llista de productes --\n";
        for (const item of this.items) {
            llista += "- " + item.nom + " [" + item.categoria + "], Stock: " + item.stock + ", Venuts: " + item.venuts + ".\n"; 
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
    altaProducte(nom, quantitat, categoria = 'Sense categoria') {
        if (typeof nom !== 'string' || nom.trim() === '') {
            throw new Error('El nom ha de ser un string vàlid no buit');
        }
        if (!Number.isInteger(quantitat) || quantitat < 0) {
            throw new Error('La quantitat a comprar ha de ser un enter vàlid no negatiu');
        }
        try {
            this.cercarProducte(nom);
        } catch (e) {
            this.items.push(new Item(nom, quantitat, categoria));
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

    // === EXERCICI 6: MAP D'ESTOC ===

    // Funció que actualitza el Map d'estoc des de l'array d'items
    // Recorre tots els items de l'array i actualitza el Map amb nom → estoc
    actualitzarMapDesDeArray() {
        console.log("Actualitzant Map des de l'array...");
        
        // Esborrem el contingut anterior del Map
        this.mapEstoc.clear();
        
        // Iterem sobre l'array d'items i afegim cada producte al Map
        for (const item of this.items) {
            this.mapEstoc.set(item.nom, item.stock);
        }
        
        console.log("Map actualitzat. Total de productes al Map: " + this.mapEstoc.size);
    }

    // Funció que actualitza l'array d'items des del Map d'estoc
    // Recorre tots els elements del Map i actualitza l'estoc dels items corresponents
    actualitzarArrayDesDeMap() {
        console.log("Actualitzant array des del Map...");
        
        let actualitzats = 0;
        
        // Iterem sobre el Map utilitzant forEach
        this.mapEstoc.forEach((stock, nomProducte) => {
            try {
                // Cerquem el producte a l'array
                const producte = this.cercarProducte(nomProducte);
                // Actualitzem el seu estoc amb el valor del Map
                producte.stock = stock;
                actualitzats++;
            } catch (e) {
                console.log("Avís: Producte '" + nomProducte + "' al Map però no a l'array.");
            }
        });
        
        console.log("Array actualitzat. Productes actualitzats: " + actualitzats);
    }

    // Funció que mostra el contingut del Map d'estoc
    mostrarMap() {
        let resultat = "=== MAP D'ESTOC ===\n\n";
        
        if (this.mapEstoc.size === 0) {
            resultat += "El Map està buit.\n";
        } else {
            resultat += "Total de productes al Map: " + this.mapEstoc.size + "\n\n";
            
            // Iterem sobre el Map utilitzant for...of amb entries()
            for (const [nom, stock] of this.mapEstoc.entries()) {
                resultat += "  " + nom + " → " + stock + " unitats\n";
            }
        }
        
        console.log(resultat);
        return resultat;
    }

    // Funció que modifica l'estoc d'un producte directament al Map
    modificarEstocAlMap(nomProducte, nouEstoc) {
        if (!Number.isInteger(nouEstoc) || nouEstoc < 0) {
            throw new Error('El nou estoc ha de ser un enter vàlid no negatiu');
        }
        
        if (this.mapEstoc.has(nomProducte)) {
            const estocAntic = this.mapEstoc.get(nomProducte);
            this.mapEstoc.set(nomProducte, nouEstoc);
            console.log("Estoc de '" + nomProducte + "' actualitzat al Map: " + estocAntic + " → " + nouEstoc);
        } else {
            throw new Error("El producte '" + nomProducte + "' no existeix al Map.");
        }
    }

    // Funció que comprova si l'array i el Map estan sincronitzats
    estasSincronitzats() {
        if (this.items.length !== this.mapEstoc.size) {
            return false;
        }
        
        for (const item of this.items) {
            if (!this.mapEstoc.has(item.nom)) {
                return false;
            }
            if (this.mapEstoc.get(item.nom) !== item.stock) {
                return false;
            }
        }
        
        return true;
    }

    // === EXERCICI 7: SET DE CATEGORIES ===

    // Funció que crea un Set amb totes les categories úniques dels productes
    obtenirCategories() {
        const categories = new Set();
        
        // Afegir cada categoria al Set (automàticament evita duplicats)
        for (const item of this.items) {
            categories.add(item.categoria);
        }
        
        return categories;
    }

    // Funció que converteix el Set de categories a un array ordenat
    obtenirCategoriesOrdenades() {
        const setCategories = this.obtenirCategories();
        
        // Convertir Set a Array usant spread operator
        const arrayCategories = [...setCategories];
        
        // Ordenar alfabèticament
        arrayCategories.sort();
        
        return arrayCategories;
    }

    // Funció que mostra totes les categories úniques ordenades
    mostrarCategories() {
        const categories = this.obtenirCategoriesOrdenades();
        
        let resultat = "=== CATEGORIES ÚNIQUES (ORDENADES) ===\n\n";
        resultat += "Total de categories: " + categories.length + "\n\n";
        
        for (let i = 0; i < categories.length; i++) {
            resultat += (i + 1) + ". " + categories[i] + "\n";
        }
        
        console.log(resultat);
        alert(resultat);
        return resultat;
    }

    // Funció que filtra productes per categoria
    obtenirProductesPerCategoria(categoria) {
        return this.items.filter(item => item.categoria === categoria);
    }

    // Funció que mostra els productes agrupats per categoria
    mostrarProductesPerCategoria() {
        const categories = this.obtenirCategoriesOrdenades();
        
        let resultat = "=== PRODUCTES AGRUPATS PER CATEGORIA ===\n\n";
        
        for (const categoria of categories) {
            const productes = this.obtenirProductesPerCategoria(categoria);
            resultat += "📁 " + categoria + " (" + productes.length + " productes):\n";
            
            for (const item of productes) {
                resultat += "  • " + item.nom + " - Stock: " + item.stock + ", Venuts: " + item.venuts + "\n";
            }
            resultat += "\n";
        }
        
        console.log(resultat);
        return resultat;
    }

    // Funció que compta quants productes hi ha per categoria
    comptarProductesPerCategoria() {
        const recompte = new Map();
        
        // Utilitzar Set per obtenir categories úniques
        const categories = this.obtenirCategories();
        
        // Per cada categoria, comptar els productes
        for (const categoria of categories) {
            const count = this.items.filter(item => item.categoria === categoria).length;
            recompte.set(categoria, count);
        }
        
        return recompte;
    }

    // Funció que mostra estadístiques de categories
    mostrarEstadistiquesCategories() {
        const recompte = this.comptarProductesPerCategoria();
        const categoriesOrdenades = this.obtenirCategoriesOrdenades();
        
        let resultat = "=== ESTADÍSTIQUES PER CATEGORIA ===\n\n";
        
        for (const categoria of categoriesOrdenades) {
            const count = recompte.get(categoria);
            const productes = this.obtenirProductesPerCategoria(categoria);
            
            // Calcular total d'estoc i venuts per categoria
            const totalEstoc = productes.reduce((sum, item) => sum + item.stock, 0);
            const totalVenuts = productes.reduce((sum, item) => sum + item.venuts, 0);
            
            resultat += "📊 " + categoria + ":\n";
            resultat += "   Productes: " + count + "\n";
            resultat += "   Estoc total: " + totalEstoc + " unitats\n";
            resultat += "   Venuts total: " + totalVenuts + " unitats\n\n";
        }
        
        console.log(resultat);
        alert(resultat);
        return resultat;
    }
}

function test(_args) {
    console.log("=== EXERCICI 7: SET DE CATEGORIES ===\n");
    
    // Crear productes amb categories (alguns amb categories duplicades)
    const productsData = [
        { nom: "Poma", stock: 50, categoria: "Alimentació" },
        { nom: "Plàtan", stock: 30, categoria: "Alimentació" },
        { nom: "Tablet", stock: 15, categoria: "Electrònica" },
        { nom: "Portàtil", stock: 8, categoria: "Electrònica" },
        { nom: "Sabata", stock: 25, categoria: "Roba" },
        { nom: "Samarreta", stock: 40, categoria: "Roba" },
        { nom: "Llibre", stock: 60, categoria: "Llibreria" },
        { nom: "Bolígraf", stock: 100, categoria: "Papeleria" },
        { nom: "Quadern", stock: 75, categoria: "Papeleria" }
    ];
    
    var products = [];
    for (const data of productsData) {
        products.push(new Item(data.nom, data.stock, data.categoria));
    }
    const inventari = new Inventari(products);

    // 1. Mostrar tots els productes amb les seves categories
    console.log("\n--- 1. INVENTARI COMPLET ---");
    inventari.llistarProductes();

    // 2. Obtenir i mostrar categories úniques (usar Set)
    console.log("\n--- 2. CATEGORIES ÚNIQUES (SET) ---");
    const setCategories = inventari.obtenirCategories();
    console.log("Set de categories:", setCategories);
    console.log("Nombre de categories úniques: " + setCategories.size);
    
    // Demostrar que Set no permet duplicats
    console.log("\nDemostració: Intentar afegir duplicats al Set...");
    setCategories.add("Alimentació");  // Ja existeix
    setCategories.add("Electrònica"); // Ja existeix
    setCategories.add("Nova Categoria"); // Nova
    console.log("Després d'intentar afegir duplicats:");
    console.log("Set de categories:", setCategories);
    console.log("Mida del Set: " + setCategories.size);

    // 3. Convertir Set a Array i ordenar
    console.log("\n--- 3. CONVERSIÓ SET → ARRAY I ORDENACIÓ ---");
    const arrayCategories = inventari.obtenirCategoriesOrdenades();
    console.log("Array ordenat:", arrayCategories);
    inventari.mostrarCategories();

    // 4. Mostrar productes agrupats per categoria
    console.log("\n--- 4. PRODUCTES AGRUPATS PER CATEGORIA ---");
    alert(inventari.mostrarProductesPerCategoria());

    // 5. Fer algunes compres per generar vendes
    console.log("\n--- 5. REALITZAR COMPRES ---");
    try {
        inventari.comprar("Poma", 10);
        inventari.comprar("Tablet", 3);
        inventari.comprar("Sabata", 5);
        inventari.comprar("Bolígraf", 20);
    } catch (e) {
        console.log("Error: " + e.message);
    }

    // 6. Mostrar estadístiques per categoria
    console.log("\n--- 6. ESTADÍSTIQUES PER CATEGORIA ---");
    inventari.mostrarEstadistiquesCategories();

    // 7. Filtrar productes per una categoria específica
    console.log("\n--- 7. FILTRAR PER CATEGORIA ---");
    const electrònica = inventari.obtenirProductesPerCategoria("Electrònica");
    console.log("Productes d'Electrònica:");
    for (const prod of electrònica) {
        console.log("  - " + prod.nom + ": " + prod.stock + " unitats en estoc");
    }

    // 8. Demostrar diferents mètodes de conversió Set → Array
    console.log("\n--- 8. MÈTODES DE CONVERSIÓ SET → ARRAY ---");
    const setDemo = inventari.obtenirCategories();
    console.log("Set original:", setDemo);
    
    // Mètode 1: Spread operator
    const array1 = [...setDemo];
    console.log("Mètode 1 (spread):", array1);
    
    // Mètode 2: Array.from()
    const array2 = Array.from(setDemo);
    console.log("Mètode 2 (Array.from):", array2);
    
    // Mètode 3: Iteració manual
    const array3 = [];
    setDemo.forEach(cat => array3.push(cat));
    console.log("Mètode 3 (forEach):", array3);

    console.log("\n✓ Exercici 7 completat: Set de categories amb conversió i ordenació!");
}

test();