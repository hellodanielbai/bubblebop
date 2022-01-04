import Terminal from "./terminal"
import Plane from "./plane"
import Path from "./path"

export default class Game {

    constructor() {
        this.terminals = [];
        this.planes = [];
        this.paths = [];
        this.score = 0;
        this.GDIM_X = 800;
        this.GDIM_Y = 800;
        this.GCOLOR =  "pink";
        this.GFPS = 30;
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

    addTerminal() {
        const redTerminal = new Terminal({x: 760, y: 20, width: 30, height: 120, color: "red"})
        const blueTerminal = new Terminal({x: 760, y: 320, width: 30, height: 90, color: "blue"})
        const greenTerminal = new Terminal({x: 760, y: 620, width: 30, height: 60, color: "green"})

        this.terminals.push(redTerminal, blueTerminal, greenTerminal)
    }

    addPlane() {
        const redPlane = new Plane({x: 150, y: 100, dx: 2, dy: 7, speed: 0, radius: 30, color: "red"})
        this.planes.push(redPlane)
    }

    allObjects() {
        return [].concat(this.terminals, this.planes, this.paths);
    }

    removePlane(plane) {
        this.planes.splice(this.planes.indexOf(plane), 1);
    }

    addPath() {

    }

    //Collision//

    dist(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );
    }

    isCollidedWith(object1, object2) {
        if (object2 instanceof Terminal) {
            const distX = Math.abs(object1.x - (object2.x - object2.width/2))
            const distY = Math.abs(object1.y - (object2.y - object2.height/2))
            if (distX <= (object2.width/2)) return true;  
            if (distY <= (object2.height/2)) return true; 
            const distX2 = distX - object2.width/2;
            const distY2 = distY - object2.height/2;
            return (distX2 * distX2 + distY2 * distY2 <= (object1.radius * object1.radius))
        } else if (object2 instanceof Plane) {
            const centerDistance = Math.sqrt(Math.pow((object1.x - object1.y, 2) + (Math.pow(object2.x - object2.y, 2))))
            return centerDistance < (object1.radius + object2.radius)

        }
    }

    checkPlaneCrash() {
        for (let i = 0; i < this.planes.length - 1; i++) {
            for (let j = i + 1; j < this.planes.length; j++) {
                const plane1 = this.planes[i];
                const plane2 = this.planes[j];
                if (this.isCollidedWith(plane1, plane2)) {
                    const crash = plane1.collideWith(plane2);
                    if (crash) {
                        return gameOver()
                    }
                }
            }
        }
    }

    checkPlaneLand() {
        for (let i = 0; i < this.planes.length; i++) {
            for (let j = 0; j < this.terminals.length; j++) {
                const plane = this.planes[i];
                const terminal = this.terminals[j];
                if (this.isCollidedWith(plane, terminal) && Object.values(terminal).includes(plane.color)) {
                    this.removePlane(plane)
                    this.score += 1
                }
            }
        }
    }

    //Draw Objects

    draw(ctx) {
        ctx.clearRect(0, 0, this.GDIM_X, this.GDIM_Y)
        ctx.fillStyle = this.GCOLOR
        ctx.fillRect(0, 0, this.GDIM_X, this.GDIM_Y)

        this.allObjects().forEach(object => {
            object.draw(ctx)
        })
    }

    move() {
        this.allObjects().forEach(object => {
            object.move()
        })
    }

    step() {
        this.move()
        this.planes.forEach((plane) => {
            plane.detectWalls()
        })
        this.checkPlaneCrash()
        this.checkPlaneLand()
    }


    gameOver() {
        
    }

}