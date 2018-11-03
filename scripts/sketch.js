var population;
var lifespan = 500;
var counter = 0;
var bg;
function setup() {
    createCanvas(467, 350);
    population = new Population(createVector(width/2, height/4), 0.001, 200, lifespan);
    population.target.radius = 20;
}

function draw() {
    clear();
    background(26, 166, 4);
    fill(0,0,0);
    noStroke();
    ellipse(population.target.x, population.target.y, population.target.radius*2, population.target.radius*2); //Target
    
    population.updateFrame(counter);
    counter++;
    population.calcFitness();
    population.getMostFit();
    if(counter > lifespan) {
        population.naturalSelection();
        population.generate();
        counter = 0;
    }
    
    stroke(0,0,0);
    text("Population: " + population.populationCount, 10, 20);
    text("Best Fitness: "+ population.best.fitness, 10, 30);
    text("Best Ords: ("+ population.best.position.x+","+population.best.position.y+")", 10, 40);
    text("Ideal Ords: ("+population.target.x+" +- "+population.target.radius+","+population.target.y+" +- "+population.target.radius+")", 10, 50);
    text("Balls Reached: " + population.getIndividualsCompleted(), 10, 60);
    text("Generation: " + population.generation, 10, 70);
}