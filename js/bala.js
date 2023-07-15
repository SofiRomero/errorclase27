class Bala{
constructor(x,y){
   var bala_options={isStatic:true}
    this.r=30
    this.body=Bodies.circle(x,y,this.r,bala_options)
    this.balaimg=loadImage("assets/bala.png")
    this.trayectory=[];
    World.add(world,this.body)
}
shoot(){
   var newangle=cannon.angle-28
   newangle=newangle*(3.14/180)
   var velocity=p5.Vector.fromAngle(newangle)
   velocity.mult(0.5)
    Matter.Body.setStatic(this.body,false)
    Matter.Body.setVelocity(this.body,{x:velocity.x*(180/3.14),y:velocity.y*(180/3.14)})
}
remove(index){
    Matter.Body.setVelocity(this.body,{x:0,y:0})
    setTimeout(()=>{
        Matter.World.remove(world,this.body)
        delete balls[index]
    },2000)
}
display(){
    var angle=this.body.angle
var pos=this.body.position
push ()
imageMode(CENTER)
image (this.balaimg,pos.x,pos.y,this.r,this.r)
pop ()
/*
if(this.body.velocity.x>0 && pos.x>10){
var position=[pos.x,pos.y];
this.trayectory.push(position)
}
for(var i=0;i<this.trayectory.length;i++){
    image (this.balaimg,this.trayectory[i][0],this.trayectory[i][1],5,5)
}*/
}


}
