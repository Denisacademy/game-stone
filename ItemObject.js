import { GridObject } from "./GridObject.js";

class ItemObject extends GridObject {
  #stats = {
    name: null,
    attack: 0,
    defense: 0,
    hp: 0,
  };

  constructor(sprite, stats) {
    super(sprite);
    this.type = "item"; //if no type --> 'undiscovered'
    this.#stats = stats;
  }

  itemName() {
    return this.#stats.name;
  }

  getStats() {
    return {
      ...this.#stats,
    };
  }
  // polymorfism as GridObject
  describe() {
    const stats = this.#stats;
    console.log(`${this.sprite} you found a ${stats.name}`);
    console.log(`${stats.name} Stats : HP ${stats.hp} ATK: ${stats.attack} DEF : ${stats.defense}`);
  }
}

export { ItemObject };
