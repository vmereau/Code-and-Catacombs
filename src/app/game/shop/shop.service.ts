import { Injectable, resource, } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GenerateShopDto, Shop } from './shop.class';
import {FetchService} from '../shared/fetch.service';
import {AdventurerState} from '../adventurer/adventurer-state.service';
import {StoryState} from '../story/story-state.service';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private apiUrl = `${environment.api.baseUrl}/shop`;

  public shopResource = resource({
    loader: async ({ request, abortSignal }) => this.fetchShop(request, abortSignal),
  });

  constructor(
    private adventurerState: AdventurerState,
    private storyState: StoryState,
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

    const biome = this.storyState.story()?.biome;

    if (biome) generateShopDto.biome = biome;

    return this.fetchService.fetch(`${this.apiUrl}/generate`, 'POST', abortSignal, generateShopDto);
  }
}
