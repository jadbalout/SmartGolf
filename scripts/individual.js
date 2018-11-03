class Individual { 
    
    constructor(lifespan, dna=null) {
        this.position = createVector(width/2, height*0.9); //We want it at the bottom(almost) of the canvas
        this.velocity = createVector();
        this.acceleration = createVector();
        this.completed = false;
        this.blocked = false;
        this.distance = 0;
        if(dna) this.dna = dna;
        else this.dna = new IndividualDNA(lifespan);
    }

    updateFrame(target, obstacles, frame) {
        if(dist(this.position.x, this.position.y, target.x, target.y) < target.radius) 
            this.completed = true;
        obstacles.forEach(obstacle => {
            if(obstacle.checkCollision(this.position))
                this.blocked = true;
        });
        if(this.position.x >= width || this.position.y <= 0 || this.position.x <= 0 || this.position.y >= height)
            this.blocked = true;
        if(!this.completed && !this.blocked) {
            this.acceleration.add(this.dna.genes[frame]);
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.acceleration.mult(0); //Reset acceleration
        }
    }

    draw() {
        fill(255,255,255);
        stroke(255,255,255);
        ellipse(this.position.x, this.position.y, 2, 2);
    }

    crossOver(individualB) {
        return this.dna.crossOver(individualB.dna);
    }

    calcFitness(target) {
        //for this fitness ratio, we want it as close as possible to the target(hole)

        this.fitness = dist(this.position.x, this.position.y, target.x, target.y);
        this.fitness = 1/this.fitness;
        this.fitness *= 0.5;
        if(this.crashed)
            this.fitness *= 0.05; //Even worse..
        if(this.completed)
            this.fitness *= 8;
    }

    mutate(mutationRate=0.01) {
        return this.dna.mutate(mutationRate);
    }
}