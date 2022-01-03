export default class GameView {
    
    constructor(ctx, game) {
        this.ctx = ctx
        this.game = game
    }



    start() {

    }

    animate(time) {

    }

    update(ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.drawPlane()

        this.move()
        
        this.clear()

        this.detectWalls()

        requestAnimationFrame(update)
    }
}