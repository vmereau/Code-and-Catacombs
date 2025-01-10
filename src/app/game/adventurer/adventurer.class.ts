import { Character } from '../shared/character/character.class';

export class Adventurer extends Character {
  archetype: string;

  // Front Only
  currentHealth = 0;
  currentMana = 0;
  gold = 0;

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
    this.currentHealth = health;
    this.currentMana = mana;
    this.gold = 0;
  }
}
