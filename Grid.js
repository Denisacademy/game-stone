//! row --> height
//! col --> width

//! YARN INIT FOR PACKAGE

import { GridObject } from "./GridObject.js";

//if place is familar less chance to encounter spider

const emoji = {
  player: "😎",
  win: "💫",
  foot: "🐾",
};

function getElem(x, y) {
  let cell;
  document.querySelectorAll(".cell").forEach((el) => {
    if (+el.dataset.x === x && +el.dataset.y === y) {
      // console.log(el);
      cell = el;
    }
  });
  return cell;
}

function getHtml() {
  var docFrag = document.createDocumentFragment();

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.setAttribute("data-y", `${row}`);
      cell.setAttribute("data-x", `${col}`);

      if (row === 4 && col === 0) {
        cell.innerText = new GridObject("😎", "player").sprite;
        cell.id = "player";
      } else if (row === 0 && col === 4) {
        cell.innerText = new GridObject("💫", "win").sprite;
        cell.id = "win";
      } else {
        cell.innerText = new GridObject().sprite;
        // cell.setAttribute("data-type", "undiscovered");
      }

      docFrag.appendChild(cell);
    }
  }

  document.body.querySelector(".grid").appendChild(docFrag);
}

getHtml();

function updateGridHtml(playerX, playerY) {
  document.querySelectorAll(".cell").forEach((cell) => {
    if (+el.dataset.y === playerY && +el.dataset.x == playerX) {
      cell.textContent = new GridObject("😎", "player");
    }
  });
  this.grid[playerY][playerX] = new GridObject();
}

class Grid {
  #currentObject;
  // #currentPlayerPlace;
  constructor(width = 5, height = 5, playerStartX = 0, playerStartY = height - 1) {
    this.currentPlayerPlace = {
      x: playerStartX,
      y: height - 1,
      el: document.querySelector("#player"),
    };

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
      this.grid[this.playerY][this.playerX].describe();
      this.updateMovePlayer("right");
      return;
    }
    // NEW PLACE
    this.grid[this.playerY][this.playerX] = new GridObject("😎", "player"); //generation
    // document.querySelector('div.className[style*="text-decoration:line-through"]');
    this.updateMovePlayer("right");
  }

  movePlayerLeft() {
    //if (this.this.playerX + 1 >= this.width) works
    if (this.playerX === 0) {
      console.log("you cant move");
      return;
    }

    this.grid[this.playerY][this.playerX] = new GridObject("🐾", "discovered");

    this.playerX--;

    if (this.grid[this.playerY][this.playerX].type === "discovered") {
      this.grid[this.playerY][this.playerX] = new GridObject("😎", "discovered");
      this.grid[this.playerY][this.playerX].describe();
      this.updateMovePlayer("left");
      return;
    }

    // NEW PLACE
    this.grid[this.playerY][this.playerX] = new GridObject("😎", "player"); //generation
    this.updateMovePlayer("left");
  }

  movePlayerUp() {
    //if (this.this.playerX + 1 >= this.width) works
    if (this.playerY === 0) {
      console.log("you cant move");
      return;
    }

    this.grid[this.playerY][this.playerX] = new GridObject("🐾", "discovered");
    this.playerY--;

    // CHECK IF DISCOVERED MEANING NOT GENERATE ITEM and set {monkey, 'discovered'}
    if (this.grid[this.playerY][this.playerX].type === "discovered") {
      this.grid[this.playerY][this.playerX] = new GridObject("😎", "discovered");
      this.grid[this.playerY][this.playerX].describe();
      this.updateMovePlayer("up");
      return;
    }

    // NEW PLACE
    this.grid[this.playerY][this.playerX] = new GridObject("😎", "player"); //generation
    this.updateMovePlayer("up");
  }
  movePlayerDown() {
    //if (this.this.playerX + 1 >= this.width) works
    if (this.playerY === this.height - 1) {
      console.log("you cant move");
      return;
    }

    this.grid[this.playerY][this.playerX] = new GridObject("🐾", "discovered");
    this.playerY++;

    // CHECK IF DISCOVERED MEANING NOT GENERATE ITEM and set {monkey, 'discovered'}
    if (this.grid[this.playerY][this.playerX].type === "discovered") {
      this.grid[this.playerY][this.playerX] = new GridObject("😎", "discovered");
      this.grid[this.playerY][this.playerX].describe();
      this.updateMovePlayer("down");
      return;
    }

    // NEW PLACE
    this.grid[this.playerY][this.playerX] = new GridObject("😎", "player"); //generation
    this.updateMovePlayer("down");
  }

  updateMovePlayer(direction = "right") {
    const newPlace = getElem(this.playerX, this.playerY);

    const { grid, playerX, playerY } = this;
    const type = grid[playerY][playerX].type;
    const isDiscovered = type === "discovered";

    if (direction === "right") {
      if (isDiscovered) {
        getElem(playerX - 1, playerY).innerText = grid[playerY][playerX - 1].sprite;
        newPlace.innerText = grid[playerY][playerX].sprite;
      } else {
        getElem(playerX - 1, playerY).innerText = grid[playerY][playerX - 1].sprite; //prev
        newPlace.innerText = grid[playerY][playerX].sprite;
      }
    } else if (direction === "left") {
      if (isDiscovered) {
        getElem(playerX + 1, playerY).innerText = grid[playerY][playerX + 1].sprite;
        newPlace.innerText = grid[playerY][playerX].sprite;
      } else {
        getElem(playerX + 1, playerY).innerText = grid[playerY][playerX + 1].sprite;
        newPlace.innerText = grid[playerY][playerX].sprite;
      }
    } else if (direction === "up") {
      if (isDiscovered) {
        getElem(playerX, playerY + 1).innerText = grid[playerY + 1][playerX].sprite;
        newPlace.innerText = grid[playerY][playerX].sprite;
      } else {
        getElem(playerX, playerY + 1).innerText = grid[playerY + 1][playerX].sprite;
        newPlace.innerText = grid[playerY][playerX].sprite;
      }
    } else if (direction === "down") {
      if (isDiscovered) {
        getElem(playerX, playerY - 1).innerText = grid[playerY - 1][playerX].sprite;
        newPlace.innerText = grid[playerY][playerX].sprite;
      } else {
        getElem(playerX, playerY - 1).innerText = grid[playerY - 1][playerX].sprite;
        newPlace.innerText = grid[playerY][playerX].sprite;
      }
    }

    // updateCells.call(this);
  }
}

const g = new Grid();
window.grid = g;

/*flow
Check pos if no bounds
change prev place to =  new GridObject('foot', 'discovered')
player++

check if pos is discovered before ->> {monkey, 'discovered'}


state
 ****
  monkey player 
  sun  win
  tree undiscovered
  foot after move prevPlace discovered
***
  monkey player after any move discovered
  tree undiscovered
  sun  win
  foot after move prevPlace discovered


  [{monkey, player}] -> three sun
    --> [{foot discovered}, {monkey, player}]
    return prevPlace --> [{monkey, player}, {foot discovered}]
*/
