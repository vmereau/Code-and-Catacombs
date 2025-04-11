import {computed, Injectable, linkedSignal, Signal, WritableSignal} from '@angular/core';
import {Shop} from './shop.class';
import {Character} from '../shared/character/character.class';
import {ShopService} from './shop.service';

@Injectable({
  providedIn: 'root'
})
export class ShopState {

  public shop: Signal<Shop | undefined> = computed(() => this.shopService.shopResource.value());
  public isShopLoading: Signal<boolean> = computed(() => this.shopService.shopResource.isLoading());
  public isShopError: Signal<unknown> = computed(() => this.shopService.shopResource.error());
  public shopKeeper: WritableSignal<Character> = linkedSignal(() => {
    const shop = this.shop();

    const character = new Character('Shopkeeper', 0, shop?.shopkeeper_description || '');

    return { ...character };
  });

  constructor(private shopService: ShopService) { }
}
