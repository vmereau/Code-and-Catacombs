import { Item } from '../shared/items/item.class';

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

export interface GenerateShopDto {
  numberOfItems: number;
  level: number;
  adventurerArchetype: string | undefined;
}
