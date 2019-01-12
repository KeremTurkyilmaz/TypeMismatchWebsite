var balls = [];

function setup(){
  var canvas = createCanvas(1000,600);
  canvas.parent('sketch');
  background(0);
  ellipseMode(CENTER);
  balls.push(new Ball(width/2, height/2, 40));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  for (var i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].show();
  }
}

function keyPressed(){
  if((key == 'x') || (key == 'X')){
    background(0);
    balls = [];
    balls.push(new Ball(width/2, height/2, floor(random(20,40))));
  }

}

function mouseDragged() {
  balls.push(new Ball(mouseX, mouseY, floor(random(20,40))));
}

class Ball{

  constructor(posX, posY, dim){
    this.x = posX;
    this.y = posY;
    this.diameter = dim;
    this.speed = random(PI, PI/2);
    this.col = color(28,27,27);
  }

  move(){
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
    this.x  = constrain(this.x,  this.diameter, width-this.diameter);
    this.y  = constrain(this.y,  this.diameter, height-this.diameter);
  }

  show(){
    fill(this.col);
    stroke(255);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }

}
