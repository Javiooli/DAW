// ============================================================
// FUNCIONS DEFINIDES PEL PROGRAMADOR — 25 exercicis
// ============================================================

// -- 1. Declaració de funcions ---------------------------------

// Ex 1 — Funció que retorna 'Hola, món!'
function saludar() {
    return 'Hola, món!';
}
console.log(saludar());

// Ex 2 — Funció que rep dos números i retorna el producte
function producte(a, b) {
    return a * b;
}
console.log('Producte 4x5 =', producte(4, 5));

// Ex 3 — Assignar una funció a una variable
// Quan assignem una funció a una variable, la variable guarda una referència
// a la funció. Es pot cridar igual que una funció normal però NO hi ha hoisting:
// la variable no és disponible abans de la seva declaració (a diferència de
// function declaration).
const saludar2 = function() { return 'Hola des d\'una variable!'; };
console.log(saludar2());

// -- 2. Àmbit de variables --------------------------------------

// Ex 4 — Diferències entre var, let i const
{
    var x = 10;       // àmbit de funció, es pot redeclarar, hoisting
    let y = 20;       // àmbit de bloc, no es pot redeclarar
    const z = 30;     // àmbit de bloc, no es pot reasignar
    // y = 25;        // OK — reasignació
    // z = 35;        // ERROR — const no es pot reasignar
    console.log('var:', x, '| let:', y, '| const:', z);
}
console.log('var fora del bloc:', x); // accessible
// console.log(y); // ReferenceError — let és de bloc

// Ex 5 — Comportament de var vs let
function exempleAmbit() {
    // var: accessible a tot el cos de la funció (hoisting)
    console.log(a); // undefined (hoisted, no inicialitzat)
    var a = 5;
    console.log(a); // 5

    // let: NO accessible abans de la declaració (Temporal Dead Zone)
    // console.log(b); // ReferenceError
    let b = 10;
    console.log(b); // 10
}
exempleAmbit();

// -- 3. Invocacions ---------------------------------------------

// Ex 6 — Funció normal, mètode, call i apply
function presentar(salutacio, puntuacio) {
    return `${salutacio}, sóc ${this.nom}${puntuacio}`;
}

const persona = { nom: 'Javier', presentar };

// Invocació normal (this = undefined en strict, window en no-strict)
// presentar('Hola', '!');

// Invocació com a mètode
console.log(persona.presentar('Hola', '!'));

// Invocació amb call (arguments individuals)
console.log(presentar.call({ nom: 'Maria' }, 'Bon dia', '.'));

// Invocació amb apply (arguments en array)
console.log(presentar.apply({ nom: 'Pere' }, ['Ei', '?']));

// Ex 7 — this i call()
const cotxe = { marca: 'Seat' };
function mostrarMarca() {
    return this.marca;  // 'this' apunta al context que es passi
}
// Sense call(), 'this' seria undefined (mode estricte) o window
console.log(mostrarMarca.call(cotxe)); // 'Seat'
// call() permet definir manualment a quin objecte apunta 'this'

// -- 4. Memorització -------------------------------------------

// Ex 8 — esPrimer(n) amb memòria interna (memoization)
const esPrimer = (() => {
    const cache = {};
    return function(n) {
        if (n in cache) {
            console.log(`(cache) ${n}`);
            return cache[n];
        }
        if (n < 2) return (cache[n] = false);
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return (cache[n] = false);
        }
        return (cache[n] = true);
    };
})();

console.log(esPrimer(7));   // calcula
console.log(esPrimer(7));   // des de cache
console.log(esPrimer(10));  // calcula

// Ex 9 — Per què la memorització millora el rendiment
// La memorització evita recalcular resultats ja computats guardant-los en un
// objecte cache. Si la funció és costosa (ex: nombres primers grans, Fibonacci),
// la 2a crida és instantània. El cost és espai de memòria addicional.

// -- 5. Sobrecàrrega de funcions -------------------------------

// Ex 10 — calcul() amb comportament diferent segons arguments.length
function calcul() {
    if (arguments.length === 0) return 0;
    if (arguments.length === 1) return arguments[0] * 2;
    if (arguments.length === 2) return arguments[0] + arguments[1];
    return Array.from(arguments).reduce((acc, v) => acc + v, 0);
}
console.log(calcul());          // 0
console.log(calcul(5));         // 10
console.log(calcul(3, 4));      // 7
console.log(calcul(1, 2, 3, 4)); // 10

// Ex 11 — afegirMetode() per sobrecàrrega
function afegirMetode(obj, nom, fn) {
    const anterior = obj[nom];
    obj[nom] = function(...args) {
        if (args.length === fn.length) return fn.apply(this, args);
        if (typeof anterior === 'function') return anterior.apply(this, args);
    };
}

const obj = {};
afegirMetode(obj, 'buscar', function()      { return 'busca tots'; });
afegirMetode(obj, 'buscar', function(nom)   { return `busca per nom: ${nom}`; });
afegirMetode(obj, 'buscar', function(n, c)  { return `busca per nom i cognom: ${n} ${c}`; });

console.log(obj.buscar());
console.log(obj.buscar('Joan'));
console.log(obj.buscar('Joan', 'Pérez'));

// -- 6. Clausures ----------------------------------------------

// Ex 12 — contador() que recorda el valor intern (clausura)
function contador() {
    let compte = 0;         // variable privada tancada a la clausura
    return {
        incrementar: () => ++compte,
        decrementar: () => --compte,
        valor:       () => compte,
    };
}

const c = contador();
c.incrementar();
c.incrementar();
c.incrementar();
c.decrementar();
console.log('Comptador:', c.valor()); // 2

// Ex 13 — Per què funciona la clausura
// La funció retornada "recorda" l'entorn on va ser creada, incloent la variable
// 'compte'. Cada crida a contador() crea un nou àmbit independent. La variable
// queda viva mentre hi hagi alguna referència a les funcions internes.

// -- 7. Funcions sense nom (anònimes) -------------------------

// Ex 14 — Tres exemples amb funcions anònimes
// a) Vàlida: funció anònima assignada a variable (function expression)
const suma = function(a, b) { return a + b; };
console.log(suma(2, 3)); // 5

// b) Vàlida: funció anònima com a callback
[1, 2, 3].forEach(function(n) { process.stdout.write(n + ' '); });
console.log('');

// c) Vàlida: funció anònima invocada immediatament (IIFE)
const resultat = (function() { return 42; })();
console.log('IIFE resultat:', resultat);

// -- 8. Funcions de fletxa -------------------------------------

// Ex 15 — Conversió a funcions de fletxa
// Normal → fletxa
const doblar     = n => n * 2;
const saludarFl  = nom => `Hola, ${nom}!`;
const sumaFl     = (a, b) => a + b;
const sense      = () => 'sense paràmetres';

console.log(doblar(7), saludarFl('Javier'), sumaFl(2, 3), sense());

// Ex 16 — this en funcions de fletxa
// Les funcions de fletxa NO tenen el seu propi 'this': hereten el 'this'
// del context on van ser definides (léxic). Per això NO es poden usar com a
// mètodes d'objecte si necessitem accedir a les propietats de l'objecte via
// 'this', ni com a constructors (no es pot usar 'new').
const obj2 = {
    nom: 'Test',
    normal:  function() { return this.nom; },   // 'this' = obj2
    fletxa:  () => typeof this,                  // 'this' del context extern
};
console.log(obj2.normal()); // 'Test'
console.log(obj2.fletxa()); // 'undefined' o 'object' (context global)

// -- 9. Funcions immediates (IIFE) -----------------------------

// Ex 17 — Què fa una IIFE
// Una IIFE (Immediately Invoked Function Expression) és una funció que es
// declara i s'executa en el mateix moment. Serveix per crear un àmbit privat
// i evitar contaminar el scope global.

// Ex 18 — IIFE amb variable privada n
const comptadorPrivat = (function() {
    let n = 0;    // n és privada, no accessible des de fora
    return {
        incrementar: () => ++n,
        valor:       () => n,
    };
})();

comptadorPrivat.incrementar();
comptadorPrivat.incrementar();
console.log('n privada:', comptadorPrivat.valor()); // 2
// console.log(n); // ReferenceError — n no existeix fora

// -- 10. Altres maneres de crear funcions ----------------------

// Ex 19 — Funció dins un objecte
const calculadora = {
    valor: 0,
    sumar(n)   { this.valor += n; return this; },
    restar(n)  { this.valor -= n; return this; },
    resultat() { return this.valor; },
};
console.log(calculadora.sumar(10).sumar(5).restar(3).resultat()); // 12

// Ex 20 — Funció que retorna una altra funció (factory)
function multiplicador(factor) {
    return n => n * factor;
}
const triple = multiplicador(3);
const doble  = multiplicador(2);
console.log(triple(5)); // 15
console.log(doble(8));  // 16

// -- 11. Desestructuració --------------------------------------

// Ex 21 — Desestructurar un objecte
const alumne = { nom: 'Javier', curs: 'DAW', nota: 9 };
const { nom, curs, nota } = alumne;
console.log(nom, curs, nota);

// Amb àlies
const { nom: nomAlumne, nota: notaFinal = 5 } = alumne;
console.log(nomAlumne, notaFinal);

// Ex 22 — Desestructurar un array
const colors = ['vermell', 'verd', 'blau', 'groc'];
const [primer, segon, , quart] = colors;
console.log(primer, segon, quart); // vermell verd groc

// Intercanvi de variables
let a2 = 1, b2 = 2;
[a2, b2] = [b2, a2];
console.log('Swap:', a2, b2); // 2 1

// -- 12. Propagació i retorn múltiple -------------------------

// Ex 23 — Funció que retorna múltiples valors i desestructura'ls
function minMax(arr) {
    return { min: Math.min(...arr), max: Math.max(...arr) };
}
const { min, max } = minMax([3, 1, 7, 2, 9]);
console.log('Min:', min, '| Max:', max);

// Amb array
function dividir(a, b) {
    return [Math.floor(a / b), a % b]; // [quocient, residu]
}
const [quocient, residu] = dividir(17, 5);
console.log('17/5 → quocient:', quocient, '| residu:', residu);

// Ex 24 — Diferència entre spread i rest
// SPREAD (...) expandeix un iterable en elements individuals:
//   Math.max(...[1,2,3])  → Math.max(1,2,3)
//   [...arr1, ...arr2]    → fusiona arrays
// REST (...) agrupa els arguments restants en un array:
//   function suma(...nums) { }  → nums és un array
// La diferència és el context: spread és a la CRIDA, rest és a la DECLARACIÓ.

// Ex 25 — Funció amb nombre indefinit de valors → retorna la suma (rest)
function sumaTotal(...nums) {
    return nums.reduce((acc, n) => acc + n, 0);
}
console.log(sumaTotal(1, 2, 3));          // 6
console.log(sumaTotal(10, 20, 30, 40));   // 100
