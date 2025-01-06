import {Armor, Item, Weapon} from '../shared/items/item.class';

export enum ShopType {
  "Armor" = "Armor",
  "Weapons" = "Weapons"
}

export class Shop {
  name: string;
  shopkeeper_description: string;
  goods: Item[];

  constructor(name: string, shopkeeper_description: string, goods: Item[]) {
    this.name = name;
    this.shopkeeper_description = shopkeeper_description;
    this.goods = goods;
  }
}

export interface generateShopDto {
  numberOfItems: number;
  level: number;
  type: ShopType;
  adventurerArchetype: string;
}

