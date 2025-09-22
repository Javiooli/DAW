const N=15;
const taula=new Array();
let fila=new Array();
// Funció per destacar les caselles amb el mateix valor
function destacarCaselles(taula, valor) {
    let comptador = 0;
    // Elimino els estils anteriors
    document.querySelectorAll("td").forEach(cella => {
        cella.classList.remove("selected", "highlighted");
    });
    // Recòrrer la taula per destacar les caselles
    const taulaHTML = document.querySelectorAll("tr");
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const cellaHTML = taulaHTML[i].children[j];
            if (taula[i][j]==valor) {
                cellaHTML.classList.add("highlighted");
                comptador++;
            }
            
        }
    }
    console.log(`Hem trobat ${comptador} elements ${valor}.`);
}
document.addEventListener("DOMContentLoaded",()=>{
    let i=0;
    while(i<N){
       fila=[];
        let j=0;
        while(j<N){
            fila.push(Math.round(Math.random()*100))
            j++;
        }
        taula.push(fila);
        i++;
    }
// bucle per mostrar per console.log la taula
    for(let i=0;i<N;i++){//bucle per visitar les files
        let row="";
        for(let j=0;j<N;j++){//bucle per visitar les cel·les
            row+=`|${taula[i][j]}`
        }
        row+=`|`;
        console.log(row);
    }
    const taulaHTMl = document.createElement('table');
    taulaHTMl.style.border="1px solid #000";
    for(let i=0;i<N;i++){// bucle per visitar les files
        const filaHTML = document.createElement('tr');
// aquí he d'afegir els elements tr, per afegir les files de la taula
        for(let j=0;j<N;j++){//bucle per visitar les cel·les
// aquí he d'afegir els elements td, per afegir les cel·les de la taula
            const cellaHTML = document.createElement('td');
            const textCellaHTML = document.createTextNode(taula[i][j]);
            cellaHTML.appendChild(textCellaHTML);
            //cellaHTML.style.border="1px solid #000";
            filaHTML.appendChild(cellaHTML);
            cellaHTML.addEventListener("click", ()=>{
                destacarCaselles(taula, taula[i][j]);
            });
        }
        taulaHTMl.appendChild(filaHTML);
    }
    document.getElementById("taula").appendChild(taulaHTMl);
});

setInterval(()=>{
    destacarCaselles(taula, Math.round(Math.random()*100));
}, 1);
