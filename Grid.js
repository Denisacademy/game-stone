//! row --> height
//! col --> width

//! YARN INIT FOR PACKAGE

import { EnemyObject } from "./EnemyObject.js";
import { GridObject } from "./GridObject.js";
import { ItemObject } from "./ItemObject.js";
import { Player } from "./Player.js";

//if place is familar less chance to encounter spider

async function loadScript(src, cell) {
  console.log(src, "cell", cell);
  // const images = ["./img/oak.png", "./img/palm.png", "./img/pine.png"];
  return new Promise(function (resolve, reject) {
    // let img = new Image();
    // images.forEach((src) => {
    let img = document.createElement("img");
    img.src = src;
    //  console.log('img', img)
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${img}`));

    console.log("img", img);
    cell.appendChild(img);
  });

  //document.querySelector(".three").append(img);
  // });
}

const emoji = {
  player: "🐱",
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

function getHtml(height = 20, width = 10) {
  var docFrag = document.createDocumentFragment();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.setAttribute("data-y", `${row}`);
      cell.setAttribute("data-x", `${col}`);

      if (row === height - 1 && col === 0) {
        // cell.innerText = new GridObject("🐱", "player").sprite;
        loadScript(new GridObject("./img/monkey.png").sprite, cell);
        // cell.innerText = new GridObject("🐱", "player").sprite;
        cell.id = "player";
      } else if (row === 0 && col === width - 1) {
        cell.innerText = new GridObject("💫", "win").sprite;
        cell.id = "win";
      } else {
        // cell.appendChild(img);
        // addImageToHtml(cell);
        // console.log("sprite", new GridObject().sprite);
        // cell.appendChild(new GridObject().sprite);
        // cell.setAttribute("data-type", "undiscovered");
        loadScript(new GridObject().sprite, cell);
        // cell.innerText = new GridObject().sprite;
        // cell.innerText = new GridObject().sprite;
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
      cell.textContent = new GridObject("🐱", "player");
    }
  });
  this.grid[playerY][playerX] = new GridObject();
}

class Grid {
  #currentObject;
  // #currentPlayerPlace;
  constructor(width = 10, height = 20, playerStartX = 0, playerStartY = height - 1) {
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
    this.player = new Player("Monkey King", {
      attack: 10,
      defense: 5,
      hp: 20,
    });
    this.player.describe();
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
    this.grid[height - 1][0] = new GridObject("🐱", "player"); //pl
    this.grid[0][width - 1] = new GridObject("💫", "win"); //st

    // this.movePlayerRight(); //1
    this.controller();
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

  controller() {
    // let that = this;
    console.log("this", this);
    const movements = {
      testThis() {
        console.log("test", this);
      },
      ArrowRight: this.movePlayerRight.bind(this),
      ArrowLeft: this.movePlayerLeft.bind(this),
      ArrowUp: this.movePlayerUp.bind(this),
      ArrowDown: this.movePlayerDown.bind(this),
    };
    console.log(movements.testThis());
    document.addEventListener("keydown", ({ key }) => {
      // movements[key].call(that);
      movements[key]();
    });
  }

  start() {
    // const stats = this.player.getStats()
    this.player.describe();
  }

  executeTurn() {
    // console.log("generate", this.#currentObject);
    if (this.grid[this.playerY][this.playerX].type === "win") {
      console.log("Youa re winner");
      // process.exit();
      return;
    }

    if (this.#currentObject.type === "discovered") {
      this.#currentObject.describe();
      return;
    }

    if (this.#currentObject.type === "item") {
      this.#currentObject.describe();
      const itemStats = this.#currentObject.getStats();
      // console.log(this.#currentObject);
      // debugger;
      this.player.addToStats(itemStats);
      return;
    }

    // enemy
    this.#currentObject.describe();
    // console.log(this.#currentObject);
    const enemyStats = this.#currentObject.getStats(); //because condition
    const enemyName = this.#currentObject.getName();
    const playerStats = this.player.getStats();
    // debugger;
    if (enemyStats.defense > playerStats.attack) {
      console.log(`You lose- ${enemyStats} was too powerfull!`);
      return;
    }

    let totalPlayerDamage = 0;
    // let
    while (enemyStats.hp > 0) {
      // setTimeout(() => {
      // debugger;
      const enemyDamageTurn = playerStats.attack - enemyStats.defense;
      const playerDamageTrun = enemyStats.attack - playerStats.defense;
      console.log("player", playerStats);
      console.log("enemy", enemyStats);
      if (enemyDamageTurn > 0) {
        enemyStats.hp -= enemyDamageTurn;
      }
      if (playerDamageTrun > 0) {
        playerStats.hp -= playerDamageTrun;
        totalPlayerDamage += playerDamageTrun;
      }
      // }, 5000);
    }

    if (playerStats.hp <= 0) {
      console.log("You lose", `${enemyName} was too powerfull`);
      console.log("after player", playerStats);
      console.log("after enemy", enemyStats);
      return;
    }

    this.player.addToStats({ hp: -totalPlayerDamage });
    console.log(`You defeated the ${enemyName} our updated stats`);
    // AFTER FIGHT WE SHOW NEW STATS
    this.player.describe();
  }

  generateGridObject() {
    const random = Math.random();
    let object;

    if (random < 0.15) {
      object = new ItemObject("🤺", {
        name: "sword",
        attack: 3,
        defense: 1,
        hp: 0,
      });
    } else if (random < 0.35) {
      object = new EnemyObject("🦇", {
        name: "Bat",
        attack: 15,
        defense: 1,
        hp: 6,
      });
    } else {
      object = new GridObject("🦶", "discovered");
    }

    return object;
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
      this.grid[this.playerY][this.playerX].describe();
      this.grid[this.playerY][this.playerX] = new GridObject("🐱", "discovered");
      this.grid[this.playerY][this.playerX].describe();
      this.updateMovePlayer("right");
      return;
    }
    // NEW PLACE
    // console.log(this.generateGridObject().describe());
    this.#currentObject = this.generateGridObject();
    // this.#currentObject.describe();
    this.executeTurn();
    this.grid[this.playerY][this.playerX] = new GridObject("🐱", "player"); //generation
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
      this.grid[this.playerY][this.playerX] = new GridObject("🐱", "discovered");
      this.grid[this.playerY][this.playerX].describe();
      this.updateMovePlayer("left");
      return;
    }

    // NEW PLACE
    this.#currentObject = this.generateGridObject();
    this.executeTurn();
    this.grid[this.playerY][this.playerX] = new GridObject("🐱", "player"); //generation
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
      this.grid[this.playerY][this.playerX] = new GridObject("🐱", "discovered");
      this.grid[this.playerY][this.playerX].describe();
      this.updateMovePlayer("up");
      return;
    }

    // NEW PLACE
    this.#currentObject = this.generateGridObject();
    this.executeTurn();
    this.grid[this.playerY][this.playerX] = new GridObject("🐱", "player"); //generation
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
      this.grid[this.playerY][this.playerX] = new GridObject("🐱", "discovered");
      this.grid[this.playerY][this.playerX].describe();
      this.updateMovePlayer("down");
      return;
    }

    // NEW PLACE
    this.#currentObject = this.generateGridObject();

    this.executeTurn();
    this.grid[this.playerY][this.playerX] = new GridObject("🐱", "player"); //generation
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

// console.log(objImg, img);
// console.log(img);
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
