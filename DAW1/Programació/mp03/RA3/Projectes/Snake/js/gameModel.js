export class GameModel {
    constructor() {
        //El joc sempre comença amb la serp movent-se cap a la dreta i amb 0 punts.
        this.direction = "right";
        this.points = 0;
    }

    updatePosition(snake, fruit) {
        //Si la serp està viva, el joc corre amb normalitat
        if (snake.alive) {
            snake.turn(this.direction); //Girem la serp cap a la direcció pertinent.
            snake.move(); //Movem la serp en la direcció pertinent.
            if (snake.checkCollision(fruit)) this.points += 10; //Comprovem col·lisions, si és amb una fruita el mètode retorna true i augmentem punts.
            if (this.points >= 2000) return "Victoria"; //Comprovació de victòria, quan el jugador acumuli 2000 punts haurà omplert el mapa sencer amb la serp.
            return "Jugant"; //Si no es dona la victòria, retornem "Jugant" que és la condició per continuar executant el bucle principal.
        } else {
            return "Mort"; //Si la serp està morta simnlement retornem "Mort" i el bucle s'interromprà.
        }
    }
}