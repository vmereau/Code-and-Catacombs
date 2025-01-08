import {CharacterUpdatableNumberProperties} from '../character/character.class';

export class Item {
  name: string;
  cost: number;
  level: number;
  description: string;
  type: ItemTypeEnum;
  effects: ItemEffect[];

  constructor(name: string, cost: number, level: number, description: string, type: ItemTypeEnum, effects: ItemEffect[]) {
    this.name = name;
    this.cost = cost;
    this.level = level;
    this.description = description;
    this.type = type;
    this.effects = effects;
  }
}

export class ItemEffect {
  targetProperty: CharacterUpdatableNumberProperties;
  value: number;

  constructor(targetProperty: CharacterUpdatableNumberProperties, value: number) {
    this.targetProperty =  targetProperty;
    this.value = value;
  }
}

export enum ItemTypeEnum {
  equipment = "equipment",
  consumable = "consumable"
}
