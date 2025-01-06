
export class Item {
  name: string;
  cost: number;
  level: number;
  description: string;
  constructor(name: string, cost: number, level: number, description: string) {
    this.name = name;
    this.cost = cost;
    this.level = level;
    this.description = description;
  }
}

export class Weapon extends Item {
  damage: number;

  constructor(name: string, cost: number, level: number, description: string, damage: number) {
    super(name, cost, level, description);

    this.damage = damage;
  }
}

export class Armor extends Item {
  defense: number;

  constructor(name: string, cost: number, level: number, description: string, defense: number) {
    super(name, cost, level, description);

    this.defense = defense;
  }
}
