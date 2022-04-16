import Constants from "../Constants";



export default function (entities, { events, dispatch }) {

    // RANDOM COORDINATE FUNCTION 
    const randomPositions = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };


    // VALIDATE PLAYER EATING APPLE
    const validate_Apple = (min, max) => {

        return "fuck all"
    };


    // GAME OBJECTS PROP
    var head = entities.head;
    var food = entities.food;
    var tail = entities.tail;
    const constant_speed = Constants.SNAKE_SPEED;

    // DETECT PLAYER INPUT
    if (events.length) {
        events.forEach((e) => {
            switch (e) {
                case "move-up":
                    if (head.yspeed === constant_speed) return;
                    head.yspeed = -constant_speed;
                    head.xspeed = 0;
                    return;
                case "move-right":
                    if (head.xspeed === -constant_speed) return;
                    head.xspeed = constant_speed;
                    head.yspeed = 0;
                    return;
                case "move-down":
                    if (head.yspeed === -constant_speed) return;
                    head.yspeed = constant_speed;
                    head.xspeed = 0;
                    return;
                case "move-left":
                    if (head.xspeed === constant_speed) return;
                    head.xspeed = -constant_speed;
                    head.yspeed = 0;
                    return;
            }
        });
    }


    // BOUNDRIES & SCORING
    head.nextMove -= 1;
    if (head.nextMove === 0) {
        head.nextMove = head.updateFrequency;

        if (
            // game over
            head.position[0] + (head.xspeed * constant_speed) < 0 ||
            head.position[0] + (head.xspeed * constant_speed) >= Constants.GRID_SIZE ||
            head.position[1] + (head.yspeed * constant_speed) < 0 ||
            head.position[1] + (head.yspeed * constant_speed) >= Constants.GRID_SIZE
        ) {
            // DISPATCH AN EVENT STRING TO CHECK IN APP.JS
            console.log("OUT!")
            dispatch("game-over");
        }

        else {
            // carry on...
            head.position[0] += head.xspeed;
            head.position[1] += head.yspeed;



            // TODO: 
            // tail needs to extend 
            // tail.elements = []

            // detect if head touches any tail.elements

            tail.elements = [[head.position[0], head.position[1]], ...tail.elements];
            tail.elements.pop()
            
            
            // DETECT EATING APPLE
            if (
                Math.round(head.position[0]) === food.position[0] &&
                Math.round(head.position[1]) === food.position[1]
            ) {
                food.position = [
                    randomPositions(0, Constants.GRID_SIZE - 1),
                    randomPositions(0, Constants.GRID_SIZE - 1),
                ];
                tail.elements.push( [head.position[0], head.position[1]]  )
            }
            
            console.log(tail)


        }
    }


    return entities;
}