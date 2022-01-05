export default class Terminal {
    constructor(hash) {
        this.x = hash["x"];
        this.y = hash["y"];
        this.width = hash["width"];
        this.height = hash["height"];
        this.color = hash["color"];
        this.xub = hash["xl"];
        this.xlb = hash["xr"];
        this.yub = hash["yu"];
        this.ylb = hash["yd"];
    };

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    move() {
        // terminals don't move
    };

};