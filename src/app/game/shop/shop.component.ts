import {ChangeDetectionStrategy, Component, EventEmitter, Output, Signal} from '@angular/core';
import {Story} from '../story/story.class';
import {StoryService} from '../story/story.service';
import {ShopService} from './shop.service';
import {Shop} from './shop.class';
import {Armor, Item, Weapon} from '../shared/items/item.class';

@Component({
  selector: 'app-shop',
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopComponent {
  protected readonly Armor = Armor;
  protected readonly Weapon = Weapon;

  public shop: Signal<Shop | undefined>;
  public isLoading: Signal<boolean>;
  public isError: Signal<unknown>;

  constructor(private shopService: ShopService) {
    this.shop = this.shopService.shop;
    this.isLoading = this.shopService.isShopLoading;
    this.isError = this.shopService.isShopError;
  }

  public loadNewShop() {
    this.shopService.loadNewShop();
  }

  public isWeapon(item: Item): boolean {
    return item instanceof Weapon;
  }

  public isArmor(item: Item): boolean {
    return item instanceof Armor;
  }
}
