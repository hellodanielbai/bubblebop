
export default class Plane {

    constructor plane = {
        x: 100,
        y: 200,
        size: 40,
        dx: 5,
        dy: 4
    };

    drawCircle() {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
    }
}




