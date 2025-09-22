// Classe Partit
class Partit {
  constructor(jugador1, jugador2, puntsJugador1, puntsJugador2, data) {
    this.jugador1 = jugador1;
    this.jugador2 = jugador2;
    this.puntsJugador1 = puntsJugador1;
    this.puntsJugador2 = puntsJugador2;
    this.data = data;
  }

  // Retorna els punts totals d’un partit
  calculaPuntsTotals() {
    return this.puntsJugador1 + this.puntsJugador2;
  }
}

// Classe Campionat
class Campionat {
  constructor(nom) {
    this.nom = nom;
    this.llistaPartits = [];
  }

  // Afegeix un partit a la llista
  afegeixPartit(partit) {
    this.llistaPartits.push(partit);
    this.actualitzaEstadistiques();
  }

  // Elimina un partit per data
  eliminaPartitPerData(data) {
    this.llistaPartits = this.llistaPartits.filter(
      (partit) => partit.data !== data
    );
    this.actualitzaEstadistiques();
  }

  // Actualitza les estadístiques del campionat
  actualitzaEstadistiques() {
    document.getElementById("num-partits").textContent =
      this.llistaPartits.length;
    this.mostraPartits();
  }

  // Mostra els partits en pantalla
  mostraPartits(filtered = false) {
    const llistaPartits = document.getElementById("partits-list");
    llistaPartits.innerHTML = ""; // Neteja la llista
    const llista = (filtered ? this.llistaFiltrada : this.llistaPartits);
    llista.forEach((partit) => {
      const li = document.createElement("li");
      li.textContent = `${partit.data}: ${partit.jugador1} (${partit.puntsJugador1}) vs ${partit.jugador2} (${partit.puntsJugador2})`;
      llistaPartits.appendChild(li);
    });
  }

  // Mètode pendent: Ordena els partits per data (obligatoriament amb Lodash)
  // TODO: Implementar utilitzant Lodash _.orderBy()
  // Javi: Amb Lodash és tan senzill com fer un bon ús del mètode i després cridar "mostraPartits()" per actualitzar la llista.
  ordenaPartitsPerData() {
    this.llistaPartits = _.orderBy(this.llistaPartits, ['data'], ['asc']);
    this.mostraPartits();
  }

  // Mètode pendent: Busca partits d'un jugador concret
  // TODO: Retornar els partits en què jugui el jugador especificat
  /* 
    Javi: Amb Lodash utilitzava el mètode filter amb una funció com a condició on retornem el partit en cas que el nom d'algun dels jugadors coincideixi amb el
    que passem per paràmetre del mètode. A més, he implementat a la funció "mostraPartits()" un paràmetre que en cas de ser false mostra la llista sencera, pero
    en cas de ser true mostra la llista filtrada que generaríem en aquesta funció. Com que només es cridará amb true des de dins d'aquesta funció, controlem que
    mai es cridi sense que this.llistaFiltrada existeixi.
    Per fer-ho sense Lodash, itero amb un bucle forEach per tots els partits de this.llistaPartits i si el paràmetre nomJugador coincideix amb el nom d'algun
    dels dos jugadors del partit, afegim aquest partit a la llista filtrada, prèviament buidada.
    Com a últim apunt, només filtrem la llista i cridem "mostraPartits(true)" si es passa un nom per paràmetre, en cas negatiu es crida "mostraPartits()" per mostrar
    la llista sense filtrar.
  */
  buscaPartitsPerJugador(nomJugador) {
    if (nomJugador) {
      /*Versió amb Lodash
        this.llistaFiltrada = _.filter(this.llistaPartits, (partit) => {
        if (partit.jugador1 === nomJugador || partit.jugador2 === nomJugador) 
          return partit
        });

      //_.forEach(this.llistaFiltrada, (partit) => alert(partit.data)); Test per debugejar*/

      //Versió sense Lodash.
      this.llistaFiltrada = []
      this.llistaPartits.forEach((partit) => {
        if (partit.jugador1 === nomJugador || partit.jugador2 === nomJugador) {
          this.llistaFiltrada.push(partit);
        }
      });

      this.mostraPartits(true); //Actualitzem la vista de la llista amb la llista filtrada.
      return this.llistaFiltrada; //Retornem la llista filtrada

    } else this.mostraPartits(); //Actualitzem la vista de la llista amb la llista completa de tots els partits.

  }

  // Mètode pendent: Troba el partit amb més punts totals
  // TODO: Retornar el partit amb la suma de punts més alta
  /* 
    Javi: Utilitzant un for iterem per tota la llista de partits, quedant-nos amb aquell que té la major suma de punts, per després retornar-lo.
  */
  static trobaPartitAmbMesPunts(llistaPartits) {
    let puntsMax = 0, partitMax; //puntsMax: enter que guardarà el màxim de suma de punts que hagim trobat. partitMax: objecte Partit que hem determinat té la major suma de punts.
    
    for (let i = 0; i < llistaPartits.length; i++) {    //Iterem per tots els elements de llistaPartits, compararem si els punts d'aquell partit
      let partit = llistaPartits[i];                    //són majors que el que havíem emmagatzemat com a major suma de punts i en cas positiu l'emmagatzemem;
      let punts = partit.calculaPuntsTotals();          //en cas negatiu continuem.
      if (punts > puntsMax) {                 
        puntsMax = punts;
        partitMax = partit;
      }
    }
    return partitMax; //Retornem aquell partit que hem determinat que té el màxim de punts totals.
  }
}

// Inicialitza el campionat
const campionat = new Campionat("Campionat Local");

// Gestió del formulari
document
  .getElementById("formulari-partit")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const jugador1 = document.getElementById("jugador1").value;
    const jugador2 = document.getElementById("jugador2").value;
    const puntsJugador1 = parseInt(
      document.getElementById("puntsJugador1").value,
      10
    );
    const puntsJugador2 = parseInt(
      document.getElementById("puntsJugador2").value,
      10
    );
    const data = document.getElementById("data").value;

    const partit = new Partit(
      jugador1,
      jugador2,
      puntsJugador1,
      puntsJugador2,
      data
    );
    campionat.afegeixPartit(partit);

    // Reseteja el formulari
    event.target.reset();
  });

// Event per ordenar partits per data
document.getElementById("ordena-partits").addEventListener("click", () => {
  campionat.ordenaPartitsPerData();
});

// Event per buscar partits d'un jugador
document.getElementById("busca-partits").addEventListener("click", () => {
  const nomJugador = document.getElementById("nom-jugador").value;
  const partitsJugador = campionat.buscaPartitsPerJugador(nomJugador);
  console.log(`Partits de ${nomJugador}:`, partitsJugador);
});
// Event per trobar el partit amb més punts
document.getElementById("partit-mes-punts").addEventListener("click", () => {
  const partitMesPunts = Campionat.trobaPartitAmbMesPunts(
    campionat.llistaPartits
  );
  if (partitMesPunts) {
    console.log("Partit amb més punts:", partitMesPunts);
    alert(
      `Partit amb més punts:\n${partitMesPunts.data}: ${partitMesPunts.jugador1} (${partitMesPunts.puntsJugador1}) vs ${partitMesPunts.jugador2} (${partitMesPunts.puntsJugador2})`
    );
  } else {
    alert("No hi ha partits disponibles.");
  }
});
