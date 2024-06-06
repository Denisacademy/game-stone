//sprite : star  monkey trees  ---> emoji
//type : undiscovered discovered player win
// https://myenglishkid.ru/glossary_trees/

// const oak = new Image();
// oak.src = "./img/oak.png";

async function loadScript(src, cell) {
  // const images = ["./img/oak.png", "./img/palm.png", "./img/pine.png"];
  return new Promise(function (resolve, reject) {
    // let img = new Image();
    // images.forEach((src) => {
    let img = document.createElement("img");
    img.src = src;
    //  console.log('img', img)
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${img}`));

    cell.appendChild(img);
    console.log("img", img);
  });

  //document.querySelector(".three").append(img);
  // });
}

// loadScript();

class GridObject {
  // #backgroundSprites = ["🌹", "🌻", "🌴 ", "🌿"];
  #backgroundSprites = ["./img/oak.png", "./img/palm.png", "./img/pine.png"];
  // #backgroundSprites = getImages();

  constructor(sprite, type = "undiscovered") {
    if (!sprite) {
      const index = Math.floor(Math.random() * this.#backgroundSprites.length);
      this.sprite = this.#backgroundSprites[index];
    } else {
      this.sprite = sprite;
    }
    this.type = type;
  }

  describe() {
    const random = Math.random();
    if (random < 0.33) {
      console.log("Coast is clear");
    } else if (random < 0.66) {
      console.log("these surroundings look familiar");
    } else {
      console.log("There`s not so much here");
    }
  }
}

export { GridObject };
