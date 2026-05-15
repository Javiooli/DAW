// Exercici 5 — Estadístiques de l'inventari

const inventari = [
    { nom: 'Teclat',     stock: 15, venuts: 20 },
    { nom: 'Ratolí',     stock: 30, venuts: 45 },
    { nom: 'Monitor',    stock: 5,  venuts: 12 },
    { nom: 'Auriculars', stock: 0,  venuts: 8  },
    { nom: 'Webcam',     stock: 12, venuts: 35 },
];

// Calcula estadístiques de l'inventari usant reduce
function estadistiques() {
    const totalStock  = inventari.reduce((acc, p) => acc + p.stock,  0);
    const totalVenuts = inventari.reduce((acc, p) => acc + p.venuts, 0);

    const mesEstoc    = inventari.reduce((max, p) => p.stock > max.stock ? p : max, inventari[0]);
    const menysEstoc  = inventari.reduce((min, p) => p.stock < min.stock ? p : min, inventari[0]);

    console.log('\n--- ESTADÍSTIQUES ---');
    console.log(`Total unitats en estoc: ${totalStock}`);
    console.log(`Total venuts:           ${totalVenuts}`);
    console.log(`Producte amb més estoc: ${mesEstoc.nom} (${mesEstoc.stock})`);
    console.log(`Producte amb menys estoc: ${menysEstoc.nom} (${menysEstoc.stock})`);
    console.log('');
}

// --- Prova ---
estadistiques();
