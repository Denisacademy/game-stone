//sprite : star  monkey trees  ---> emoji
//type : undiscovered discovered player win
// https://myenglishkid.ru/glossary_trees/
class GridObject {
  #backgroundSprites = ["🍃", "🎍", "🍁 ", "🎌"];

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
