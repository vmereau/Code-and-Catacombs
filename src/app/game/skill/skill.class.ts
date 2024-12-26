export class Skill {
  name: string;
  description: string;
  cost: number;
  effect: SkillEffect[];

  constructor(name: string, description: string, cost: number, effect: SkillEffect[]) {
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.effect = effect;
  }
}

export class SkillEffect {
  targetProperty: SKillTargetPropertyEnum;
  value: number;
  targetCharacter: SkillTargetCharacterEnum;

  constructor(targetProperty: SKillTargetPropertyEnum, value: number, targetCharacter: SkillTargetCharacterEnum) {
    this.targetCharacter = targetCharacter;
    this.value = value;
    this.targetProperty = targetProperty;
  }
}

export enum SkillTargetCharacterEnum {
  self = "self",
  enemy = "enemy"
}

export enum SKillTargetPropertyEnum {
  health = "health",
  mana = "mana",
  attack = "attack",
  defense = "defense"
}
