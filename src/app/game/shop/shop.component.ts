import {ChangeDetectionStrategy, Component, Signal} from '@angular/core';
import {ShopService} from './shop.service';
import {Shop} from './shop.class';

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

  constructor(private shopService: ShopService) {
    this.shop = this.shopService.shop;
    this.isLoading = this.shopService.isShopLoading;
    this.isError = this.shopService.isShopError;
  }

  public loadNewShop() {
    this.shopService.loadNewShop();
  }
}
