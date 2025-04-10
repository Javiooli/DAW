export class Fruit {
    constructor(snake) {
        //La única dada que necessitem de la fruita és la seva posició, que es genera aleatòriament tant quan es crea com cada cop que la serp menja.
        this.randomPos(snake);
    }
      
    randomPos(snake) {
        let posIncorrecte = false;
        //Generem les dues coordenades aleatòriament.
        this.x = Math.floor(Math.random() * 20) + 1;
        this.y = Math.floor(Math.random() * 10) + 1;
        //Comprovem que la nova posicio de la fruita no coincideixi amb la serp. Si coincideix, la funció es crida a si mateixa.
        //per tornar a generar una nova posició.
        snake.body.forEach(part => {
            if (part.x === this.x && part.y === this.y) {
                posIncorrecte = true;
            }
        });

        if (posIncorrecte) this.randomPos(snake); //Crida recursiva
    }
}