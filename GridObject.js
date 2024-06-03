//sprite : star  monkey trees  ---> emoji
//type : undiscovered discovered player win
// https://myenglishkid.ru/glossary_trees/
class GridObject {
  #backgroundSprites = ["trees", "🎍", "🍁 ", "🎌"];

  constructor(sprite, type = "undiscovered") {
    if (!sprite) {
      const index = Math.floor(Math.random() * this.#backgroundSprites.length);
      this.sprite = this.#backgroundSprites[index];
    } else {
      this.sprite = sprite;
    }
    this.type = type;
  }
}

export { GridObject };
