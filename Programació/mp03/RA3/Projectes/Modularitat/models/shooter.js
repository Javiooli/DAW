export class Shooter {
    constructor(startIndex, width) {
        this.currentIndex = startIndex;
        this.width = width;
    }

    moveLeft() {
        if (this.currentIndex % this.width !== 0) this.currentIndex -= 1;
    }

    moveRight() {
        if (this.currentIndex % this.width < this.width - 1) this.currentIndex += 1;
    }

    shoot() {
        return this.currentIndex;
    }
}
