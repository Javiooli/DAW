// Exercici 2 — Alta i baixa de productes

let inventari = [
    { nom: 'Teclat',     stock: 15, venuts: 20 },
    { nom: 'Ratolí',     stock: 30, venuts: 45 },
    { nom: 'Monitor',    stock: 5,  venuts: 12 },
    { nom: 'Auriculars', stock: 0,  venuts: 8  },
    { nom: 'Webcam',     stock: 12, venuts: 35 },
];

// Afegeix un nou producte si no existeix (control de duplicats)
function altaProducte(nom, stock) {
    const idx = inventari.findIndex(p => p.nom.toLowerCase() === nom.toLowerCase());
    if (idx !== -1) {
        console.log(`Error: el producte "${nom}" ja existeix.`);
        return;
    }
    inventari.push({ nom, stock, venuts: 0 });
    console.log(`Alta: "${nom}" afegit amb stock ${stock}.`);
}

// Elimina un producte per nom usant findIndex i splice
function baixaProducte(nom) {
    const idx = inventari.findIndex(p => p.nom.toLowerCase() === nom.toLowerCase());
    if (idx === -1) {
        console.log(`Error: el producte "${nom}" no existeix.`);
        return;
    }
    inventari.splice(idx, 1);
    console.log(`Baixa: "${nom}" eliminat de l'inventari.`);
}

// --- Proves ---
console.log('Inventari inicial:', inventari.map(p => p.nom));
altaProducte('Impressora', 10);
altaProducte('Teclat', 5);     // duplicat
baixaProducte('Monitor');
baixaProducte('Altaveus');     // no existeix
console.log('Inventari final:', inventari.map(p => p.nom));
