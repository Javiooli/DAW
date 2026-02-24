const STORAGE_KEY = 'carrito_shop_data_v1';

// Productes base de la botiga
const productesInicials = [
    { id: 1, nom: 'Teclat Mecànic', preu: 59.99, stock: 6 },
    { id: 2, nom: 'Ratolí Gaming', preu: 34.5, stock: 8 },
    { id: 3, nom: 'Monitor 24"', preu: 149.0, stock: 4 },
    { id: 4, nom: 'SSD 1TB', preu: 79.95, stock: 5 },
    { id: 5, nom: 'Auriculars USB', preu: 45.0, stock: 7 },
    { id: 6, nom: 'Webcam Full HD', preu: 39.99, stock: 3 }
];

let productesDisponibles = clonarProductesInicials();
let carrito = [];

let contenedorProductes;
let llistaCarrito;
let totalSpan;
let btnVaciar;
let btnComprar;

// Arrenquem tot quan la pàgina ja està carregada
document.addEventListener('DOMContentLoaded', () => {
    contenedorProductes = document.getElementById('contenedor-productos');
    llistaCarrito = document.getElementById('lista-carrito');
    totalSpan = document.getElementById('total');
    btnVaciar = document.getElementById('btn-vaciar');
    btnComprar = document.getElementById('btn-comprar');

    carregarCarritoDesDeStorage();
    reconstruirStockDesDeCarrito();

    renderitzarCataleg();
    renderitzarCarrito();

    btnVaciar.addEventListener('click', buidarCarrito);
    btnComprar.addEventListener('click', finalitzarCompra);
});

// Fa una còpia dels productes per no tocar l'array inicial directament
function clonarProductesInicials() {
    return productesInicials.map((producte) => ({ ...producte }));
}

// Busca un producte al catàleg actual
function obtenirProductePerId(id) {
    return productesDisponibles.find((producte) => producte.id === id);
}

// Busca dades del producte base
function obtenirDadesProducteBase(id) {
    return productesInicials.find((producte) => producte.id === id);
}

// Carrega el carretó guardat al navegador
function carregarCarritoDesDeStorage() {
    const dades = localStorage.getItem(STORAGE_KEY);

    if (!dades) {
        carrito = [];
        return;
    }

    try {
        const dadesRecuperades = JSON.parse(dades);

        if (!Array.isArray(dadesRecuperades)) {
            carrito = [];
            return;
        }

        carrito = dadesRecuperades
            .filter((item) => Number.isInteger(item.id) && Number.isInteger(item.quantitat) && item.quantitat > 0)
            .map((item) => ({ id: item.id, quantitat: item.quantitat }));
    } catch {
        carrito = [];
    }
}

// Guarda el carretó cada cop que canvia alguna cosa
function guardarCarritoAStorage() {
    if (carrito.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
        return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
}

// Recalcula stock després de recuperar el carretó
function reconstruirStockDesDeCarrito() {
    productesDisponibles = clonarProductesInicials();

    carrito = carrito.filter((itemCarrito) => {
        const producte = obtenirProductePerId(itemCarrito.id);

        if (!producte) {
            return false;
        }

        const quantitatAplicada = Math.min(itemCarrito.quantitat, producte.stock);
        producte.stock -= quantitatAplicada;
        itemCarrito.quantitat = quantitatAplicada;

        return itemCarrito.quantitat > 0;
    });

    guardarCarritoAStorage();
}

// Pinta tot el catàleg a pantalla
function renderitzarCataleg() {
    contenedorProductes.innerHTML = '';

    productesDisponibles.forEach((producte) => {
        const article = document.createElement('article');
        article.className = 'producto-card';

        const stockClasse = producte.stock <= 2 ? 'stock-bajo' : '';
        const botoDesactivat = producte.stock === 0;
        const textBoto = botoDesactivat ? 'Esgotat' : 'Afegir al carretó';

        article.innerHTML = `
            <h3>${producte.nom}</h3>
            <p>Preu: ${producte.preu.toFixed(2)}€</p>
            <p class="${stockClasse}">Stock: ${producte.stock}</p>
            <button class="btn-agregar" data-id="${producte.id}" ${botoDesactivat ? 'disabled' : ''}>${textBoto}</button>
        `;

        const botoAfegir = article.querySelector('button');
        botoAfegir.addEventListener('click', () => afegirAlCarrito(producte.id));

        contenedorProductes.appendChild(article);
    });
}

// Pinta la cistella i calcula el total al moment
function renderitzarCarrito() {
    llistaCarrito.innerHTML = '';

    if (carrito.length === 0) {
        const buit = document.createElement('li');
        buit.textContent = 'El carretó està buit.';
        llistaCarrito.appendChild(buit);
    }

    let total = 0;

    carrito.forEach((itemCarrito) => {
        const producteBase = obtenirDadesProducteBase(itemCarrito.id);

        if (!producteBase) {
            return;
        }

        const subtotal = producteBase.preu * itemCarrito.quantitat;
        total += subtotal;

        const li = document.createElement('li');
        li.className = 'item-carrito';
        li.innerHTML = `
            <span>${producteBase.nom} x ${itemCarrito.quantitat} (${subtotal.toFixed(2)}€)</span>
            <button class="btn-eliminar" data-id="${itemCarrito.id}">Eliminar</button>
        `;

        const botoEliminar = li.querySelector('button');
        botoEliminar.addEventListener('click', () => eliminarDelCarrito(itemCarrito.id));

        llistaCarrito.appendChild(li);
    });

    totalSpan.textContent = total.toFixed(2);
}

// Afegeix 1 unitat al carretó i resta 1 del stock
function afegirAlCarrito(idProducte) {
    const producte = obtenirProductePerId(idProducte);

    if (!producte || producte.stock <= 0) {
        return;
    }

    const itemCarrito = carrito.find((item) => item.id === idProducte);

    if (itemCarrito) {
        itemCarrito.quantitat += 1;
    } else {
        carrito.push({ id: idProducte, quantitat: 1 });
    }

    producte.stock -= 1;

    guardarCarritoAStorage();
    renderitzarCataleg();
    renderitzarCarrito();
}

// Elimina 1 unitat del carretó i la torna al stock
function eliminarDelCarrito(idProducte) {
    const index = carrito.findIndex((item) => item.id === idProducte);

    if (index === -1) {
        return;
    }

    carrito[index].quantitat -= 1;

    if (carrito[index].quantitat <= 0) {
        carrito.splice(index, 1);
    }

    const producte = obtenirProductePerId(idProducte);
    if (producte) {
        producte.stock += 1;
    }

    guardarCarritoAStorage();
    renderitzarCataleg();
    renderitzarCarrito();
}

// Deixa la cistella a zero i recupera stock original
function buidarCarrito() {
    carrito = [];
    productesDisponibles = clonarProductesInicials();

    guardarCarritoAStorage();
    renderitzarCataleg();
    renderitzarCarrito();
}

// Simula el botó de compra final
function finalitzarCompra() {
    if (carrito.length === 0) {
        alert('El carretó està buit.');
        return;
    }

    alert('Compra finalitzada correctament!');
    buidarCarrito();
}