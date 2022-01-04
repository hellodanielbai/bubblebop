export default class Plane {
    
    constructor(options) {
        this.x = options["x"];
        this.y = options["y"];
        this.dx = options["dx"];
        this.dy = options["dy"];
        this.speed = options["speed"]
        this.radius = options["radius"]
        this.color = options["color"];
    };

    dist(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );
    }

    detectWalls() {
        if (this.x + this.radius > 800 || this.x - this.radius < 0) {
            this.dx *= -1;
        };
        if (this.y + this.radius > 800 || this.y - this.radius < 0) {
            this.dy *= -1;
        };
    };

    move() {
        this.x += this.dx;
        this.y += this.dy;
    };

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
};