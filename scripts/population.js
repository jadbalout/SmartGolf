class Population {
    constructor(targetOrds, mutationRate, populationCount, lifespan, obstacles=[]) {
        this.generation = 0;
        this.target = targetOrds;
        this.mutationRate = mutationRate;
        this.populationCount = populationCount;
        this.population = [];
        for(var i=0; i < this.populationCount; i++) {
            this.population.push(new Individual(lifespan));
        }
        this.matingPool = [];
        this.best = {};
        this.lifespan = lifespan;
        this.obstacles = obstacles;
        this.calcFitness();
    }

    getIndividualsCompleted() {
        var i =0;
        this.population.forEach(function(individual) {
            i += int(individual.completed);
        });
        return i;
    }

    getIndividualsBlocked() {
        var i =0;
        this.population.forEach(function(individual) {
            i += int(individual.blocked);
        });
        return i;
    }

    updateFrame(counter) {
        var self = this;
        this.population.forEach(function(individual){
            individual.updateFrame(self.target, self.obstacles, counter);
            individual.draw();
        });
      }

    calcFitness() {
        for(var i=0; i <this.population.length; i++) {
            this.population[i].calcFitness(this.target);
        }
    }

    naturalSelection() {
        this.matingPool = [];
        var maxFitness = 0;
        for (let i = 0; i < this.population.length; i++)
          if (this.population[i].fitness > maxFitness)
            maxFitness = this.population[i].fitness;
        for (let i = 0; i < this.population.length; i++) {
            let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 100);
            for (let j = 0; j < fitness; j++)
                this.matingPool.push(this.population[i]);
        }
    
    }

    generate() {
        this.generation++;
        for (let i = 0; i < this.population.length; i++) {
          let a = Math.floor(random(this.matingPool.length));
          let b = Math.floor(random(this.matingPool.length));
          let partnerA = this.matingPool[a];
          let partnerB = this.matingPool[b];
          let child = partnerA.crossOver(partnerB);
          child.mutate(this.mutationRate);
          this.population[i] = new Individual(this.lifespan, child);
        }
    }

    getMostFit() {
        let worldRecord = 0.0;
        let index = 0;
        for (let i = 0; i < this.population.length; i++) {
          if (this.population[i].fitness > worldRecord) {
            index = i;
            worldRecord = this.population[i].fitness;
          }
        }
    
        this.best = this.population[index];
    }
}