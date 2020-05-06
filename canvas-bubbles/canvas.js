let canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
console.log(canvas.height, canvas.width)
console.log(window.innerHeight, window.innerWidth)
let context = canvas.getContext("2d");
// context.globalCompositeOperation = 'destination-out'
// context.globalCompositeOperation = 'source-in'

class Circle{
    x;
    y;
    radius; 
    color;
    moveHorizantally;
    moveVertically;
    negativeX;
    negativeY;
    xspeed;
    yspeed;
    border;
    constructor(x =0, y=0,radius = 100,color = "#000000", moveHorizantally = false, moveVertically = false, xspeed =5, yspeed = 5, border){
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.color = color;
        this.moveHorizantally = moveHorizantally;
        this.moveVertically = moveVertically;
        this.xspeed = xspeed;
        this.yspeed = yspeed;
        this.border = border;
    }
    drawCircle(){
        // context.clearRect(0, 0, canvas.width, canvas.height);
        // context.clearRect(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
        context.beginPath();        
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.lineWidth = this.random(1, 10);
        context.strokeStyle = this.color;
        context.stroke();
        context.closePath();
        if( this.x + this.radius > canvas.width || (!this.negativeX && this.x - this.radius< 0)){
            this.negativeX = !this.negativeX  
        }
        if( this.y + this.radius >= canvas.height || ( !this.negativeY && this.y - this.radius <= 0)){
            this.negativeY = !this.negativeY
        }
        this.moveHorizantally ? null : this.negativeX ? this.x += this.xspeed : this.x -= this.xspeed;
        this.moveVertically ? null :this.negativeY ? this.y += this.yspeed : this.y -= this.yspeed;
        // if(pos.includes([this.x + this.radius, this.y+ this.radius])){
        // }    
    }
}
let circles = [];
let pos = [];
let index = 0;
function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    if(circles.length < 200){
        circles.push(new Circle(random(0, 475), random(0, 475),random(0, 50), randomColor(), false, false, random(0, 15),random(0, 15), randomColor()));
    }
    circles.map((c) => {
        c.drawCircle();
    })
    requestAnimationFrame(draw);
}
function randomColor(){
    return `rgba(${random(0, 255)},${random(0, 255)},${random(0, 255)})`
}
Object.prototype.randomColor = () => {
    return `rgba(${random(0, 255)},${random(0, 255)},${random(0, 255)})`
};

Object.prototype.random = (min, max) => {
    return Math.floor(Math.random() * (max -min)) + min;
};
function random(min, max){
    return Math.floor(Math.random() * (max -min)) + min;
}
draw()