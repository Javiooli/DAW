class Tasques {
    
    constructor(){
        this.tasques = [];
        this.count = 0;
        this.carregarTasques();
    }

    // Funció creada per poder comprovar que no s'afegeixen duplicats.
    cercarTasca(titol) {
        this.tasques.forEach(tasca => {
            if (tasca.titol == titol)
                return tasca;
        });
        return false;
    }

    carregarTasques() {
        for (let index = 0; index < localStorage.length; index++) {
            const desc = localStorage.getItem(localStorage.key(index));
            //Afegim la tasca.
            this.afegirTasca(new Tasca(localStorage.key(index), desc, this));
        }
    }
    
    guardarTasca(tasca){
        localStorage.setItem(tasca.titol, tasca.desc);
    }

    afegirTasca(tasca){
        //Afegir tasca a la llista interna de tasques.
        this.tasques.push(tasca);
        console.log(`Tasca afegida: ${tasca.obtenirDetalls()})`);
        console.log("Tasques actuals: ", this.tasques.map(tasca => tasca.obtenirDetalls()));

        //Localitzar llista de tasques de la vista.
        let ul = document.getElementById("llistaTasques");

        //Crear element per afegir a la llista de la vista.
        let li = document.createElement("li");
        li.className = 'tasca';
        li.setAttribute("id", this.count);
        this.count += 1;
        li.textContent = tasca.obtenirDetalls();

        //Crear i afegir botó de completar a l'element.
        let botoCompletar = document.createElement('button');
        botoCompletar.className = "Completar"; 
        botoCompletar.innerText = "Completar";
        botoCompletar.setAttribute("onClick", `completar(${tasca.id})`);
        li.appendChild(botoCompletar);

        //Crear i afegir botó d'eliminar a l'element.
        let botoEliminar = document.createElement('button');
        botoEliminar.className = "Eliminar"; 
        botoEliminar.innerText = "Eliminar"
        botoEliminar.setAttribute("onClick", `eliminar(${tasca.id})`);
        li.appendChild(botoEliminar);

        //Crear i afegir botó d'editar a l'element.
        let botoEditar = document.createElement('button');
        botoEditar.className = "Modificar"; 
        botoEditar.innerText = "Modificar"
        botoEditar.setAttribute("onClick", `modificar(${tasca.id})`);
        li.appendChild(botoEditar);

        //Crear i afegir comptador i botons per augmentar o reduïr el comptador.
        let comptador = document.createElement('button');
        comptador.className = "comptador";
        comptador.innerHTML = tasca.comptador;

        let botoAugmentarComptador = document.createElement('button');
        botoAugmentarComptador.className = "comptadorBtn";
        botoAugmentarComptador.innerText = "⬆️";
        botoAugmentarComptador.setAttribute("onClick", `augmentarTasca(${tasca.id})`);
        li.appendChild(botoAugmentarComptador);

        li.appendChild(comptador);

        let botoRestarComptador = document.createElement('button');
        botoRestarComptador.className = "comptadorBtn";
        botoRestarComptador.innerText = "⬇️";
        botoRestarComptador.setAttribute("onClick", `restarTasca(${tasca.id})`);
        li.appendChild(botoRestarComptador);

        //Per últim, afegir element a la llista de la vista.
        ul.appendChild(li);
    }
    
    eliminarTasca(id) {
        //Busquem la tasca a la llista del model.
        let tasca = _.find(this.tasques, { id: id });
        //if (la trobem a la llista interna)...
        if (tasca) {
            localStorage.removeItem(tasca.titol);
            //Localitzem la llista de la vista.
            let ul = document.getElementById("llistaTasques");
            //Localitzem l'element a la llista de la vista.
            let li = document.getElementById(tasca.id);
            //Eliminem la tasca de la llista interna.
            localStorage.removeItem(tasca.titol);
            _.remove(this.tasques, (tasca) => tasca.id === id);
            //Eliminem la tasca de la llista de la vista.
            ul.removeChild(li);
            console.log("Tasques actuals: ", this.tasques.map(t => t.obtenirDetalls()));
        } else alert("Tasca no trobada.");
    }

    completarTasca(id) {
        //Busquem la tasca a la llista del model.
        let tasca = _.find(this.tasques, { id: id });
        //if (la trobem a la llista interna)...
        if (tasca) {
            tasca.canviarEstat();
            //Canviem el text a verd en cas de completar-la, blanc en cas de marcar-la com a no completada.
            document.getElementById(tasca.id).style = (tasca.compl ? "color: green; text-decoration: line-through; text-decoration-thickness: 10%" : "color: white; text-decoration: none;");
            console.log(tasca.obtenirDetalls() + " estat nou: " + tasca.compl);
        } else alert("Tasca no trobada.");
    }

    modificarTasca(id) {
        //Busquem la tasca a la llista del model.
        let tasca = _.find(this.tasques, { id: id });

        //Localitzem la tasca a la llista de la vista.
        let li = document.getElementById(tasca.id);

        //Rebem el titol i la descripció escrits als camps de la vista.
        let titol = document.getElementById("titol").value;
        let desc = document.getElementById("desc").value;
        //if (la trobem a la llista interna)...
        if (tasca && (titol != "" && desc != "")) {
            //Si rebem un títol, el modifiquem.
            if (titol) tasca.titol = titol;

            //Si rebem una descripció, la modifiquem.
            if (desc) tasca.desc = desc;
            console.log(tasca.obtenirDetalls());

            //Per últim, modifiquem la tasca a la vista.
            li.textContent = tasca.obtenirDetalls();

            //Crear i afegir botó de completar a l'element.
            let botoCompletar = document.createElement('button');
            botoCompletar.className = "Completar"; 
            botoCompletar.innerText = "Completar";
            botoCompletar.setAttribute("onClick", `completar(${tasca.id})`);
            li.appendChild(botoCompletar);

            //Crear i afegir botó d'eliminar a l'element.
            let botoEliminar = document.createElement('button');
            botoEliminar.className = "Eliminar"; 
            botoEliminar.innerText = "Eliminar"
            botoEliminar.setAttribute("onClick", `eliminar(${tasca.id})`);
            li.appendChild(botoEliminar);

            //Crear i afegir botó d'editar a l'element.
            let botoEditar = document.createElement('button');
            botoEditar.className = "Modificar"; 
            botoEditar.innerText = "Modificar"
            botoEditar.setAttribute("onClick", `modificar(${tasca.id})`);
            li.appendChild(botoEditar);

            //Crear i afegir comptador i botons per augmentar o reduïr el comptador.
            let botoAugmentarComptador = document.createElement('button');
            botoAugmentarComptador.className = "comptadorBtn";
            botoAugmentarComptador.innerText = "⬆️";
            botoAugmentarComptador.setAttribute("onClick", `augmentarTasca(${tasca.id})`);
            li.appendChild(botoAugmentarComptador);

            let comptador = document.createElement('p');
            comptador.className = "comptador";
            comptador.innerHTML = tasca.comptador;
            li.appendChild(comptador);

            let botoRestarComptador = document.createElement('button');
            botoRestarComptador.className = "comptadorBtn";
            botoRestarComptador.innerText = "⬇️";
            botoRestarComptador.setAttribute("onClick", `restarTasca(${tasca.id})`);
            li.appendChild(botoRestarComptador);

            //Per últim, buidem els camps de la vista.
            document.getElementById("titol").value = "";
            document.getElementById("desc").value = "";

        } else if (!tasca) alert("Tasca no trobada.");
        else alert("No s'ha introduït cap títol ni descripció.");
    }

    augmentarTasca(id) {
        //Busquem la tasca a la llista del model.
        let tasca = _.find(this.tasques, { id: id });
        tasca.afegirComptador();
    }
    
    restarTasca(id) {
        //Busquem la tasca a la llista del model.
        let tasca = _.find(this.tasques, { id: id });
        tasca.restarComptador();
    }
}

class Tasca {
    constructor (titol, desc, tasques){
        this.titol = titol;
        this.desc = desc;
        this.compl = false;
        this.id = tasques.count;
        this.comptador = 1;
        console.log(this.id);
    }

    obtenirDetalls(){
        return `${this.titol} - ${this.desc}`;
    }

    canviarEstat(){
        this.compl = !this.compl;
    }

    afegirComptador() {
        this.comptador++;
    }

    restarComptador() {
        this.comptador--;
    }

}

const tasques = new Tasques();

function afegir() {
    //Rebem títol i descripció dels camps de la vista.
    titol = document.getElementById("titol").value;
    desc = document.getElementById("desc").value;

    //Comprovem que s'ha introduït un títol i una descripció.
    if (titol != "") { // Aixi assegurem que no es poden afegir elements en blanc
        if (desc != "") {
            if (tasques.cercarTasca(titol) == false) { // Comprovem que no existeix cap tasca amb el mateix títol.
                //Afegim la tasca.
                let tasca = new Tasca(titol, desc, tasques);
                tasques.guardarTasca(tasca);
                tasques.afegirTasca(tasca);
                //Buidem els dos camps de la vista.
                document.getElementById("titol").value = "";
                document.getElementById("desc").value = "";
            }
            else alert("Ja hi ha una tasca amb el mateix títol.")
        } else alert("Si us plau, introdueix una descripció.");
    } else alert("Si us plau, introdueix el títol.");
}

function eliminar(id){
    tasques.eliminarTasca(id);
}

function completar(id){
    tasques.completarTasca(id);
}

function modificar(id){
    tasques.modificarTasca(id);
}

function augmentarTasca(id) {
    let tasca = _.find(tasques.tasques, { id: id });
    if (!tasca) return;
    tasques.augmentarTasca(id);
    let li = document.getElementById(id);
    let comptador = li ? li.querySelector('.comptador') : null;
    if (comptador) comptador.innerText = tasca.comptador;
}

function restarTasca(id) {
    let tasca = _.find(tasques.tasques, { id: id });
    if (!tasca) return;
    tasques.restarTasca(id);
    let li = document.getElementById(id);
    let comptador = li ? li.querySelector('.comptador') : null;
    if (comptador) comptador.innerText = tasca.comptador;
}