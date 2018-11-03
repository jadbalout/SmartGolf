class EllipseObstacle extends Obstacle {
    constructor(x,y, radiusX, radiusY) {
        super(x, y);
        this.type = 'ellipse';
        this.radiusX = radiusX;
        this.radiusY = radiusY;
    }

    draw() {
        ellipse(this.x, this.y, this.radiusX, this.radiusY);
    }

    checkCollision(item) {
        let xRatio = Math.pow(item.x - this.x, 2)/Math.pow(this.radiusX, 2);
        let yRatio = Math.pow(item.y - this.y, 2)/Math.pow(this.radiusY, 2);
        return (xRatio + yRatio) <= 0.3; //0.3 seems to work??
    }
}