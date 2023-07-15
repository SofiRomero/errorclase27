class Barco {
    constructor(x,y,width,height,barcopos,barcoAnimation){
        this.animation=barcoAnimation
        this.speed=0.05
        this.body=Bodies.rectangle(x,y,width,height)
        this.width=width
        this.height=height
        this.barcoimg=loadImage("assets/boat.png")
        this.barcoposition=barcopos
        World.add(world,this.body)
    }
    remove(index){
        setTimeout(()=>{
            Matter.World.remove(world,barcos[index].body)
            delete barcos[index]
        },2000)
    }
   animate(){
    this.speed=this.speed+0.05
   }
    display(){
var angle=this.body.angle
var pos=this.body.position
var index=floor(this.speed%this.animation.length)
    push ()
    translate(pos.x,pos.y)
    rotate(angle)
    imageMode(CENTER)
    image(this.animation[index],0,this.barcoposition,this.width,this.height)
    pop ()
   }
    

}
