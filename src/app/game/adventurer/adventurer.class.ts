import { Character } from '../shared/character/character.class';

export class Adventurer extends Character {
  archetype: string;

  // Front Only
  gold = 0;
  experience = 0;

  levelUpExperience = 20;

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
    this.levelUpExperience = 20;
  }
}

export class AdventurerLevelUpDto {
  adventurer: Adventurer;
  experience: number;
  levelUpExperience: number;

  constructor(adventurer: Adventurer, experience: number, levelUpExperience: number) {
    this.adventurer = adventurer;
    this.experience = experience;
    this.levelUpExperience = levelUpExperience;
  }
}

export class GenerateAdventurerDto {
  additionalGenerationInfos?: string;

  constructor(about?: string) {
    this.additionalGenerationInfos = about;
  }
}

export enum AdventurerUpdatableNumberProperties {
  experience = 'experience',
  gold = 'gold',
  level = 'level'
}
