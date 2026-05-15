// Exercici 3 — Rànquing de productes més venuts

const inventari = [
    { nom: 'Teclat',     stock: 15, venuts: 20 },
    { nom: 'Ratolí',     stock: 30, venuts: 45 },
    { nom: 'Monitor',    stock: 5,  venuts: 12 },
    { nom: 'Auriculars', stock: 0,  venuts: 8  },
    { nom: 'Webcam',     stock: 12, venuts: 35 },
];

// Retorna el rànquing dels 3 productes més venuts sense modificar l'array original
function rankingVenuts() {
    const copia = [...inventari].sort((a, b) => b.venuts - a.venuts);
    const top3  = copia.slice(0, 3);

    console.log('\n--- RÀNQUING TOP 3 MÉS VENUTS ---');
    top3.forEach((p, i) => {
        console.log(`${i + 1}) ${p.nom} - ${p.venuts} venuts`);
    });
    console.log('');

    return top3;
}

// --- Prova ---
rankingVenuts();
console.log('Array original intacte:', inventari.map(p => p.nom));
