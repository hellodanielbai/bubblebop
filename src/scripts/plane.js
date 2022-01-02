import MovingObjects from "./movingObjects"

export default class Plane extends MovingObjects {
    constructor(hash, size, color) {
        super(hash);
        this.size = size;
        this.color = color;
    };

    drawPlane(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
    };
};