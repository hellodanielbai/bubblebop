import Terminal from "./terminal"
import Plane from "./plane"
import Path from "./path"

export default class Game {
    constructor() {
        this.redTerminal = new Terminal({x: 760, y: 20, width: 30, height: 120, color: "red", xub: 800, xlb: 730, yub: 0, ylb: 170});
        this.blueTerminal = new Terminal({x: 760, y: 320, width: 30, height: 90, color: "blue", xub: 800, xlb: 730, yub: 290, ylb: 440});
        this.greenTerminal =  new Terminal({x: 760, y: 620, width: 30, height: 60, color: "green", xub: 800, xlb: 730, yub: 590, ylb: 710});
        this.planes = [];
        this.paths = [];
        this.score = 0;
        this.GDIM_X = 800;
        this.GDIM_Y = 800;
        this.GCOLOR =  "pink";
        this.GFPS = 30;
        this.gameOver = false;
    };

    //Add Objects

    add(object) {
        if (object instanceof Terminal) {
            this.terminals.push(object);
        };
        if (object instanceof Plane) {
            this.planes.push(object);
        };
        if (object instanceof Path) {
            this.paths.push(object);
        };
    };

    randomPosition() {
        return [GDIM_X * Math.random(), GDIM_Y * Math.random()];
    };

    addPlane() {
        const redPlane = new Plane({x: 150, y: 100, dx: 2, dy: 7, speed: 0, radius: 30, color: "red"});
        const bluePlane = new Plane({x: 150, y: 200, dx: 3, dy: 7, speed: 0, radius: 30, color: "blue"});
        const greenPlane = new Plane({x: 100, y: 70, dx: 2, dy: 3, speed: 0, radius: 30, color: "green"});
        this.planes.push(redPlane, greenPlane);
    }

    allObjects() {
        return [].concat(this.redTerminal, this.blueTerminal, this.greenTerminal, this.planes, this.paths);
    };

    removePlane(plane) {
        this.planes.splice(this.planes.indexOf(plane), 1);
    };

    addPath() {

    }

    //Collision//

    dist(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );
    };

    collisionBetween(object1, object2) {
        if (object2 instanceof Terminal) {
            if (object1.x > object2.xlb && (object1.y < object2.ylb) && (object1.y > object2.yub)) return true;
        } else if (object2 instanceof Plane) {
            let distSq = (object1.x - object2.x) * (object1.x - object2.x) + (object1.y - object2.y) * (object1.y - object2.y);
            let radSumSq = (object1.radius + object2.radius) * (object1.radius + object2.radius);
            if (distSq < radSumSq) {
                this.gameOver = true
            };
        };
    };

    checkPlaneCrash(plane) {
        for (let i = 0; i < this.planes.length; i++) {
            if (this.planes.indexOf(plane) !== i) {
                let otherPlane = this.planes[i]
                if (this.collisionBetween(plane, otherPlane)) {
                    this.gameOver = true;
                };
            };
        };
    };

    checkPlaneLand(plane) {
        let relevantTerminal;
        if (plane.color === "red") {
            relevantTerminal = this.redTerminal
        } else if (plane.color === "green") {
            relevantTerminal = this.greenTerminal
        } else if (plane.color === "blue") {
            relevantTerminal = this.blueTerminal
        }
        if (this.collisionBetween(plane, relevantTerminal)) {
            this.removePlane(plane);
            this.score += 1;
            console.log(this.score);
        }
    }



    //Draw Objects
    draw(ctx) {
        ctx.clearRect(0, 0, this.GDIM_X, this.GDIM_Y)
        ctx.fillStyle = this.GCOLOR
        ctx.fillRect(0, 0, this.GDIM_X, this.GDIM_Y)
        this.allObjects().forEach(object => {
            object.draw(ctx);
        });
    };

    move() {
        this.allObjects().forEach(object => {
            object.move();
        });
    };

    step() {
        this.move();
        this.planes.forEach((plane) => {
            plane.detectWalls();
            this.checkPlaneLand(plane);
            this.checkPlaneCrash(plane);
        });
    };

    gameStart(ctx) {
        let drawInterval = setInterval(() => {
            this.draw(ctx);
            this.step();
            if (this.gameOver) {
                clearInterval(drawInterval)
                // window.blur()
            };
        }, 10);
    };
} ;