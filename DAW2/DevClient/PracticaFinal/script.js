'use strict';

// ── 3.1. Model de dades (POO) ──────────────────────────────────────────────────

class Libro {
    constructor(titulo, autor, isbn, anio) {
        this.titulo = titulo;
        this.autor  = autor;
        this.isbn   = isbn;
        this.anio   = Number(anio);
        this.prestamos = 0;
    }

    // Incrementa el comptador de préstecs en 1
    prestar() {
        this.prestamos++;
    }
}

// ── Dades inicials (mínim 4 instàncies) ───────────────────────────────────────

let biblioteca = [
    new Libro('El Quixot',              'Miguel de Cervantes', '978-84-376', 1605),
    new Libro('Tirant lo Blanc',        'Joanot Martorell',    '978-84-279', 1490),
    new Libro('La Plaça del Diamant',   'Mercè Rodoreda',      '978-84-297', 1962),
    new Libro('Mort de Dama',           'Llorenç Villalonga',  '978-84-731', 1931),
];

// Afegim alguns préstecs inicials per poder veure el rànquing
biblioteca[0].prestamos = 5;
biblioteca[2].prestamos = 8;
biblioteca[3].prestamos = 3;

// ── Referència als elements del DOM ───────────────────────────────────────────

const listaEl  = document.getElementById('listaLibros');
const statsEl  = document.getElementById('stats');
const errorEl  = document.getElementById('missatge-error');

// ── Utilitat: toast de confirmació ────────────────────────────────────────────

const mostrarToast = (missatge) => {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = missatge;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2500);
};

// ── Utilitat: mostrar / amagar error de formulari ─────────────────────────────

const mostrarError = (msg) => {
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
};

const netejarError = () => errorEl.classList.add('hidden');

// ── 3.3. Validació ────────────────────────────────────────────────────────────

const isbnRegex = /^[0-9]{3}-[0-9]{1,5}-[0-9]{1,7}$/;

const validarLibro = (titulo, autor, isbn, anio) => {
    if (!titulo || !autor) return 'El títol i l\'autor són obligatoris.';
    if (anio && isNaN(Number(anio))) return 'L\'any ha de ser un valor numèric.';
    if (isbn && !isbnRegex.test(isbn)) return 'El format de l\'ISBN no és vàlid (ex: 978-84-376).';
    return null;
};

// ── 3.2. Funcions obligatòries ────────────────────────────────────────────────

/**
 * listarLibros — renderitza la llista al DOM
 * Ús de forEach
 */
const listarLibros = (llista = biblioteca) => {
    listaEl.innerHTML = '';

    if (llista.length === 0) {
        listaEl.innerHTML = '<li style="text-align:center;color:#aaa;padding:1rem">Cap llibre trobat.</li>';
        return;
    }

    llista.forEach((llibre) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="llibre-info">
                <strong>${llibre.titulo}</strong>
                <span>${llibre.autor} · ${llibre.anio || '—'} · ISBN: ${llibre.isbn || '—'}</span>
            </div>
            <span class="prestamos-badge">📖 ${llibre.prestamos} préstecs</span>
            <div class="llibre-accions">
                <button class="btn-prestar"  data-isbn="${llibre.isbn}">Prestar</button>
                <button class="btn-eliminar" data-isbn="${llibre.isbn}">Eliminar</button>
            </div>
        `;

        // addEventListener per als botons (sense onclick a l'HTML)
        li.querySelector('.btn-prestar').addEventListener('click', () => {
            const trobat = buscarLibro(llibre.titulo);
            if (trobat) {
                trobat.prestar();
                listarLibros();
                estadisticas();
                mostrarToast(`"${trobat.titulo}" prestat correctament.`);
            }
        });

        li.querySelector('.btn-eliminar').addEventListener('click', () => {
            eliminarLibro(llibre.isbn);
            listarLibros();
            estadisticas();
            mostrarToast(`"${llibre.titulo}" eliminat.`);
        });

        listaEl.appendChild(li);
    });
};

/**
 * buscarLibro — localitza un llibre per coincidència exacta de títol
 * Ús de find
 */
const buscarLibro = (titulo) =>
    biblioteca.find((l) => l.titulo.toLowerCase() === titulo.toLowerCase());

/**
 * eliminarLibro — elimina un llibre de l'array per ISBN
 * Ús de findIndex
 */
const eliminarLibro = (isbn) => {
    const index = biblioteca.findIndex((l) => l.isbn === isbn);
    if (index !== -1) biblioteca.splice(index, 1);
};

/**
 * filtrarLibros — filtra dinàmicament per títol o autor
 * Ús de filter i includes
 */
const filtrarLibros = (text) => {
    const query = text.toLowerCase();
    return biblioteca.filter((l) =>
        l.titulo.toLowerCase().includes(query) ||
        l.autor.toLowerCase().includes(query)
    );
};

/**
 * rankingPrestamos — retorna còpia ordenada de major a menor préstecs
 * Ús de sort sobre una còpia de l'array
 */
const rankingPrestamos = () =>
    [...biblioteca].sort((a, b) => b.prestamos - a.prestamos);

/**
 * estadisticas — calcula i mostra estadístiques al DOM
 * Ús de reduce
 */
const estadisticas = () => {
    if (biblioteca.length === 0) {
        statsEl.innerHTML = '';
        return;
    }

    const total     = biblioteca.length;
    const sumPrest  = biblioteca.reduce((acc, l) => acc + l.prestamos, 0);
    const anyAntic  = biblioteca.reduce((min, l) => (l.anio && l.anio < min ? l.anio : min), Infinity);
    const anyRecent = biblioteca.reduce((max, l) => (l.anio && l.anio > max ? l.anio : max), -Infinity);

    statsEl.innerHTML = `
        <span>📚 Total: ${total}</span>
        <span>📖 Préstecs totals: ${sumPrest}</span>
        <span>🕰️ Any més antic: ${anyAntic === Infinity ? '—' : anyAntic}</span>
        <span>🆕 Any més recent: ${anyRecent === -Infinity ? '—' : anyRecent}</span>
    `;
};

// ── 4.1. Persistència amb LocalStorage ────────────────────────────────────────

const guardarBiblioteca = () => {
    localStorage.setItem('biblioteca', JSON.stringify(biblioteca));
    mostrarToast('Biblioteca guardada a LocalStorage ✓');
};

const cargarBiblioteca = () => {
    const dades = localStorage.getItem('biblioteca');
    if (!dades) { mostrarToast('No hi ha dades guardades.'); return; }

    // Ús de map per reconstruir instàncies de la classe Libro des de l'objecte pla
    biblioteca = JSON.parse(dades).map((b) => {
        const l = new Libro(b.titulo, b.autor, b.isbn, b.anio);
        l.prestamos = b.prestamos;
        return l;
    });

    listarLibros();
    estadisticas();
    mostrarToast('Biblioteca recuperada de LocalStorage ✓');
};

// ── 4.2. Fetch API ────────────────────────────────────────────────────────────

/**
 * cargarLibrosExternos — importa llibres des de libros.json de forma asíncrona
 * Gestió d'errors amb try...catch i comprovació de response.ok
 */
const cargarLibrosExternos = async () => {
    try {
        const resposta = await fetch('libros.json');

        if (!resposta.ok) {
            throw new Error(`Error HTTP: ${resposta.status}`);
        }

        const dades = await resposta.json();

        // Convertir cada objecte JSON en una instància de Libro (ús de map)
        const llibresImportats = dades.map((b) => {
            const l = new Libro(b.titulo, b.autor, b.isbn, b.anio);
            l.prestamos = b.prestamos ?? 0;
            return l;
        });

        biblioteca = [...biblioteca, ...llibresImportats];
        listarLibros();
        estadisticas();
        mostrarToast(`${llibresImportats.length} llibres importats correctament ✓`);
    } catch (error) {
        mostrarToast(`Error en importar: ${error.message}`);
        console.error('cargarLibrosExternos error:', error);
    }
};

// ── Event Listeners ───────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

    // Renderitzar inicial
    listarLibros();
    estadisticas();

    // Formulari: afegir llibre
    document.getElementById('formLibro').addEventListener('submit', (e) => {
        e.preventDefault();
        netejarError();

        const titulo = document.getElementById('titulo').value.trim();
        const autor  = document.getElementById('autor').value.trim();
        const isbn   = document.getElementById('isbn').value.trim();
        const anio   = document.getElementById('anio').value.trim();

        const error = validarLibro(titulo, autor, isbn, anio);
        if (error) { mostrarError(error); return; }

        const nouLlibre = new Libro(titulo, autor, isbn, anio);
        biblioteca.push(nouLlibre);

        listarLibros();
        estadisticas();
        e.target.reset();
        mostrarToast(`"${titulo}" afegit correctament ✓`);
    });

    // Cercador: filtre dinàmic mentre s'escriu
    document.getElementById('busqueda').addEventListener('input', (e) => {
        const text = e.target.value.trim();
        if (text.length === 0) {
            listarLibros();
        } else {
            listarLibros(filtrarLibros(text));
        }
    });

    // Rànquing de préstecs
    document.getElementById('btnRanking').addEventListener('click', () => {
        listarLibros(rankingPrestamos());
        mostrarToast('Mostrant rànquing de préstecs 🏆');
    });

    // Guardar a LocalStorage
    document.getElementById('btnGuardar').addEventListener('click', guardarBiblioteca);

    // Recuperar de LocalStorage
    document.getElementById('btnCargar').addEventListener('click', cargarBiblioteca);

    // Importar des de libros.json
    document.getElementById('btnFetch').addEventListener('click', cargarLibrosExternos);
});
