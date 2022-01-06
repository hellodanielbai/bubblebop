const canvas = document.getElementById('canvas');

import Terminal from "./terminal"
import Plane from "./plane"
import Path from "./path"

export default class Game {
    constructor() {
        this.GDIM_X = 800;
        this.GDIM_Y = 800;
        this.GCOLOR =  "pink";
        this.GFPS = 30;
        this.score = 0;
        this.gameOver = false;
        this.counter = 0;
        this.incrementer = 0;
        this.cursorPosArr = [];    

        this.redTerminal = new Terminal({x: 780, y: 20, width: 20, height: 240, color: "red"});
        this.blueTerminal = new Terminal({x: 780, y: 280, width: 20, height: 240, color: "blue"});
        this.greenTerminal =  new Terminal({x: 780, y: 540, width: 20, height: 240, color: "green"});

        this.redPlane = new Plane({x: 30, y: 30, dx: 0.5, dy: 1.5, radius: 30, color: "red"});
        this.planesQueue = [this.redPlane];
        this.planes = [];

        this.paths = [];
        this.pathLife = 300;
    };

    //Add Objects
    allObjects() {
        return [].concat(this.redTerminal, this.blueTerminal, this.greenTerminal, this.planes, this.paths);
    };

    addRandomPlaneToQueue() {
        let redSpeed = 2;
        let blueSpeed = 3;
        let greenSpeed = 5;
        let randColor = Math.floor(Math.random() * 3);
        if (randColor === 0) {
            const randDX = Math.random() * redSpeed;
            const randDY = redSpeed - randDX;
            const randomPlane = new Plane({x: 40, y: 40, dx: randDX, dy: randDY, radius: 30, color: "red"});
            this.planesQueue.push(randomPlane);
        } else if (randColor === 1) {
            const randDX = Math.random() * blueSpeed;
            const randDY = blueSpeed - randDX;
            const randomPlane = new Plane({x: 40, y: 40, dx: randDX, dy: randDY, radius: 20, color: "blue"});
            this.planesQueue.push(randomPlane);
        } else {
            const randDX = Math.random() * greenSpeed;
            const randDY = greenSpeed - randDX;
            const randomPlane = new Plane({x: 40, y: 40, dx: randDX, dy: randDY, radius: 10, color: "green"});
            this.planesQueue.push(randomPlane);
        };
    };

    addPlane() {
        if (this.counter === 0) {
            this.planes.push(this.planesQueue.shift());
            this.addRandomPlaneToQueue();
            this.counter = 400 - this.incrementer;
            // if (this.incrementer < 200) this.incrementer += 2;
        } else {
            this.counter--;
        };  
    };

    removePlane(plane) {
        this.planes.splice(this.planes.indexOf(plane), 1);
    };

    addPath(newPath) {
        if (this.planes.every(plane => !this.collisionBetween(plane, newPath))) {
            if (this.paths.length === 0) {
                this.paths.unshift(newPath)
            } else if (newPath.x != this.paths[0].x && newPath.y != this.paths[0].y){
                this.paths.unshift(newPath);
            };
        }
    };

    removePath() {
        this.paths.pop();
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
        } else if (object2 instanceof Path) {
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

    planeReRoute(plane) {
        for(let i = 0; i < this.paths.length; i++) {
            let currPath = this.paths[i]
            if (this.collisionBetween(plane, currPath)) {
                if (plane.x > currPath.x || plane.x < currPath.x) {
                    plane.dy += 1
                } else if (plane.y > currPath.y || (plane.y < currPath.y)) {
                    plane.dx -= 1
                }
            }
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
        };
        if (this.collisionBetween(plane, relevantTerminal)) {
            this.removePlane(plane);
            this.score ++;
            let scoremarker = document.getElementById("scoremarker");
            scoremarker.innerHTML = `Score: ${this.score}`;
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

    //Run Game
    draw(ctx) {
        ctx.clearRect(0, 0, this.GDIM_X, this.GDIM_Y);
        ctx.fillStyle = this.GCOLOR;
        ctx.fillRect(0, 0, this.GDIM_X, this.GDIM_Y);
        canvas.addEventListener("click", (event) => {
            const newPath = new Path({x: event.offsetX, y: event.offsetY, width: 40, height: 40, color: "gray"})
            this.addPath(newPath)
            if (this.paths.length > 4) {
                this.removePath();
            };
        });
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
        if (this.pathLife === 0) {
            this.removePath()
            this.pathLife = 300
        } else {
            this.pathLife--;
        };
        this.move();
        this.planes.forEach((plane) => {
            plane.detectBorder();
            this.checkPlaneLand(plane);
            this.planeReRoute(plane);
            this.checkPlaneCrash(plane);
        });
    };

    animate(ctx) {
        let drawInterval = setInterval(() => {
            if (this.gameOver) {
                clearInterval(drawInterval)
            };
            this.draw(ctx);
            this.step();
        }, 16);
    };
} ;