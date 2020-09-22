import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5;
const snakeBody = [{x: 11, y: 11}];
let newSegments = 0;

export function update(){
    addSegments();
    const inputDirection = getInputDirection();
    for(let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i +1] = { ...snakeBody[i]};
    } // -2 second to last snake element, + 1 is last element

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y +=  inputDirection.y;
}

export function draw(gameBoard){
    console.log('draw snake');
    snakeBody.forEach(segment =>{
        const snakeElement = document.createElement('div') //creates a div with an x en y asis
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    } )
}

export function expandSnake(amount) {
    newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {} ) { // if both elements are in the same position onSnake becomes TRUE
    return snakeBody.some((segment, index) =>{
        if(ignoreHead && index === 0) return false; //completly ignores the head, don't need to check if the snake head is on the snakes head.
        return equalPosition(segment, position)
    });
}

export function getSnakeHead(){
    return snakeBody[0]; //first element of the array, always the head.
}

export function snakeIntersection(){
    return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPosition(pos1, pos2) {
    return pos1.x == pos2.x && pos1.y == pos2.y;
}

function addSegments(){
    for(let i = 0; i < newSegments; i++){
        snakeBody.push({ ...snakeBody[snakeBody.length -1]}); //taking the very end of our snake, duplicating it and adding it at the end of the array (snake)
    }

    newSegments = 0;
}