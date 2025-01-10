import { computed, Injectable, linkedSignal, resource, Signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AdventurerService } from '../adventurer/adventurer.service';
import { Character } from '../shared/character/character.class';
import { GenerateShopDto, Shop } from './shop.class';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private apiUrl = `${environment.api.baseUrl}/shop`;

  private shopResource = resource({
    loader: async ({ request, abortSignal }) => this.fetchShop(request, abortSignal),
  });

  public shop: Signal<Shop | undefined> = computed(() => this.shopResource.value());
  public isShopLoading: Signal<boolean> = computed(() => this.shopResource.isLoading());
  public isShopError: Signal<unknown> = computed(() => this.shopResource.error());
  public shopKeeper: WritableSignal<Character> = linkedSignal(() => {
    const shop = this.shop();

    const character = new Character('Shopkeeper', 0, shop?.shopkeeper_description || '');

    return { ...character };
  });

  constructor(private adventurerService: AdventurerService) {}

  public generateNewShop() {
    this.shopResource.reload();
  }

  private async fetchShop(request: unknown, abortSignal: AbortSignal): Promise<Shop | undefined> {
    const adventurer = this.adventurerService.adventurer();
    if (!adventurer) {
      return undefined;
    }

    console.log('generating a new shop...');

    const generateShopDto: GenerateShopDto = {
      adventurerArchetype: adventurer?.archetype,
      level: 1,
      numberOfItems: 3,
    };

    const response = await fetch(`${this.apiUrl}/generate`, {
      signal: abortSignal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(generateShopDto),
    });

    if (!response.ok) throw new Error('Unable to load new shop');
    return response.json();
  }
}
