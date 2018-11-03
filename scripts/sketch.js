var population;
var lifespan = 700;
var counter = 0;
var bg;
var obstacles = [];
//As the obstacles increase the FPS will decrease.
function setup() {
    createCanvas(500, 500);
    obstacles.push(new RectangleObstacle(width/4, height/2, 70, 80));
    obstacles.push(new EllipseObstacle(400, 150, 60, 50));
    obstacles.push(new LineObstacle(300, 170, 60, 50));

    population = new Population(createVector(250, 100), 0.001, 200, lifespan, obstacles);
    population.target.radius = 20;
}
function mouseDragged() 
{ 
    //Note: Not accurate enough but oh well
    obstacles.push(new LineObstacle(mouseX, mouseY, pmouseX, pmouseY));
    population.obstacles = obstacles;
}
function draw() {
    clear();
    background(26, 166, 4);
    fill(0,0,0);
    noStroke();
    ellipse(population.target.x, population.target.y, population.target.radius*2, population.target.radius*2); //Target
    fill(255,0,0);
    obstacles.forEach(obstacle => {
        obstacle.draw();
    });
    strokeWeight(1);
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
    text("Balls Blocked: " + population.getIndividualsBlocked(), 10, 70);
    text("Generation: " + population.generation, 10, 80);
}