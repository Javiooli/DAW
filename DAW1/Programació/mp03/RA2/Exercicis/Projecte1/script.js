class Tasques {
    
    constructor(){
        this.tasques = [];
        this.count = 0;
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

        //Per últim, afegir element a la llista de la vista.
        ul.appendChild(li);
    }
    
    eliminarTasca(id) {
        //Busquem la tasca a la llista del model.
        let tasca = _.find(this.tasques, { id: id });
        //if (la trobem a la llista interna)...
        if (tasca) {
            //Localitzem la llista de la vista.
            let ul = document.getElementById("llistaTasques");
            //Localitzem l'element a la llista de la vista.
            let li = document.getElementById(tasca.id);
            //Eliminem la tasca de la llista interna.
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
        if (tasca && (titol != "" || desc != "")) {
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

            //Per últim, buidem els camps de la vista.
            document.getElementById("titol").value = "";
            document.getElementById("desc").value = "";

        } else if (!tasca) alert("Tasca no trobada.");
        else alert("No s'ha introduït cap títol ni descripció.");
    }
    
    
}

class Tasca {
    constructor (titol, desc, tasques){
        this.titol = titol;
        this.desc = desc;
        this.compl = false;
        this.id = tasques.count;
        console.log(this.id);
    }

    obtenirDetalls(){
        return `${this.titol} - ${this.desc}`;
    }

    canviarEstat(){
        this.compl = !this.compl;
    }

}

const tasques = new Tasques();

function afegir() {
    //Rebem títol i descripció dels camps de la vista.
    titol = document.getElementById("titol").value;
    desc = document.getElementById("desc").value;

    //Comprovem que s'ha introduït un títol i una descripció.
    if (titol != "") {
        if (desc != "") {
            //Afegim la tasca.
            tasques.afegirTasca(new Tasca(titol, desc, tasques));
            //Buidem els dos camps de la vista.
            document.getElementById("titol").value = "";
            document.getElementById("desc").value = "";
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