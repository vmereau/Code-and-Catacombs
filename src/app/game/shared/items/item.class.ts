
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
  targetProperty: ItemTargetPropertyEnum;
  value: number;

  constructor(targetProperty: ItemTargetPropertyEnum, value: number) {
    this.targetProperty =  targetProperty;
    this.value = value;
  }
}

export enum ItemTargetPropertyEnum {
  health = 'health',
  mana = 'mana',
  attack = 'attack',
  defense = 'defense',
}

export enum ItemTypeEnum {
  permanent = "permanent",
  consumable = "consumable"
}
