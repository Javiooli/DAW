import { GameModel } from "./gameModel.js";
import { GameView } from "./gameView.js";
import { Snake } from "./snake.js"
import { Fruit } from "./fruit.js";

export class GameViewModel {
    constructor() {
        this.gameModel = new GameModel();
        this.snake = new Snake();
        this.fruit = new Fruit(this.snake);
        this.player = document.getElementById("player");
        this.pointsDisplay = document.getElementById("points");
        this.generalState = true; //Aquesta variable ens permetrà o bé executar el bucle o bé interrompre'l en cas de victòria o mort.

    }

    registerKey(key) {
        if (this.snake.canTurn) { //Si la serp està "girant", no permetem l'entrada per evitar cancel·lar moviments
                                  //(per exemple si la serp es mou cap a la dreta i polsem ràpidament avall i dreta, si permetessim l'entrada la serp no aniria cap avall).
            if (key === "ArrowRight" || key === "D" || key === "d")     { this.gameModel.direction = "right"; this.snake.canTurn = false; }
            else if (key === "ArrowLeft" || key === "A" || key === "a") { this.gameModel.direction = "left"; this.snake.canTurn = false; }
            else if (key === "ArrowUp" || key === "W" || key === "w")   { this.gameModel.direction = "up"; this.snake.canTurn = false; }
            else if (key === "ArrowDown" || key === "S" || key === "s") { this.gameModel.direction = "down"; this.snake.canTurn = false; }
        }
    }

    updateState() { //Actualització del joc, on el cas principal crida els mètodes per dibuixar serp, fruita i punts, i retornarà la velocitat del joc al bucle principal.
        this.generalState = this.gameModel.updatePosition(this.snake, this.fruit);
        if (this.generalState === "Jugant") {
            GameView.drawFruit(this.fruit);
            GameView.drawSnake(this.snake);
            GameView.drawPoints(this.pointsDisplay, this.gameModel.points);
            return (this.gameModel.points > 0 ? Math.log(this.gameModel.points) : 2); //He escollit una escala logarítmica per que no sigui impossible evitar la mort amb puntuacions altes.
        }
        else if (this.generalState === "Mort") { //En cas que morim, cridem l'alerta i reiniciem tots els elements del joc. El fet de retornar 1 és perquè em quedo més tranquil si redueixo la velocitat del joc al mínim, encara que no calgui.
            GameView.drawLoseMessage();
            this.gameModel = new GameModel();
            this.snake = new Snake();
            this.fruit = new Fruit(this.snake);
            this.gameModel.points = 0;
            return 1;
        } else {    //En cas que guanyem, el mateix que quan es mor però l'alerta que es crida és la d'haver guanyat.
            GameView.drawWinMessage();
            this.gameModel = new GameModel();
            this.snake = new Snake();
            this.fruit = new Fruit(this.snake);
            this.gameModel.points = 0;
            return 1;
        }
    }
}