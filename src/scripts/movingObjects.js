export default class MovingObjects {
    constructor(hash) {
        this.x = hash["x"];
        this.y = hash["y"];
        this.dx = hash["dx"];
        this.dy = hash["dy"];
        this.speed = hash["speed"]
    };

    clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    move() {
        this.x += this.dx;
        this.y += this.dy;
    };

    detectWalls() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.dx *= -1;
        };
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.dy *= -1;
        };
    };
};