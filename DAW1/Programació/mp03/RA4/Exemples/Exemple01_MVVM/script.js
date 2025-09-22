
const N=7;

class ABC {
    constructor() {
        this.num = Math.round(Math.random() * 100);
    }

    get getNum() {
        return this.num;
    }

    show() {
        return this.num;
    }
}

class LlistaABC {
    constructor(n) {
        this.llista = [];
        for (let i = 0; i < n; i++) {
            this.llista.push(new ABC());
        }
    }

    getLlista() {
        return this.llista;
    }

    showLlista() {
        let result="";
        for( let i=0;i<this.llista.length-1;i++){
            result+=this.llista[i].getNum + ", ";
        }
        result+=this.llista[this.llista.length-1].getNum + ".";
        return result;
//        return this.llista.map(obj => obj.show()).join(", ");
    }

    bubbleSort() {
        const array = this.llista;
        for (let i = 1; i < array.length; i++) {
            for (let j = 0; j < array.length - i; j++) {
                if (array[j].getNum > array[j + 1].getNum) {
                    let aux = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = aux;
                }
            }
        }
    }

    insertionSort() {
        const array = this.llista;
        for (let i = 1; i < array.length; i++) {
            let key = array[i];
            let keyValue = key.getNum;
            let j = i - 1;
            while (j >= 0 && array[j].getNum > keyValue) {
                array[j + 1] = array[j];
                j = j - 1;
                array[j + 1] = key;
            }
        }
        return array;
    }
}

class ViewModel {
    constructor(n) {
        this.llistaABC = new LlistaABC(n); // Model
    }

    getUnsortedList() {
        return this.llistaABC.showLlista();
    }

    sortList() {
        this.llistaABC.insertionSort();
    }

    getSortedList() {
        return this.llistaABC.showLlista();
    }
}

class View {
    constructor(viewModel) {
        this.viewModel = viewModel;

        // Elements de la vista
        this.unsortedListElement = document.getElementById("unsorted-list");
        this.sortedListElement = document.getElementById("sorted-list");
        this.sortButton = document.getElementById("sort-button");

        // Inicialitzem la vista
        this.initializeView();
    }

    initializeView() {
        // Mostrem la llista desordenada inicialment
        this.unsortedListElement.textContent += this.viewModel.getUnsortedList();

        // Configurem l'event del botó
        this.sortButton.addEventListener("click", () => {
            this.viewModel.sortList(); // Ordenem la llista
            this.sortedListElement.textContent += this.viewModel.getSortedList(); // Mostrem la llista ordenada
            this.sortButton.disabled = true; // Desactivem el botó després d'ordenar
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const viewModel = new ViewModel(N); // Creem el ViewModel amb 7 objectes
    const view = new View(viewModel);  // Enllacem el ViewModel amb la View
});
