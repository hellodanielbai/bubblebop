const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
import Game from "./scripts/game"
import Path from "./scripts/path";


document.addEventListener("DOMContentLoaded", () => {
    const g = new Game()
    g.animate(ctx)
})