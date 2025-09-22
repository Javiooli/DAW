export class GridView {
    constructor(width, height, containerSelector) {
        this.width = width;
        this.height = height;
        this.container = document.querySelector(containerSelector);
        this.squares = [];
    }

    initGrid() {
        for (let i = 0; i < this.width * this.height; i++) {
            const square = document.createElement('div');
            this.container.appendChild(square);
            this.squares.push(square);
        }
    }

    updateAlienPositions(alienPositions, removedPositions) {
        this.squares.forEach(square => square.classList.remove('invader'));
        alienPositions.forEach((pos, i) => {
            if (!removedPositions.includes(i)) this.squares[pos].classList.add('invader');
        });
    }

    updateShooterPosition(index) {
        this.squares.forEach(square => square.classList.remove('shooter'));
        this.squares[index].classList.add('shooter');
    }

    updateAlienLaserPosition(currentLaserIndex, remove = false) {
        if (currentLaserIndex < 0 || currentLaserIndex >= this.squares.length) {
            console.warn(`Invalid laser index: ${currentLaserIndex}`);
            return; // Skip invalid indices
        }
        if (remove) {
            this.squares[currentLaserIndex].classList.remove('laser2');
        } else {
            this.squares[currentLaserIndex].classList.add('laser2');
        }
    }
    

    updateScore(score) {
        document.querySelector('.results').textContent = score;
    }
}
