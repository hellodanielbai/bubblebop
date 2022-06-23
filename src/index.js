const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
import Game from "./scripts/game"
import Path from "./scripts/path";

// const games = []

document.addEventListener("DOMContentLoaded", () => {
    const g = new Game();
    g.start(ctx)
    // games.push(g)
    // g.animate(ctx);
});

// canvas.addEventListener('click', () => {
//     if (games.length === 0) {
//         const newGame = new Game();
//         games.push(newGame);
//         newGame.start();
//     };
// })