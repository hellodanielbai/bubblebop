import Terminal from "./terminal"
import Plane from "./plane"
import Path from "./path"

export default class Game {
    constructor() {
        this.redTerminal = new Terminal({x: 780, y: 20, width: 20, height: 240, color: "red", xl: 780, xr: 800, yu: 20, yd: 260});
        this.blueTerminal = new Terminal({x: 780, y: 280, width: 20, height: 240, color: "blue", xl: 780, xr: 800, yu: 280, yd: 520});
        this.greenTerminal =  new Terminal({x: 780, y: 540, width: 20, height: 240, color: "green", xl: 780, xr: 800, yu: 540, yd: 780});
        this.redPlane = new Plane({x: 30, y: 30, dx: 0.5, dy: 1.5, speed: 4, radius: 20, color: "red"});
        this.planesQueue = [this.redPlane];
        this.planes = [];
        this.paths = [];
        this.score = 0;
        this.GDIM_X = 800;
        this.GDIM_Y = 800;
        this.GCOLOR =  "pink";
        this.GFPS = 30;
        this.gameOver = false;
        this.cursorPosArr = [];
        this.counter = 0;
        this.incrementer = 0;
    };

    //Add Objects
    allObjects() {
        return [].concat(this.redTerminal, this.blueTerminal, this.greenTerminal, this.planes);
    };

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

    addRandomPlaneToQueue() {
        let redSpeed = 2;
        let blueSpeed = 3;
        let greenSpeed = 5;
        let randColor = Math.floor(Math.random() * 3);
        if (randColor === 0) {
            const randDX = Math.random() * redSpeed;
            const randDY = redSpeed - randDX;
            const randomPlane = new Plane({x: 30, y: 30, dx: randDX, dy: randDY, radius: 20, color: "red"});
            this.planesQueue.push(randomPlane);
        } else if (randColor === 1) {
            const randDX = Math.random() * blueSpeed;
            const randDY = blueSpeed - randDX;
            const randomPlane = new Plane({x: 30, y: 30, dx: randDX, dy: randDY, radius: 20, color: "blue"});
            this.planesQueue.push(randomPlane);
        } else {
            const randDX = Math.random() * greenSpeed;
            const randDY = greenSpeed - randDX;
            const randomPlane = new Plane({x: 30, y: 30, dx: randDX, dy: randDY, radius: 20, color: "green"});
            this.planesQueue.push(randomPlane);
        };
    };

    addPlane() {
        if (this.counter === 0) {
            this.planes.push(this.planesQueue.shift());
            this.addRandomPlaneToQueue();
            this.counter = 200 - this.incrementer;
            // if (this.incrementer < 200) this.incrementer++
        } else {
            this.counter--;
        };  
    };


    removePlane(plane) {
        this.planes.splice(this.planes.indexOf(plane), 1);
    };


    //Collision//
    collisionBetween(object1, object2) {
        if (object2 instanceof Terminal) {
            var distX = Math.abs(object1.x - object2.x - object2.width/2);
            var distY = Math.abs(object1.y - object2.y - object2.height/2);
            if (distX > (object2.width/2 + object1.radius)) { return false; }
            if (distY > (object2.height/2 + object1.radius)) { return false; }
            if (distX <= (object2.width/2)) { return true; } 
            if (distY <= (object2.height/2)) { return true; }
            var objdx = distX - object2.width/2;
            var objdy = distY - object2.height/2;
            return (objdx * objdx + objdy * objdy <= (object1.radius * object1.radius));
        } else if (object2 instanceof Plane) {
            let distSq = (object1.x - object2.x) * (object1.x - object2.x) + (object1.y - object2.y) * (object1.y - object2.y);
            let radSumSq = (object1.radius + object2.radius) * (object1.radius + object2.radius);
            if (distSq < radSumSq) {
                this.gameOver = true;
            };
        };
    };

    checkPlaneCrash(plane) {
        for (let i = 1; i < this.planes.length; i++) {
            if (this.planes.indexOf(plane) !== i) {
                let otherPlane = this.planes[i];
                if (this.collisionBetween(plane, otherPlane)) {
                    this.gameOver = true;
                };
            };
        };
    };

    checkPlaneLand(plane) {
        let relevantTerminal;
        if (plane.color === "red") {
            relevantTerminal = this.redTerminal;
        } else if (plane.color === "green") {
            relevantTerminal = this.greenTerminal;
        } else if (plane.color === "blue") {
            relevantTerminal = this.blueTerminal;
        }
        if (this.collisionBetween(plane, relevantTerminal)) {
            this.removePlane(plane);
            this.score ++;
            let scoremarker = document.getElementById("scoremarker");
            scoremarker.innerHTML = `Score: ${this.score}`;
        };
    };

        // Controls
        getCursorPos(event) {
            const bounds = this.context[1].getBoundingClientRect();
            const x = event.x - bounds.left;
            const y = event.y - bounds.top;
            let cursorPos = {x: x, y: y};
            this.cursorPosArr.push(cursorPos);
        };

    //Run Game
    draw(ctx) {
        ctx.clearRect(0, 0, this.GDIM_X, this.GDIM_Y);
        ctx.fillStyle = this.GCOLOR;
        ctx.fillRect(0, 0, this.GDIM_X, this.GDIM_Y);
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
        this.addPlane()
        this.move();
        this.planes.forEach((plane) => {
            plane.detectWalls();
            this.checkPlaneLand(plane);
            // this.checkPlaneCrash(plane);
        });
    };

    gameStart(ctx) {
        let drawInterval = setInterval(() => {
            if (this.gameOver) {
                clearInterval(drawInterval)
            };
            this.draw(ctx);
            this.step();
        }, 10);
    };
} ;