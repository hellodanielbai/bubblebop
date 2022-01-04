const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

import GameView from "./scripts/gameView"
import Game from "./scripts/game"

const g = new Game()
g.addPlane()
g.gameStart(ctx)