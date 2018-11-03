class IndividualDNA {
    constructor(lifespan) {
        this.lifespan = lifespan;
        this.genes = [];
        for(var i=0; i < lifespan; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(0.1);
        }
        
    }
    crossOver(individualB) {
        //We'll use midpoints for cross overs
        let child = new IndividualDNA(this.lifespan);
        let mid = Math.floor(random(this.genes.length));
        for (var i = 0; i < this.genes.length; i++) {
            child.genes[i] = i > mid ? this.genes[i] : individualB.genes[i];
        }
        return child;
    }
    mutate(mutationRate) {
        for (var i = 0; i < this.genes.length; i++) {
            if(Math.random() < mutationRate) {
                //Create a random new direction vector
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(0.1);
            }
        }
    }
}