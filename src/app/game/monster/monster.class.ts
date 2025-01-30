import { Character } from '../shared/character/character.class';

export class Monster extends Character {
  experienceGiven: number;
  goldGiven: number;

  constructor(
    name: string,
    level: number,
    description: string,
    health: number,
    attack: number,
    mana: number,
    defense: number,
    experienceGiven: number,
    goldGiven: number,
  ) {
    super(name, level, description, health, attack, mana, defense);

    this.experienceGiven = experienceGiven;
    this.goldGiven = goldGiven;
  }
}

export interface GenerateMonstersDto {
  number: number;
  level: number;
  biome: string;
  withPictures: boolean;
}
