import Terminal from "./terminal"
import Plane from "./plane"
import Path from "./path"

export default class Game {
    constructor() {
        this.redTerminal = new Terminal({x: 760, y: 20, width: 30, height: 120, color: "red", xub: 800, xlb: 730, yub: 0, ylb: 170});
        this.blueTerminal = new Terminal({x: 760, y: 320, width: 30, height: 90, color: "blue", xub: 800, xlb: 730, yub: 290, ylb: 440});
        this.greenTerminal =  new Terminal({x: 760, y: 620, width: 30, height: 60, color: "green", xub: 800, xlb: 730, yub: 590, ylb: 710});
        this.redPlane = new Plane({x: 150, y: 100, dx: 2, dy: 7, speed: 4, radius: 20, color: "red"});
        this.bluePlane = new Plane({x: 150, y: 200, dx: 3, dy: 7, speed: 2, radius: 20, color: "blue"});
        this.greenPlane = new Plane({x: 100, y: 70, dx: 2, dy: 3, speed: 1, radius: 20, color: "green"});
        this.planes = [];
        this.paths = [];
        this.score = 0;
        this.GDIM_X = 800;
        this.GDIM_Y = 800;
        this.GCOLOR =  "pink";
        this.GFPS = 30;
        this.gameOver = false;
        this.cursorPosArr = []
        
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

    allObjects() {
        return [].concat(this.redTerminal, this.blueTerminal, this.greenTerminal, this.planes);
    };

    addPlane() {
        this.planes.push(this.redPlane);
    }

    removePlane(plane) {
        this.planes.splice(this.planes.indexOf(plane), 1);
    };

    randomPosition() {
        return [GDIM_X * Math.random(), GDIM_Y * Math.random()];
    };


    //Collision//
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

    // Controls
    getCursorPos(event) {
        const bounds = this.context[1].getBoundingClientRect();
        const x = event.x - bounds.left;
        const y = event.y - bounds.top;
        let cursorPos = {x: x, y: y}
        this.cursorPosArr.push(cursorPos)
    }



    //Run & End Game

    gameStart(ctx) {
        let drawInterval = setInterval(() => {
            if (this.gameOver) {
                clearInterval(drawInterval)
            };
            this.draw(ctx);
            this.step();
        }, 5);
    };
} ;