const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
import Game from "./scripts/game"
import Path from "./scripts/path";


document.addEventListener("DOMContentLoaded", () => {
    const g = new Game();
    g.animate(ctx);
});

window.addEventListener("keydown", (event) => {
    if ((event.code === "ArrowUp") || (event.code === "ArrowDown") || (event.code === "ArrowLeft") || (event.code === "ArrowRight") || (event.code === "Space")) {
        event.preventDefault();
    };
});