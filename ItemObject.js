import { GridObject } from "./GridObject";

class ItemObject extends GridObject {
  #stats = {
    name: null,
    attack: 0,
    defence: 0,
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
    console.log(`${stats.name} Stats : HP ${stats.hp} ATK: ${stats.attack} DEF : ${stats.defence}`);
  }
}

export { ItemObject };
