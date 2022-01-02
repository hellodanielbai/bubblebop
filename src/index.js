const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

import Plane from "./scripts/plane"
import Terminal from "./scripts/terminal"


//TEST//
const plane1 = new Plane({x: 100, y: 100, dx: 2, dy: -1}, 20, "blue")
plane1.drawPlane(ctx)

const terminal1 = new Terminal({x: 760, y: 20, width: 30, height: 120, color: "red"})
terminal1.drawTerminal(ctx)

const terminal2 = new Terminal({x: 760, y: 250, width: 30, height: 90, color: "blue"})
terminal2.drawTerminal(ctx)

const terminal3 = new Terminal({x: 760, y: 450, width: 30, height: 60, color: "green"})
terminal3.drawTerminal(ctx)


