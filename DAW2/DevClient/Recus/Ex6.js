// Exercici 6 — Map d'estoc

let inventari = [
    { nom: 'Teclat',     stock: 15, venuts: 20 },
    { nom: 'Ratolí',     stock: 30, venuts: 45 },
    { nom: 'Monitor',    stock: 5,  venuts: 12 },
    { nom: 'Auriculars', stock: 0,  venuts: 8  },
    { nom: 'Webcam',     stock: 12, venuts: 35 },
];

// Map on la clau és el nom i el valor és l'estoc
let stockMap = new Map();

// Sincronitza el Map a partir de l'array
function actualitzarMapDesDeArray() {
    stockMap.clear();
    inventari.forEach(p => stockMap.set(p.nom, p.stock));
    console.log('Map actualitzat des de l\'array:');
    stockMap.forEach((stock, nom) => console.log(`  ${nom}: ${stock}`));
}

// Sincronitza l'array a partir dels valors del Map
function actualitzarArrayDesDeMap() {
    stockMap.forEach((nouStock, nom) => {
        const producte = inventari.find(p => p.nom === nom);
        if (producte) producte.stock = nouStock;
    });
    console.log('\nArray actualitzat des del Map:');
    inventari.forEach(p => console.log(`  ${p.nom}: stock=${p.stock}`));
}

// --- Proves ---
actualitzarMapDesDeArray();

// Modificar el Map manualment i sincronitzar de tornada
stockMap.set('Teclat', 99);
stockMap.set('Monitor', 0);
console.log('\nMap modificat manualment.');
actualitzarArrayDesDeMap();
