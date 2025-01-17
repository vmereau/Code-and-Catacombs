import { Skill } from '../../skill/skill.class';

export class Character {
  name: string;
  level: number;
  description: string;
  health: number;
  attack: number;
  mana: number;
  defense: number;
  skills?: Skill[];
  picture?: string;

  // Front Only
  currentHealth = 0;
  currentMana = 0;

  constructor(
    name: string,
    level: number,
    description: string,
    health?: number,
    attack?: number,
    mana?: number,
    defense?: number,
  ) {
    this.name = name;
    this.level = level;
    this.description = description;
    this.health = health || 0;
    this.attack = attack || 0;
    this.mana = mana || 0;
    this.defense = defense || 0;

    this.currentHealth = health || 0;
    this.currentMana = mana || 0;
  }
}

export enum CharacterUpdatableNumberProperties {
  currentHealth = 'currentHealth',
  currentMana = 'currentMana',
  attack = 'attack',
  defense = 'defense',
}
