export class Snake {
    constructor() {
        this.alive = true; //Booleà que marca si la serp continua viva.
        this.counter = 0; //Enter que utilitzarem per eliminar les parts quan toqui.
        this.body = [{ x:1, y:1 }] //Array de les parts que iniciem amb 1 sola part a la posició inicial.
        this.direction = "right"; //Direcció inicial que no puc fer null perquè em causa errors.
        this.canTurn = true; //Booleà que ens permetrà restringir el gir de la serp entre frames per evitar que pugui girar sobre si mateixa.
    }

    move() {
        //Busquem el cap de la serp i calculem la seva nova posició.
        let head = { ...this.body[0] };
        switch (this.direction) { //Cada case es una direcció, i depenent de la direcció sumarem o restarem 1 a la coordenada pertinent.
            case "right":
                head.x++;
                break;
            case "left":
                head.x--;
                break;
            case "up":
                head.y--;
                break;
            case "down":
                head.y++;
                break;
        }

        //Afegim el nou cap i eliminem la cua si no hem menjat.
        this.body.unshift(head);
        if (this.counter <= 0) {
                this.body.pop();
            } else {
                this.counter--;
            }
        //Ja hem actualitzat la posició de la serp així que ja pot tornar a girar.
        this.canTurn = true;
    }

    turn(newDirection) {
        //Només modificarem la direcció de la serp quan la nova direcció no sigui la contrària a la que s'està movent en el moment.
        const opposites = {right: "left", left: "right", up: "down", down: "up"};
        if (newDirection !== opposites[this.direction]) {
            this.direction = newDirection;
        }
    }

    grow() {
        //Augmentem el comptador en 1 per que les parts durin un frame més, augmentant la llargada de la serp.
        this.counter++;
    }

    die() {
        //Simplement tornem el booleà a false.
        this.alive = false;
    }

    checkCollision(fruit) {
        //Trobem el cap
        const head = this.body[0];
        //Comprovem si el cap coincideix amb una paret
        if (head.x < 1 || head.x > 20 || head.y < 1 || head.y > 10) {
            this.die();
        }
          
        //Col·lisions amb el propi cos
        for (let i = 1; i < this.body.length; i++) {
            if (this.body[i].x === head.x && this.body[i].y === head.y) {
                this.die();
            }
        }
        

        //Col·lisió amb la fruita
        if (head.x === fruit.x && head.y === fruit.y) {
            this.grow();
            fruit.randomPos(this);
            return true;
        }
    }



}