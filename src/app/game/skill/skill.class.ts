import {Story} from '../story/story.class';

export class Skill {
  name: string;
  description: string;
  cost: number;
  effects: SkillEffect[];

  constructor(name: string, description: string, cost: number, effect: SkillEffect[]) {
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.effects = effect;
  }
}

export class SkillEffect {
  targetProperty: SkillTargetPropertyEnum;
  value: number;
  targetCharacter: SkillTargetCharacterEnum;

  constructor(targetProperty: SkillTargetPropertyEnum, value: number, targetCharacter: SkillTargetCharacterEnum) {
    this.targetCharacter = targetCharacter;
    this.value = value;
    this.targetProperty = targetProperty;
  }
}

export interface GenerateSkillDto {
  archetype: string | undefined;
  level: number | undefined;
}

export enum SkillTargetCharacterEnum {
  self = "self",
  enemy = "enemy"
}

export enum SkillTargetPropertyEnum {
  health = "health",
  mana = "mana",
  attack = "attack",
  defense = "defense"
}
