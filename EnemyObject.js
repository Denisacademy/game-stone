import { GridObject } from "./GridObject";

class EnemyObject extends GridObject {
  #stats = {
    name: null,
    attack: 0,
    defense: 0,
    hp: 0,
  };
  constructor(sprite, stats) {
    super(sprite);
    this.type = "enemy";
    this.#stats = stats;
  }

  getName() {
    return this.#stats.name;
  }

  getStats() {
    return { ...this.#stats };
  }

  describe() {
    const stats = this.#stats;
    console.log(`${this.sprite} You encountered a ${stats.name}!`);
    console.log(`${stats.name} State: HP: ${stats.hp} ATK: ${stats.attack} DEF: ${stats.defense}!`);
  }
}

export { EnemyObject };
