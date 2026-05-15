// Exercici 1 — Inventari bàsic amb arrays

let inventari = [
    { nom: 'Teclat',     stock: 15, venuts: 20 },
    { nom: 'Ratolí',     stock: 30, venuts: 45 },
    { nom: 'Monitor',    stock: 5,  venuts: 12 },
    { nom: 'Auriculars', stock: 0,  venuts: 8  },
    { nom: 'Webcam',     stock: 12, venuts: 35 },
];

// Mostra tots els productes de l'inventari
function llistarProductes() {
    console.log('\n--- INVENTARI ---');
    inventari.forEach(p => {
        console.log(`${p.nom} | Stock: ${p.stock} | Venuts: ${p.venuts}`);
    });
    console.log('');
}

// Cerca un producte per nom (retorna l'objecte o null)
function cercarProducte(nom) {
    const producte = inventari.find(p => p.nom.toLowerCase() === nom.toLowerCase());
    if (producte) {
        console.log(`Producte trobat: ${producte.nom} | Stock: ${producte.stock} | Venuts: ${producte.venuts}`);
    } else {
        console.log(`Producte "${nom}" no trobat.`);
    }
    return producte || null;
}

// Compra unitats d'un producte — redueix stock i augmenta venuts
function comprar(nom, unitats) {
    const producte = inventari.find(p => p.nom.toLowerCase() === nom.toLowerCase());
    if (!producte) {
        console.log(`Error: el producte "${nom}" no existeix.`);
        return;
    }
    if (unitats > producte.stock) {
        console.log(`Error: no hi ha prou stock de "${nom}" (disponible: ${producte.stock}).`);
        return;
    }
    producte.stock  -= unitats;
    producte.venuts += unitats;
    console.log(`Compra realitzada: ${unitats}x ${producte.nom}. Stock restant: ${producte.stock}`);
}

// --- Proves ---
llistarProductes();
cercarProducte('Monitor');
cercarProducte('Impressora');
comprar('Teclat', 3);
comprar('Auriculars', 5); // sense stock
comprar('GPU', 1);        // no existeix
llistarProductes();
