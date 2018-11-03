class LineObstacle extends Obstacle {
    constructor(x,y, x2, y2) {
        super(x, y);
        this.type = 'line';
        this.x2 = x2;
        this.y2 = y2;
    }

    draw() {
        console.log('drwaing');
        stroke(0,0,0);
        strokeWeight(6);
        line(this.x, this.y, this.x2, this.y2);
    }

    checkCollision(item, buffer=0.1) {
        var d1 = dist(item.x,item.y, this.x,this.y);
        var d2 = dist(item.x,item.y, this.x2,this.y2);

        var lineLen = dist(this.x,this.y, this.x2,this.y2);
        return (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer);
    }
}