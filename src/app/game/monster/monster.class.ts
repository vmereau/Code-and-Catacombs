import { Character } from '../shared/character/character.class';

export class Monster extends Character {
  constructor(
    name: string,
    level: number,
    description: string,
    health: number,
    attack: number,
    mana: number,
    defense: number,
  ) {
    super(name, level, description, health, attack, mana, defense);
  }
}

export interface GenerateMonstersDto {
  number: number;
  level: number;
  biome: string;
  withPictures: boolean;
}
