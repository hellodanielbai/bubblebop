import Game from "./game"

export default class GameView {
    
    constructor(ctx, game) {
        this.ctx = ctx
        this.game = game
    }

    start() {
        this.lastTime = 0
        requestAnimationFrame(this.animate.bind(this))
    }
    

    animate(time) {
        const timeDelta = time - time.lastTime
        this.game.step(timeDelta)
        this.game.draw(this.ctx)
        this.lastTime = time

        requestAnimationFrame(this.animate.bind(this))
    }

}