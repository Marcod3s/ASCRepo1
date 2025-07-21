//[1]Create a variable called tileSize and set it equal to a size of your choosing
let tileSize = 40 // size of one tile
let cameraX = 0 // the 1dimensional shift of where we're looking now
let score = 0 // how many coins we have

let coinSize = tileSize / 1.5 // we want the coins to be smaller than tile so that it doesn't overload the map
let spikeSize = tileSize

//2d array, 0 = free space, 1 = wall, 2 = coin, 3 = powerups, 4 = spikes
let backgroundGraphic
let mario = {}
let marioL;

function preload() {
  backgroundGraphic = loadImage("Images/clouds.png");
  // marioL = loadImage("Images/marioIdleL.png")
//   mario.LeftL = loadImage("Images/MarioLR.gif")
//   mario.RightR = loadImage("Images/MarioRR.gif")
//   mario.idleL = loadImage("Images/marioIdleL.png")
//   mario.idleR = loadImage("Images/marioIdleR.png")

}

let levelMap = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1],
  [1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 5, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 5, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 5, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 1, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 2, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 4, 2, 2, 0, 0, 0, 0, 0, 0, 5, 1],
  [1, 0, 0, 2, 2, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 5, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 5, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 5, 1],
  [1, 0, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 4, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 4, 2, 4, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 4, 2, 4, 2, 2, 4, 2, 2, 4, 2, 2, 4, 2, 5, 1],
  [1, 4, 2, 2, 0, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

// global variables of screen dimensions used for display functions
let screenW = 1200
let screenH = levelMap.length * tileSize

// player object, has functions for its movement, and everything else

let player = {
  // the values below are only assigned to the player
  x: 60,
  y: 340,
  size: 40,
  speed: 5,
  yvelocity: 0,
  gravity: 0.3,
  health: 99999999999,
  state: ["L", "idle"],

  move(leftKey, rightKey, upKey) { // function takes 3 params - listed  

    if (keyIsDown(upKey)) {
      let col = int((this.x + cameraX) / tileSize); /// col means the current column we're o n and we use the x position with the camera x so we can correctly see where we are on the grid, and divide by the tile size so it aligns with the grid
      let bottomRow = int((this.y + tileSize - this.size / 2) / tileSize)
      // same concept but for the tile under the player
      if (levelMap[bottomRow][col] != 0 && this.y > 20 && levelMap[bottomRow][col] != 2) {
        this.yvelocity = -8 // this check makes sure the tile below is a wall and not empty, and also so that the player isn't too far down to be able to jump in the first place
      }

    }

    if (keyIsDown(leftKey)) {
      let row = int(this.y / tileSize);                                  // these calculations 
      let nextCol = int((this.x + cameraX - this.size + 17) / tileSize); // are used in all movement for my project
      if (levelMap[row][nextCol] != 1) { //checks of the tile to the left is a wall
        if (this.x > 300) { // this checks the position of the player for the camera to adjust
          this.x -= this.speed; // if it isn't at 300 then it will let the player move
        } else {
          cameraX -= this.speed; // other wise its too far meaning the camera needs to move
        }
      }
    }

    if (keyIsDown(rightKey)) {
      let row = int(this.y / tileSize); // same thing
      let nextCol = int((this.x + cameraX + this.size - 17) / tileSize);
      if (levelMap[row][nextCol] != 1) { // checks if the tile to the right is a wall or not
        if (this.x < 900) { // this is the right edge
          this.x += this.speed; // moves the player if it isnt at the right line yet
        } else {
          cameraX += this.speed; // if it is then it will move the cameraX by the player speed to keep up with it
        }
      }
    }
  },

  applyGravity() {
    /* this if statement checks if the user is at the ceiling: the y position - the radius of the circle would 
    be the ceiling because the radius is the point where it would be in the ceiling or past it, and we want it 
    to go down so we flip the speed from going up to down, and decrease it by 60% (.6)
    */
    if (this.y - this.size / 2 < 0) {
      this.yvelocity *= -0.4// which is why this number is -0.4 (1 - .6 = .4, and we wanna flip it so .4 * -1)
      this.y += 1 // just makes sure it goes down and not up
    }

    if (this.yvelocity < 0) {
      // moving up: check collision above
      let nextRow = int((this.y + this.yvelocity - this.size / 2) / tileSize); // this calculates which row its going to be at next
      let colLeft = int((this.x + cameraX - this.size / 4) / tileSize); // 
      let colRight = int((this.x + cameraX + this.size / 4) / tileSize);

      // Check if any block above either left or right side blocks the jump
      if ((levelMap[nextRow][colLeft] != 1 && levelMap[nextRow][colRight] != 1)) {
        // console.log("clear")
        this.y += this.yvelocity;
        this.yvelocity += this.gravity;
      } else {
        // Collision above, stop upward movement
        this.yvelocity = 0;
      }
    } else {
      // falling or stationary: check block below
      let nextRow = int((this.y + this.yvelocity + this.size / 2) / tileSize);
      let colLeft = int((this.x + cameraX - this.size / 4) / tileSize);
      let colRight = int((this.x + cameraX + this.size / 4) / tileSize);

      if (levelMap[nextRow] &&
        (levelMap[nextRow][colLeft] != 1 && levelMap[nextRow][colRight] != 1)) {
        this.y += this.yvelocity;
        this.yvelocity += this.gravity;
      } else {
        // block below, snap player on top of block
        this.yvelocity = 0;
        this.y = nextRow * tileSize - this.size / 2;
      }
    }

    // Clamp to bottom screen limit (ground level)
    let groundY = height - tileSize * 1.5;
    if (this.y > groundY) {
      this.y = groundY;
      this.yvelocity = 0;
    }
  },

  display() {

    let spriteKey = this.state[1] + this.state[0];
    
    fill("white")
    strokeWeight(1)
    stroke("black")
    rect(player.x - tileSize / 2, player.y - tileSize / 2, tileSize)

  },
}

// check coin collection
function CCC() {
  for (let row = 0; row < levelMap.length; row++) {

    for (let col = 0; col < levelMap[row].length; col++) {

      let ro = floor((player.y) / tileSize)
      
      let co = floor((player.x + cameraX) / tileSize)
  
      if (levelMap[ro][co] == 2) {
        let coin = { x: int((col * tileSize - cameraX)), y: int((row * tileSize - tileSize)) }
        let d = dist(coin.x, coin.y, player.x, player.y);
        if (d < (coinSize * 2)) {
          levelMap[ro][co] = 0
          score += 1;
        }


      }
    }
  }
}

// function spikeCollison() {

//   for (let row = 0; row < levelMap.length; row++) {
//     for (let col = 0; col < levelMap[row].length; col++) {

//       let ro = floor((player.y) / tileSize)
//       let co = floor((player.x + cameraX) / tileSize)

//       if (levelMap[ro][co] == 4) {

//         let spike = { x: int((col * tileSize - cameraX)), y: int((row * tileSize - tileSize)) }

        
//         let spikeLeft = spike.x + 10;
//         let spikeRight = spike.x - 10;
//         let spikeTop = spike.y - 50;
//         let spikeBottom = spike.y + 10;

//         let myLeft = player.x - 25;
//         let myRight = player.x + 25;
//         let myTop = player.y - 25;
//         let myBottom = player.y + 25;

//         fill("red")
//         rectMode(CENTER)
//         rect(spikeLeft, spikeTop, 10, 10)

//         if (myLeft > enemyRight || myRight < enemyLeft || myTop > enemyBottom || myBottom < enemyTop) {


//         } else {
//           player.health -= 1;
//           player.yvelocity = -3;
//         }
//       }
//     }
//   }
// }

function spikeCollison() { // Loop over every row and column of the levelMap: 
  for (let row = 0; row < levelMap.length; row++) {

    for (let col = 0; col < levelMap[row].length; col++) {

      // Check if the current tile is a spike (value 4)
      if (levelMap[row][col] === 4) {

        let spike = {x: int((col * tileSize - cameraX)), y: int((row * tileSize ))}

        let spikeX = col * tileSize - cameraX + 20;
        let spikeY = row * tileSize + 20;

        let d = dist(spikeX, spikeY, player.x, player.y);

        if (d < tileSize - 3) {
          player.health -= 1
          player.yvelocity = -3
        }
      } 
    }
  }
}

function winColli(){

  for (let row = 0; row < levelMap.length; row++) {

    for (let col = 0; col < levelMap[row].length; col++) {
      
      let ro = floor((player.y) / tileSize)
      
      let co = floor((player.x + cameraX) / tileSize)
      if (levelMap[row][col] == 5){
        let winX = col * tileSize - cameraX;
        let winY = row * tileSize;
        let myLeft = player.x - 20;
        let myRight = player.x + tileSize;
        let myTop = player.y - 20;
        let myBottom = player.y + tileSize;

        if (
          myRight> winX &&
          myLeft < winX + tileSize &&
          myBottom > winY &&
          myTop < winY + tileSize
        ){
          player.speed = 0;
          player.yvelocity = 0;
          fill('green');
          textSize(75);
          text("YOU WIN!", 500, 300);
        }
      }
    }
  }

}

function drawMap() {
  for (let x = 0; x < screenW; x += backgroundGraphic.width) {
    for (let y = 0; y < screenH; y += backgroundGraphic.height) {
      image(backgroundGraphic, x, y, backgroundGraphic.width, backgroundGraphic.height);
    }
  }

  for (let row = 0; row < levelMap.length; row++) {
    for (let col = 0; col < levelMap[row].length; col++) {
      if (levelMap[row][col] == 1) {
        fill('brown')
        strokeWeight(1)
        
        rect(col * tileSize - cameraX, row * tileSize, tileSize, tileSize)
      }
      else if (levelMap[row][col] == 2) {
        fill('yellow')
        strokeWeight(1)
        ellipse(col * tileSize - cameraX + tileSize / 2, row * tileSize + tileSize / 2, coinSize)
      }
      else if (levelMap[row][col] == 4) {
        fill('grey')
        strokeWeight(1)
        triangle(
          col * tileSize - cameraX, 
          row * tileSize + tileSize,
          (col * tileSize - cameraX) + tileSize, 
          row * tileSize + tileSize,
          (col * tileSize - cameraX) + tileSize / 2, 
          row * tileSize)
      }
      else if (levelMap[row][col] == 5){
        fill('green')
        strokeWeight(1)
        rect(col * tileSize - cameraX, row * tileSize, tileSize, tileSize)
      }

    }
  }
}

function setup() {
  createCanvas(screenW, screenH); 
}

function mousePos() {
  fill("Black")
  stroke("black")
  strokeWeight(0)
  textSize(12)
  text("x: " + mouseX + " y: " + mouseY, mouseX + 5, mouseY - 5)
  // text("gx: " + mouseX / tileSize + " gy: " + mouseY / tileSize - 1, mouseX + 5, mouseY + 10)
}

function playerPos() {
  fill("Black")
  stroke("black")
  strokeWeight(0)
  textSize(12)
  text("px: " + round(player.x, 1) + ", py: " + round(player.y), mouseX + 5, mouseY - 20)
  text("grid: [" + (int(player.y / tileSize)) + "], [" + (int(player.x / tileSize)) + "]", mouseX + 5, mouseY - 35)
  textSize(18)
  text("score: " + score, 45, 15)
  text("health: " + player.health, 45, 35)
}

function draw() {
  background(220);
  CCC()
  drawMap()
  playerFuncs()
  spikeCollison()
  winColli()
  mousePos()
  playerPos()
  strokeWeight(3)
  line(300, 0, 300, height)
  line(900, 0, 900, height)
}

function playerFuncs() {
  player.move(65, 68, 87)
  player.display()
  player.applyGravity()
  //game over 
  if (player.health <= 0) {
    player.speed = 0;
    player.yvelocity = 0;
    player.health = 0;
    fill('Red')
    textSize(75)
    text("GAME OVER\n YOU DIED!", 500, 300)
  }
}