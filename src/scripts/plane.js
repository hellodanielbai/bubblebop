import MovingObjects from "./movingObjects"

export default class Plane extends MovingObjects {
    constructor(movingObjectHash, size, color) {
        super(movingObjectHash);
        this.size = size;
        this.color = color;
    };

    drawPlane(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
    };

    update(ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.drawPlane()

        this.move()
        
        this.clear()

        this.detectWalls()

        requestAnimationFrame(update)
    }

}