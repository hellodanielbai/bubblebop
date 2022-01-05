const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
import Game from "./scripts/game"
import Path from "./scripts/path";


document.addEventListener("DOMContentLoaded", () => {
    const g = new Game()
    g.gameStart(ctx)

    // canvas.addEventListener("click", (event) => {
    //     if(Date.now() - lastMove > 40) {
    //         // Do stuff
    //         lastMove = Date.now();
    //     } 
    //     console.log(event.offsetX)
    //     console.log(event.offsetY)
    //     const newPath = new Path({x: event.offsetX, y: event.offsetY, length: 20, life: 20, color: "gray"})
    //     this.paths.unshift(newPath)
    // })
})
