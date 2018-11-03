class RectangleObstacle extends Obstacle {
    constructor(x,y, width, height) {
        super(x, y);
        this.type = 'ellipse';
        this.width = width;
        this.height = height;
    }

    draw() {
        rect(this.x, this.y, this.width, this.height);
    }

    checkCollision(item) {
        return (item.x >= this.x &&
            item.x < this.x + this.width &&
            item.y >= this.y &&
            item.y < this.y + this.height)
    }
}