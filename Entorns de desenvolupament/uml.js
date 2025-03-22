/*
Les factures dels proveïdors d’una empresa poden ser de proveïdors de serveis o de
proveïdors de productes o materials. Cadascuna de les factures, de qualsevol dels dos
tipus, tenen en comú:

• El número de la factura.
• La data de la factura.
• L’import total –que es calcula de manera diferent en les unes que en les altres-.
• Les dades del client, que són el NIF i el nom, i que s’hauran de trobar en una classe a part.
• El detall de la factura (tant si és de materials com si és de serveis).

Tant per a les factures de serveis com per a les factures de productes o materials cal tenir
guardada la darrera factura emesa, per tenir present el número de factura. Hi ha una llista
de serveis amb la descripció i el preu per hora de cadascun.

En el detall de les factures haurà d’haver-hi:
• A les factures de serveis, a cada factura hi ha una llista de serveis amb la data de prestació,
el nombre d’hores dedicades i el preu/hora per servei. En una factura hi pot haver més d’una
prestació del mateix servei.

• A les factures de productes, per a cada producte (a cada factura n’hi ha almenys un) haurà
d’haver-hi la descripció, el preu unitari i la quantitat.
*/

class factura {
    constructor(preu, client, ultimaFactura) {
        this.numero = Math.random();
        this.data = Date.now();
        this.import = preu;
        this.client = client;
        this.ultimaFactura = ultimaFactura
    }
}

class facturaServeis extends factura {
    constructor(preu, client, ultimaFactura, serveis) {
        this.super(preu, client, ultimaFactura);
        this.serveis = serveis;
    }
}

class facturaProductes extends factura {
    constructor(preu, client, ultimaFactura, producte) {
        this.super(preu, client, ultimaFactura);
        this.producte = producte;
    }
}

class client {
    constructor(NIF, nom) {
        this.NIF = NIF;
        this.nom = nom;
    }
}

class servei {
    constructor(dataPrestacio, hores, preuHora) {
        this.dataPrestacio = dataPrestacio;
        this.hores = hores;
        this.preuHora = preuHora;
    }
}

class producte {
    constructor(descripcio, preuUnitari, quantitat) {
        this.descripcio = descripcio;
        this.preuUnitari = preuUnitari;
        this.quantitat = quantitat;
    }
}