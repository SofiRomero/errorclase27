const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var barcoImg
var canvas, angle, tower, ground, cannon;
var bala;
var towerImage;
var balls=[]
var barco
var barcos=[]
var barcoAnimation=[]
var spriteData
var spriteImage
function preload() {
  backgroundImg = loadImage("assets/background.gif");
  towerImage = loadImage("assets/tower.png");
  barcoImg=loadImage("assets/boat.png");
  spriteData=loadJSON("assets/boat/boat.json")
   spriteImage=loadImage("assets/boat/boat.png")

}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);
angle=20
cannon=new Cannon(180,110,130,100,angle)

var barcoframes=spriteData.frames
for(var i=0;i<barcoframes.length;i++){
var pos=barcoframes[i].position 
var img =spriteImage.get(pos.x,pos.y,pos.w,pos.h)
barcoAnimation.push(img)
}
}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  
  
  rect(ground.position.x, ground.position.y, width * 2, 1);

  //
  for(var i=0;i<balls.length;i++){
showBalls(balls[i],i)
choque(i)
  }
cannon.display()
showBoats()
}
function keyPressed(){
  
  if(keyCode==DOWN_ARROW){
    bala=new Bala(cannon.x,cannon.y)
    Matter.Body.setAngle(bala.body,cannon.angle)
    balls.push(bala)
  }
}
function showBalls(bala,index){

  if(bala){bala.display()
  if(bala.body.position.x>=width||bala.body.position.y>=height-50){
    bala.remove(index)
  }
  }
}
function showBoats(){
  if(barcos.length>0){
    if(barcos[barcos.length-1]==undefined||barcos[barcos.length-1].body.position.x<width-300){
      var positions=[-40,-60,-70,-20]
      var position=random(positions)
      barco=new Barco(width,height-100,170,170,position,barcoAnimation)
      barcos.push(barco)
    }
    for(var i=0;i<barcos.length;i++){
      if(barcos[i]){
        Matter.Body.setVelocity(barcos[i].body,{x:-0.9,y:0})
        barcos[i].display()
        barcos[i].animate()
      }
    }
  }
  else{barco=new Barco(width,height-60,170,170,-60)
    barcos.push(barco)}
}

function keyReleased(){
  


  if(keyCode===DOWN_ARROW){balls[balls.length-1].shoot()}
}
function choque(index){
for(var i=0;i<barcos.length;i++){
if(balls[index]!=undefined&&barcos[i]!=undefined){
  var colision=Matter.SAT.collides(balls[index].body,barcos[i].body)
  if(colision.collided){
    barcos[i].remove(i)
    Matter.World.remove(world,balls[index].body)
    delete balls[index]
  }
}
}
}