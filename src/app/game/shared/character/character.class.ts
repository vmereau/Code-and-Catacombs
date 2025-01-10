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

  constructor(
    name: string,
    level: number,
    description: string,
    health: number,
    attack: number,
    mana: number,
    defense: number,
  ) {
    this.name = name;
    this.level = level;
    this.description = description;
    this.health = health;
    this.attack = attack;
    this.mana = mana;
    this.defense = defense;
  }
}

export enum CharacterUpdatableNumberProperties {
  health = 'health',
  mana = 'mana',
  attack = 'attack',
  defense = 'defense',
}
