import { Alien } from "../models/aliens.js";
import { Shooter } from "../models/shooter.js";
import { GridView } from "../views/gridView.js";

export class GameViewModel {
    constructor() {
        this.width = 15;
        this.height = 15;
        this.alien = new Alien(this.width);
        this.shooter = new Shooter(202, this.width);
        this.view = new GridView(this.width, this.height, '.grid');
        this.score = 0;
        this.gameOver = false;
    }

    startGame() {
        this.view.initGrid();
        this.view.updateShooterPosition(this.shooter.currentIndex);
        this.view.updateAlienPositions(this.alien.alienInvaders, this.alien.aliensRemoved);

        document.addEventListener('keydown', e => this.handleInput(e));
        setInterval(() => this.updateGame(), 600);
        setInterval(() => this.alienShoot(), 1000); // Aliens shoot every second
    }

    handleInput(e) {
        if (this.gameOver) return;

        switch (e.key) {
            case 'ArrowLeft':
                this.shooter.moveLeft();
                break;
            case 'ArrowRight':
                this.shooter.moveRight();
                break;
            case 'ArrowUp':
                this.shootLaser();
                break;
        }

        this.view.updateShooterPosition(this.shooter.currentIndex);
    }

    updateGame() {
        this.alien.move();
        this.checkCollisions();
        this.view.updateAlienPositions(this.alien.alienInvaders, this.alien.aliensRemoved);
        if (this.alien.alienInvaders.some(pos => pos >= this.width * this.height)) {
            this.gameOver = true;
            alert('Game Over');
        }
    }

    alienShoot() {
        const laserIndex = this.alien.shootLaser();
        if (laserIndex === null) {
            // Stop all shooting if no active aliens remain
            clearInterval(this.alienShootingInterval);
            return;
        }
        let currentLaserIndex = laserIndex;
    
        const laserInterval = setInterval(() => {
            // Remove the laser from the current position (if valid)
            if (currentLaserIndex >= 0 && currentLaserIndex < this.view.squares.length) {
                this.view.updateAlienLaserPosition(currentLaserIndex, true);
            }
    
            // Move the laser down
            currentLaserIndex += this.width;
    
            // Stop if the laser goes out of bounds
            if (currentLaserIndex < 0 || currentLaserIndex >= this.view.squares.length) {
                clearInterval(laserInterval);
                return;
            }
    
            // Add the laser to the new position (if valid)
            if (currentLaserIndex >= 0 && currentLaserIndex < this.view.squares.length) {
                this.view.updateAlienLaserPosition(currentLaserIndex);
            }
    
            // Check collision with the shooter (ensure square exists)
            if (this.view.squares[currentLaserIndex] && this.view.squares[currentLaserIndex].classList.contains('shooter')) {
                this.view.squares[currentLaserIndex].classList.remove('shooter');
                this.view.squares[currentLaserIndex].classList.add('boom');
                this.gameOver = true;
                alert('Game Over');
                clearInterval(laserInterval);
            }
        }, 200);
    }

    shootLaser() {
        let laserIndex = this.shooter.shoot();
        const laserInterval = setInterval(() => {
            this.view.squares[laserIndex].classList.remove('laser');
            laserIndex -= this.width;
            if (laserIndex < 0) {
                clearInterval(laserInterval);
                return;
            }
            this.view.squares[laserIndex].classList.add('laser');

            if (this.view.squares[laserIndex].classList.contains('invader')) {
                this.view.squares[laserIndex].classList.remove('laser', 'invader');
                const alienIndex = this.alien.alienInvaders.indexOf(laserIndex);
            
                if (!this.alien.aliensRemoved.includes(alienIndex)) {
                    this.alien.aliensRemoved.push(alienIndex);
                    this.score++;
                    this.view.updateScore(this.score);
            
                    // Check if all aliens are removed
                    if (this.alien.aliensRemoved.length === this.alien.alienInvaders.length) {
                        alert('You Win!');
                    }
                }
                clearInterval(laserInterval);
            }
        }, 100);
    }

    checkCollisions() {
        if (this.view.squares[this.shooter.currentIndex].classList.contains('invader')) {
            this.gameOver = true;
            alert('Game Over');
        }
    }
}
