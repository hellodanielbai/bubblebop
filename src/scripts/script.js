const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//fillRect()

ctx.fillStyle = "red";
ctx.fillRect(760, 20, 30, 120);

ctx.fillStyle = "blue"
ctx.fillRect(760, 250, 30, 90)

ctx.fillStyle = "green"
ctx.fillRect(760, 450, 30, 60)


// const red_rectangle = {

// }

// //strokeRect()
// ctx.lineWidth = 5
// ctx.strokeStyle = "green";
// ctx.strokeRect(200, 200, 70, 150)


// //Path
// ctx.beginPath();
// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50); 
// ctx.lineTo(100, 200)
// ctx.lineTo(50, 50)
// //ctx.closePath()
// ctx.stroke()
// ctx.fillStyle = 'blue';
// ctx.fill()

// Arc
ctx.beginPath()
ctx.arc(200, 200, 40, 0, Math.PI * 2)
ctx.fill();


//ctx.moveTo(x, y)
// quadraticCurveTo(cp1x, cp1y, endX, endY)
// bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY)


const circle = {
    x: 100,
    y: 200,
    size: 40,
    dx: 5,
    dy: 4
};

function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
}

drawCircle();