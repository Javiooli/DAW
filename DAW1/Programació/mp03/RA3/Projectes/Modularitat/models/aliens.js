export class Alien {
    constructor(width) {
        this.width = width;
        this.alienInvaders = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            30, 31, 32, 33, 34, 35, 36, 37, 38, 39
        ];
        this.aliensRemoved = [];
        this.goingRight = true;
        this.direction = 1;
    }

    /**
     * Moves the alien invaders on the grid.
     */
    move() {
        const activeAliens = this.alienInvaders.filter((_, i) => !this.aliensRemoved.includes(i));
        const leftEdge = activeAliens.some(pos => pos % this.width === 0);
        const rightEdge = activeAliens.some(pos => pos % this.width === this.width - 1);

        // Change direction and move down at edges
        if (rightEdge && this.goingRight) {
            this.direction = -1;
            this.goingRight = false;
            for (let i = 0; i < this.alienInvaders.length; i++) {
                if (!this.aliensRemoved.includes(i)) {
                    this.alienInvaders[i] += this.width; // Move down
                }
            }
        } else if (leftEdge && !this.goingRight) {
            this.direction = 1;
            this.goingRight = true;
            for (let i = 0; i < this.alienInvaders.length; i++) {
                if (!this.aliensRemoved.includes(i)) {
                    this.alienInvaders[i] += this.width; // Move down
                }
            }
        }

        // Horizontal movement
        for (let i = 0; i < this.alienInvaders.length; i++) {
            if (!this.aliensRemoved.includes(i)) {
                this.alienInvaders[i] += this.direction; // Move horizontally
            }
        }
    }

    /**
     * Selects a random active alien to shoot.
     * @returns {number} The position of the alien shooting a laser.
     */
    shootLaser() {
        const activeAliens = this.alienInvaders.filter((_, i) => !this.aliensRemoved.includes(i));
        if (activeAliens.length === 0) return null; // No active aliens left to shoot
        const randomShooterIndex = Math.floor(Math.random() * activeAliens.length);
        return activeAliens[randomShooterIndex];
    }
    areThereAliens(){
        return this.alienInvaders.length==this.aliensRemoved.length;
    }
}
