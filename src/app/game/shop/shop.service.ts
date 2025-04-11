import { computed, Injectable, linkedSignal, resource, Signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Character } from '../shared/character/character.class';
import { StoryService } from '../story/story.service';
import { GenerateShopDto, Shop } from './shop.class';
import {FetchService} from '../shared/fetch.service';
import {AdventurerState} from '../adventurer/adventurer-state.service';

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

  constructor(
    private adventurerState: AdventurerState,
    private storyService: StoryService,
    private fetchService: FetchService
  ) {}

  public generateNewShop() {
    this.shopResource.reload();
  }

  private async fetchShop(request: unknown, abortSignal: AbortSignal): Promise<Shop | undefined> {
    const adventurer = this.adventurerState.adventurer();
    if (!adventurer) {
      return undefined;
    }

    console.log('generating a new shop...');

    const generateShopDto: GenerateShopDto = {
      adventurerArchetype: adventurer?.archetype,
      level: 1,
      numberOfItems: 3,
    };

    const biome = this.storyService.story()?.biome;

    if (biome) generateShopDto.biome = biome;

    return this.fetchService.fetch(`${this.apiUrl}/generate`, 'POST', abortSignal, generateShopDto);
  }
}
