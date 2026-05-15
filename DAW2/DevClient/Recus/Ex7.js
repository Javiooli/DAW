// Exercici 7 — Set de categories

const inventari = [
    { nom: 'Teclat',     stock: 15, venuts: 20, categoria: 'Perifèrics' },
    { nom: 'Ratolí',     stock: 30, venuts: 45, categoria: 'Perifèrics' },
    { nom: 'Monitor',    stock: 5,  venuts: 12, categoria: 'Pantalles'  },
    { nom: 'Auriculars', stock: 0,  venuts: 8,  categoria: 'So'         },
    { nom: 'Webcam',     stock: 12, venuts: 35, categoria: 'Imatge'     },
    { nom: 'Impressora', stock: 3,  venuts: 7,  categoria: 'Impressió'  },
    { nom: 'Altaveus',   stock: 8,  venuts: 15, categoria: 'So'         },
];

// Crea un Set amb les categories úniques i les mostra ordenades
function categoriesUniques() {
    // Set elimina automàticament els duplicats
    const setCategories = new Set(inventari.map(p => p.categoria));

    // Convertir Set a array i ordenar alfabèticament
    const categoriesOrdenades = [...setCategories].sort();

    console.log('Categories úniques (ordenades):');
    categoriesOrdenades.forEach(c => console.log(`  - ${c}`));

    return categoriesOrdenades;
}

// Mostra els productes agrupats per categoria
function productesPorCategoria() {
    const categories = categoriesUniques();
    console.log('\nProductes per categoria:');
    categories.forEach(cat => {
        const prods = inventari.filter(p => p.categoria === cat).map(p => p.nom);
        console.log(`  ${cat}: ${prods.join(', ')}`);
    });
}

// --- Proves ---
categoriesUniques();
console.log('');
productesPorCategoria();
