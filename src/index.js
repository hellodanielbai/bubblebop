const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
import Game from "./scripts/game"


document.addEventListener("DOMContentLoaded", () => {
    const g = new Game()
    g.addPlane()
    g.gameStart(ctx)

    canvas.addEventListener("click", e => {
        console.log("hi")
    })
})
