import { computed, Injectable, resource, Signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AdventurerService } from '../adventurer/adventurer.service';
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

  constructor(private adventurerService: AdventurerService) {}

  public loadNewShop() {
    this.shopResource.reload();
  }

  private async fetchShop(request: unknown, abortSignal: AbortSignal): Promise<Shop> {
    console.log('generating a new shop...');

    const generateShopDto: GenerateShopDto = {
      adventurerArchetype: this.adventurerService.adventurer()?.archetype,
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
