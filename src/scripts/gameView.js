import Game from "./game"

export default class GameView {
    
    constructor(ctx, game) {
        this.ctx = ctx
        this.game = game
    }

    start() {

    }

    animate() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.drawPlane()

        this.move()
        
        this.clear()

        requestAnimationFrame(animate)

    }
}