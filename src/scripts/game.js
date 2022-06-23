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
        this.gameStarted = false;
        this.counter = 0;
        this.cursorPosArr = [];    
        this.redTerminal = new Terminal({x: 780, y: 20, width: 20, height: 240, color: "red"});
        this.blueTerminal = new Terminal({x: 780, y: 280, width: 20, height: 240, color: "blue"});
        this.greenTerminal =  new Terminal({x: 780, y: 540, width: 20, height: 240, color: "green"});
        this.redTerminal2 = new Terminal({x: 20, y: 780, width: 240, height: 20, color: "red"});
        this.blueTerminal2 = new Terminal({x: 280, y: 780, width: 240, height: 20, color: "blue"});
        this.greenTerminal2 =  new Terminal({x: 540, y: 780, width: 240, height: 20, color: "green"});
        this.redPlane = new Plane({x: 30, y: 30, dx: 0.3, dy: 0.7, radius: 24, color: "red"});
        this.planesQueue = [this.redPlane];
        this.planes = [];
        this.paths = [];
    };

    //Add Objects
    allObjects() {
        return [].concat(this.redTerminal, this.blueTerminal, this.greenTerminal, this.redTerminal2, this.blueTerminal2, this.greenTerminal2, this.planes, this.paths);
    };

    addRandomPlaneToQueue() {
        const redSpeed = 1;
        const blueSpeed = 2;
        const greenSpeed = 3;
        let randNum = Math.random()
        if (randNum < 0.1) randNum += 0.1
        if (randNum > 0.9) randNum -= 0.1
        let randColor = Math.floor(Math.random() * 3);
        if (randColor === 0) {
            const randDX = (randNum * redSpeed);
            const randDY = redSpeed - randDX;
            const randomPlane = new Plane({x: 40, y: 40, dx: randDX, dy: randDY, radius: 24, color: "red"});
            this.planesQueue.push(randomPlane);
        } else if (randColor === 1) {
            const randDX = (randNum * blueSpeed);
            const randDY = blueSpeed - randDX;
            const randomPlane = new Plane({x: 40, y: 40, dx: randDX, dy: randDY, radius: 16, color: "blue"});
            this.planesQueue.push(randomPlane);
        } else {
            const randDX = (randNum * greenSpeed);
            const randDY = greenSpeed - randDX;
            const randomPlane = new Plane({x: 40, y: 40, dx: randDX, dy: randDY, radius: 12, color: "green"});
            this.planesQueue.push(randomPlane);
        };
    };

    addPlane() {
        if (this.counter === 0) {
            this.planes.push(this.planesQueue.shift());
            this.addRandomPlaneToQueue();
            this.counter = 500 - (this.score * 3);
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
                this.paths.unshift(newPath);
            } else if (newPath.x != this.paths[0].x && newPath.y != this.paths[0].y){
                this.paths.unshift(newPath);
            };
        };
    };

    removePath() {
        for(let i = 0; i < this.paths.length; i++) {
            this.paths[i].life--;
            if (this.paths[i].life <= 0) {
                this.paths.splice(i, 1);
            } ;
        };
    };

    //Collision//
    collisionBetween(object1, object2) {
        if (object2 instanceof Terminal) {
            var distX = Math.abs(object1.x - object2.x - object2.width/2);
            var distY = Math.abs(object1.y - object2.y - object2.height/2);
            if (distX > (object2.width/2 + object1.radius)) { return false; };
            if (distY > (object2.height/2 + object1.radius)) { return false; };
            if (distX <= (object2.width/2)) { return true; };
            if (distY <= (object2.height/2)) { return true;};
            var objdx = distX - object2.width/2;
            var objdy = distY - object2.height/2;
            return (objdx * objdx + objdy * objdy <= (object1.radius * object1.radius));
        } else if (object2 instanceof Path) {
            var distX = Math.abs(object1.x - object2.x - object2.width/2);
            var distY = Math.abs(object1.y - object2.y - object2.height/2);
            if (distX > (object2.width/2 + object1.radius)) { return false; };
            if (distY > (object2.height/2 + object1.radius)) { return false; };
            if (distX <= (object2.width/2)) { return true; };
            if (distY <= (object2.height/2)) { return true; };
            var objdx = distX - object2.width/2;
            var objdy = distY - object2.height/2;
            return (objdx * objdx + objdy * objdy <= (object1.radius * object1.radius));
        } else if (object2 instanceof Plane) {
            let distSq = (object1.x - object2.x) * (object1.x - object2.x) + (object1.y - object2.y) * (object1.y - object2.y);
            let radSumSq = (object1.radius + object2.radius) * (object1.radius + object2.radius);
            if (distSq < radSumSq) {
                this.gameOver = true;
                this.gameStarted = false;
            };
        };
    };

    planeReRoute(plane) {
        for(let i = 0; i < this.paths.length; i++) {
            let currPath = this.paths[i];
            if (this.collisionBetween(plane, currPath)) {
                if ((plane.x < currPath.x && plane.dx > 0) || (plane.x > currPath.x && plane.dx < 0)) {
                    plane.dx *= -1;
                } 
                if ((plane.y < currPath.y && plane.dy > 0) || (plane.y> currPath.y && plane.dy < 0)) {
                    plane.dy *= -1;
                };
            };
        };
    };


    checkPlaneLand(plane) {
        let relevantTerminal;
        let relevantTerminal2;
        if (plane.color === "red") {
            relevantTerminal = this.redTerminal;
            relevantTerminal2 = this.redTerminal2;
        } else if (plane.color === "green") {
            relevantTerminal = this.greenTerminal;
            relevantTerminal2 = this.greenTerminal2;
        } else if (plane.color === "blue") {
            relevantTerminal = this.blueTerminal;
            relevantTerminal2 = this.blueTerminal2;
        };
        if (this.collisionBetween(plane, relevantTerminal)) {
            this.removePlane(plane);
            this.score ++;
            let scoremarker = document.getElementById("scoremarker");
            scoremarker.innerHTML = `Score: ${this.score}`;
        };
        if (this.collisionBetween(plane, relevantTerminal2)) {
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
                    this.gameStarted = false;
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
            const newPath = new Path({x: event.offsetX, y: event.offsetY, width: 42, height: 42, color: "purple"});
            this.addPath(newPath);
            if (this.paths.length > 4) {
                this.paths.pop();
            };
        });
        this.allObjects().forEach(object => {
            object.draw(ctx);
        });
        ctx.fillStyle = "black";
        if (this.gameOver) {
            ctx.font = '60px impact';
            ctx.fillText('GAMEOVER', 220, 360);
        };
    };

    move() {
        this.allObjects().forEach(object => {
            object.move();
        });
    };

    step() {
        this.addPlane();
        this.removePath();
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
                this.draw(ctx);
                // this.restart(ctx);
            };
            this.draw(ctx);
            this.step();
        }, 10);
    };

    start(ctx) {
        ctx.font = '30px impact';
        ctx.fillText('Direct Bubbles to their Respective Colored Goals', 90, 200);
        ctx.fillText('By Clicking on Board to Create Purple Square Walls', 75, 250);
        ctx.fillText('Click SpaceBar to Begin', 230, 400);
        window.addEventListener("keydown", (event) => {
            if (event.code === "Space") {
                if (this.gameStarted === false) {
                    this.gameStarted = true
                    this.animate(ctx)
                }
            }
        })
    }

    // restart(ctx) {
    //     this.GDIM_X = 800;
    //     this.GDIM_Y = 800;
    //     this.GCOLOR =  "pink";
    //     this.GFPS = 30;
    //     this.score = 0;
    //     this.gameOver = false;
    //     this.gameStarted = false;
    //     this.counter = 0;
    //     this.cursorPosArr = [];    
    //     this.redTerminal = new Terminal({x: 780, y: 20, width: 20, height: 240, color: "red"});
    //     this.blueTerminal = new Terminal({x: 780, y: 280, width: 20, height: 240, color: "blue"});
    //     this.greenTerminal =  new Terminal({x: 780, y: 540, width: 20, height: 240, color: "green"});
    //     this.redTerminal2 = new Terminal({x: 20, y: 780, width: 240, height: 20, color: "red"});
    //     this.blueTerminal2 = new Terminal({x: 280, y: 780, width: 240, height: 20, color: "blue"});
    //     this.greenTerminal2 =  new Terminal({x: 540, y: 780, width: 240, height: 20, color: "green"});
    //     this.redPlane = new Plane({x: 30, y: 30, dx: 0.3, dy: 0.7, radius: 24, color: "red"});
    //     this.planesQueue = [this.redPlane];
    //     this.planes = [];
    //     this.paths = [];
        

    //     window.addEventListener("keydown", (event) => {
    //         if (event.code === "Space") {
    //             if (this.gameStarted === false) {
    //                 this.gameStarted = true
    //                 this.animate(ctx)
    //             }
    //         }
    //     })
    // }

};
