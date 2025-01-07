import {ChangeDetectionStrategy, Component, Signal} from '@angular/core';
import {ShopService} from './shop.service';
import {Shop} from './shop.class';
import {AdventurerService} from '../adventurer/adventurer.service';
import {Item} from '../shared/items/item.class';

@Component({
  selector: 'app-shop',
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopComponent {
  public shop: Signal<Shop | undefined>;
  public isLoading: Signal<boolean>;
  public isError: Signal<unknown>;


  constructor(private shopService: ShopService,
              private adventurerService: AdventurerService) {
    this.shop = this.shopService.shop;
    this.isLoading = this.shopService.isShopLoading;
    this.isError = this.shopService.isShopError;
  }

  public loadNewShop() {
    this.shopService.loadNewShop();
  }

  public buy(item: Item): boolean {
    if(!this.canBuy(item.cost)) {
      return false;
    }

    this.adventurerService.addToInventory(item);
    this.adventurerService.withdrawGold(item.cost);
    return true;
  }

  public canBuy(amount: number): boolean {
    const gold = this.adventurerService.adventurer()?.gold || 0;

    return gold >= amount;
  }
}
