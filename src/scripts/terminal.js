export default class Terminal {
    constructor(hash) {
        this.x = hash["x"]
        this.y = hash["y"]
        this.width = hash["width"]
        this.height = hash["height"]
        this.color = hash["color"]
    }

    drawTerminal(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

}