import { Character } from '../shared/character/character.class';

export class Adventurer extends Character {
  archetype: string;

  // Front Only
  gold = 0;
  experience = 0;

  constructor(
    name: string,
    level: number,
    description: string,
    health: number,
    attack: number,
    mana: number,
    defense: number,
    archetype: string,
  ) {
    super(name, level, description, health, attack, mana, defense);

    this.archetype = archetype;
    this.gold = 100;
    this.experience = 0;
  }
}
