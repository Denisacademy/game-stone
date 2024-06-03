//! row --> height
//! col --> width

//! YARN INIT FOR PACKAGE

import { GridObject } from "./GridObject.js";

const emoji = {
  player: "😎",
  win: "💫",
};

class Grid {
  #currentObject;

  constructor(width = 5, height = 5, playerStartX = 0, playerStartY = height - 1) {
    this.width = width;
    this.height = height;
    // PLAYER X Y
    this.playerX = playerStartX;
    this.playerY = playerStartY;

    // create the grid
    this.grid = [];
    for (let row = 0; row < height; row++) {
      let thisRow = [];
      for (let col = 0; col < width; col++) {
        thisRow[col] = new GridObject(); //PUSH ANY TREE
      }
      this.grid[row] = thisRow;
    }

    //SET player pos and STAR
    this.grid[height - 1][0] = new GridObject("😎", "player"); //pl
    this.grid[0][width - 1] = new GridObject("💫", "win"); //st

    // this.movePlayerRight(); //1
  }
  // THIS
  displayGrid() {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        // FROM NODE
        // console.log(this.grid[row][col]); //OUTPUT
        // process.stdout.write(this.grid[row][col].sprite);
        // TAB
        // process.stdout.write("\t");
      }
      // Newline
      // process.stdout.write("\n");
    }
  }

  removePrevPlayerPlace() {
    this.grid[this.playerY][this.playerX] = new GridObject("🐾", "discovered");
  }

  movePlayerRight() {
    //if (this.this.playerX + 1 >= this.width) works
    if (this.playerX === this.width - 1) {
      console.log("you cant move");
      return;
    }

    this.grid[this.playerY][this.playerX] = new GridObject("🐾", "discovered");
    this.playerX++;

    // CHECK IF DISCOVERED MEANING NOT GENERATE ITEM and set {monkey, 'discovered'}
    if (this.grid[this.playerY][this.playerX].type === "discovered") {
      this.grid[this.playerY][this.playerX] = new GridObject("😎", "discovered");
      console.log("discovered", this.grid[this.height - 1], "😎", this.playerX);
      return;
    }

    // NEW PLACE
    this.grid[this.playerY][this.playerX] = new GridObject("😎", "player"); //generation

    console.log(this.grid[this.height - 1]);
  }

  // movePlayerLeft() {
  //   //if (this.this.playerX + 1 >= this.width) works
  //   if (this.playerX <= 0) {
  //     console.log("you cant move");
  //     return;
  //   }

  //   this.grid[this.playerY][this.playerX] = new GridObject("🐾", "discovered");
  //   this.playerX--;

  //   // CHECK IF DISCOVERED MEANING NOT GENERATE ITEM and set {monkey, 'discovered'}
  //   if (this.grid[this.playerY][this.playerX].type === "discovered") {
  //     this.grid[this.playerY][this.playerX] = new GridObject("😎", "discovered");
  //     console.log("discovered", this.grid[this.height - 1], "😎", this.playerX);
  //     return;
  //   }

  //   // NEW PLACE
  //   this.grid[this.playerY][this.playerX] = new GridObject("😎", "player"); //generation

  //   console.log(this.grid[this.height - 1]);
  // }
  //
}

const g = new Grid();
window.store = g;

/*flow
Check pos if no bounds
change prev place to =  new GridObject('foot', 'discovered')
player++

check if pos is discovered before ->> {monkey, 'discovered'}

*/
