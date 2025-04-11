import {
  computed,
  effect,
  Injectable,
  linkedSignal,
  resource,
  ResourceRef,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {environment} from '../../../environments/environment';
import {CharacterUpdatableNumberProperties} from '../shared/character/character.class';
import {Item, ItemTypeEnum} from '../shared/items/item.class';
import {
  Adventurer,
  AdventurerLevelUpDto,
  AdventurerUpdatableNumberProperties,
  GenerateAdventurerDto
} from './adventurer.class';
import {FetchService} from '../shared/fetch.service';

@Injectable({
  providedIn: 'root',
})
export class AdventurerService {
  private apiUrl = `${environment.api.baseUrl}/adventurer`;

  public adventurerResource: ResourceRef<Adventurer | undefined> = resource({
    loader: async ({ request, abortSignal }) => this.fetchAdventurer(abortSignal),
  });

  /*public levelUpResource: ResourceRef<Adventurer | undefined> = resource({
    request: () => this.needLevelUp(),
    loader: async ({ request, abortSignal }) => this.fetchLevelUp(request, abortSignal),
  })*/

  public adventurerImgResource = resource({
    request: () => this.adventurerResource.value(),
    loader: async ({ request, abortSignal }) => this.fetchAdventurerImg(this.adventurerResource.value(), abortSignal),
  });

  public additionalGenerationInfos: WritableSignal<string | undefined> = signal(undefined);

  constructor(private fetchService: FetchService) {}


  public loadNewAdventurer() {
    this.adventurerResource.reload();
  }

  private async fetchAdventurer(abortSignal: AbortSignal): Promise<Adventurer> {
    console.log('generating a new Adventurer...');

    const generateAdventurerDto: GenerateAdventurerDto = {};

    if (this.additionalGenerationInfos()) {
      generateAdventurerDto.additionalGenerationInfos = this.additionalGenerationInfos();
    }

    return this.fetchService.fetch(`${this.apiUrl}/generate`, 'POST', abortSignal, generateAdventurerDto);
  }

  /*private async fetchLevelUp(adventurer: Signal<Adventurer>, abortSignal: AbortSignal): Promise<Adventurer | undefined> {
    console.log('checking level up');

    if(!this.needLevelUp()){
      return undefined;
    }

    const adventurer = adventurer();

    if(!adventurer){
      return undefined;
    }

    const adventurerLevelUpDto: AdventurerLevelUpDto = {
      adventurer: adventurer,
      levelUpExperience: adventurer.levelUpExperience,
      experience: adventurer.experience
    }
    console.log('fetching level up');

    return this.fetchService.fetch(`${this.apiUrl}/levelup`, 'POST', abortSignal, adventurerLevelUpDto);
  }*/

  private async fetchAdventurerImg(adventurer: Adventurer | undefined, abortSignal: AbortSignal): Promise<any> {
    if(!adventurer){
      return undefined;
    }

    console.log('generating a new adventurer img...');

    return this.fetchService.fetch(`${this.apiUrl}/generate-img`, 'POST', abortSignal, adventurer);
  }
}
