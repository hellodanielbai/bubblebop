import Terminal from "./terminal"
import Plane from "./plane"
import Path from "./path"

export default class Game {

    constructor() {
        this.terminals = []
        this.planes = []
        this.paths = []
    }

    clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    add(object) {

    }

    addTerminal() {
        const redTerminal = new Terminal({x: 760, y: 20, width: 30, height: 120, color: "red"})
        const blueTerminal = new Terminal({x: 760, y: 320, width: 30, height: 90, color: "blue"})
        const greenTerminal = new Terminal({x: 760, y: 620, width: 30, height: 60, color: "green"})

        this.terminals.push(redTerminal, blueTerminal, greenTerminal)
    }

    addPlane() {

    }

    allPlanes() {
        
    }

    moveObjects(delta) {

    }

    randomPosition() {

    }

    remove(object) {

    }

    step(delta) {

    }

}

// import Plane from "./scripts/plane"
// import Terminal from "./scripts/terminal"


//TEST//
const plane1 = new Plane({x: 100, y: 100, dx: 2, dy: -1}, 20, "blue")
plane1.drawPlane(ctx)

const redTerminal = new Terminal({x: 760, y: 20, width: 30, height: 120, color: "red"})
redTerminal.drawTerminal(ctx)

const blueTerminal = new Terminal({x: 760, y: 320, width: 30, height: 90, color: "blue"})
blueTerminal.drawTerminal(ctx)

const greenTerminal = new Terminal({x: 760, y: 620, width: 30, height: 60, color: "green"})
greenTerminal.drawTerminal(ctx)
