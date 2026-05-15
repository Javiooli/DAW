// Exercici 8 — Menú de gestió per consola

const readline = require('readline');

let inventari = [
    { nom: 'Teclat',     stock: 15, venuts: 20 },
    { nom: 'Ratolí',     stock: 30, venuts: 45 },
    { nom: 'Monitor',    stock: 5,  venuts: 12 },
    { nom: 'Auriculars', stock: 0,  venuts: 8  },
    { nom: 'Webcam',     stock: 12, venuts: 35 },
];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const pregunta = (text) => new Promise(res => rl.question(text, res));

// -- Funcions --------------------------------------------------

function llistarProductes() {
    console.log('\n--- INVENTARI ---');
    inventari.forEach(p => console.log(`  ${p.nom} | Stock: ${p.stock} | Venuts: ${p.venuts}`));
    console.log('');
}

function comprar(nom, unitats) {
    const p = inventari.find(x => x.nom.toLowerCase() === nom.toLowerCase());
    if (!p)              return console.log(`"${nom}" no trobat.`);
    if (unitats > p.stock) return console.log(`Stock insuficient (disponible: ${p.stock}).`);
    p.stock  -= unitats;
    p.venuts += unitats;
    console.log(`Compra OK: ${unitats}x ${p.nom}. Stock restant: ${p.stock}`);
}

function altaProducte(nom, stock) {
    if (inventari.findIndex(p => p.nom.toLowerCase() === nom.toLowerCase()) !== -1)
        return console.log(`"${nom}" ja existeix.`);
    inventari.push({ nom, stock: Number(stock), venuts: 0 });
    console.log(`Alta: "${nom}" afegit.`);
}

function baixaProducte(nom) {
    const idx = inventari.findIndex(p => p.nom.toLowerCase() === nom.toLowerCase());
    if (idx === -1) return console.log(`"${nom}" no trobat.`);
    inventari.splice(idx, 1);
    console.log(`Baixa: "${nom}" eliminat.`);
}

function rankingVenuts() {
    const top3 = [...inventari].sort((a, b) => b.venuts - a.venuts).slice(0, 3);
    console.log('\n--- RÀNQUING TOP 3 ---');
    top3.forEach((p, i) => console.log(`${i + 1}) ${p.nom} - ${p.venuts} venuts`));
    console.log('');
}

// -- Menú principal --------------------------------------------

async function menu() {
    let sortir = false;
    while (!sortir) {
        console.log('=== MENÚ GESTIÓ INVENTARI ===');
        console.log('1. Llistar productes');
        console.log('2. Comprar producte');
        console.log('3. Alta producte');
        console.log('4. Baixa producte');
        console.log('5. Rànquing');
        console.log('0. Sortir');

        const opcio = await pregunta('Selecciona una opció: ');

        switch (opcio.trim()) {
            case '1':
                llistarProductes();
                break;
            case '2': {
                const nom     = await pregunta('Nom del producte: ');
                const unitats = parseInt(await pregunta('Unitats: '), 10);
                comprar(nom.trim(), unitats);
                break;
            }
            case '3': {
                const nom   = await pregunta('Nom del nou producte: ');
                const stock = await pregunta('Stock inicial: ');
                altaProducte(nom.trim(), stock.trim());
                break;
            }
            case '4': {
                const nom = await pregunta('Nom del producte a eliminar: ');
                baixaProducte(nom.trim());
                break;
            }
            case '5':
                rankingVenuts();
                break;
            case '0':
                sortir = true;
                console.log('Fins aviat!');
                break;
            default:
                console.log('Opció no vàlida.\n');
        }
    }
    rl.close();
}

menu();
