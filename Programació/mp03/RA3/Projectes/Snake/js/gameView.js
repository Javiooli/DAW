export class GameView {
    static drawSnake(snake){ //Mètode que dibuixa la serp.
        const mapa = document.getElementById("grid"); //Agafem el mapa del html.
        snake.body.forEach(part => { //Executem el mateix per cada part de la serp.
            const partElement = document.createElement("div"); //Creem l'element de la part de la serp.
            partElement.style.gridColumnStart = part.x; //Col·loquem l'element a les coordenades on toqui.
            partElement.style.gridRowStart = part.y;
            partElement.setAttribute("id", "player"); //Afegim la id per què es pinti com s'ha de pintar
            mapa.appendChild(partElement); //Afegim l'element complert al mapa.
        });
    }

    static drawPoints(pointsDisplay, points) { //Mètode que actualitza la puntuació a la vista.
        pointsDisplay.textContent = points; //Simplement actualitza el text de la puntuació amb la puntuació que es passa per argument.
    }

    static drawFruit(fruit) { //Mètode que dibuixa la fruita, no sense abans esborrar tot el mapa per tornar a dibuixar tant la fruita com la serp.
                              //El funcionament és exactament igual que el del mètode que dibuixa la serp, amb la única diferència que només hem de dibuixar 1 element.
        const mapa = document.getElementById("grid");
        mapa.innerHTML = "";
        const fruitElement = document.createElement("div");
        fruitElement.style.gridColumnStart = fruit.x;
        fruitElement.style.gridRowStart = fruit.y;
        fruitElement.setAttribute("id", "fruit");
        mapa.appendChild(fruitElement);
    }

    static drawWinMessage() { //Alerta per quan guanyem.
        alert("Has guanyat!");
    }

    static drawLoseMessage() { //Alerta per quan morim.
        alert("Has mort!");
    }
}