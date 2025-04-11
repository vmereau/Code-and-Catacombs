import { ChangeDetectionStrategy, Component, EventEmitter, Output, Signal } from '@angular/core';
import { Button } from 'primeng/button';
import { ItemInfosComponent } from '../shared/items/item-infos/item-infos.component';
import { Item } from '../shared/items/item.class';
import { Shop } from './shop.class';
import { ShopService } from './shop.service';
import {AdventurerState} from '../adventurer/adventurer-state.service';

@Component({
  selector: 'app-shop',
  imports: [Button, ItemInfosComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {
  public shop: Signal<Shop | undefined>;
  public isLoading: Signal<boolean>;
  public isError: Signal<unknown>;

  @Output() leaveShop = new EventEmitter();

  constructor(
    private shopService: ShopService,
    private adventurerState: AdventurerState,
  ) {
    this.shop = this.shopService.shop;
    this.isLoading = this.shopService.isShopLoading;
    this.isError = this.shopService.isShopError;
  }

  public buy(item: Item): boolean {
    if (!this.canBuy(item.cost)) {
      return false;
    }

    this.adventurerState.addToInventory(item);
    this.adventurerState.withdrawGold(item.cost);
    return true;
  }

  public canBuy(amount: number): boolean {
    const gold = this.adventurerState.adventurer()?.gold || 0;

    return gold >= amount;
  }

  public generateNewShop(): void {
    this.shopService.generateNewShop();
  }
}
