export default class Path {
    constructor(options) {
        this.x = options["x"];
        this.y = options["y"]
        this.width = options["width"];
        this.height = options["height"];
        this.color = options["color"];
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    move() {
        // paths don't move
    };
};