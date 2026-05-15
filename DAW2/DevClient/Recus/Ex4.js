// Exercici 4 — Productes sense estoc

const inventari = [
    { nom: 'Teclat',     stock: 15, venuts: 20 },
    { nom: 'Ratolí',     stock: 30, venuts: 45 },
    { nom: 'Monitor',    stock: 0,  venuts: 12 },
    { nom: 'Auriculars', stock: 0,  venuts: 8  },
    { nom: 'Webcam',     stock: 12, venuts: 35 },
];

// Retorna l'array de productes amb stock 0 usant filter
function senseEstoc() {
    return inventari.filter(p => p.stock === 0);
}

// Retorna true si hi ha algun producte sense estoc
function hiHaSenseEstoc() {
    return senseEstoc().length > 0;
}

// --- Proves ---
const sense = senseEstoc();
console.log('Productes sense estoc:');
sense.forEach(p => console.log(` - ${p.nom}`));

console.log(`\nHi ha productes sense estoc? ${hiHaSenseEstoc()}`);
