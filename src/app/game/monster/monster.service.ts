import { computed, Injectable, linkedSignal, resource, ResourceRef, Signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CharacterUpdatableNumberProperties } from '../shared/character/character.class';
import { StoryService } from '../story/story.service';
import { GenerateMonstersDto, Monster } from './monster.class';
import {FetchService} from '../shared/fetch.service';
import {AdventurerState} from '../adventurer/adventurer-state.service';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  private apiUrl = `${environment.api.baseUrl}/monsters`;

  public monstersResource: ResourceRef<Monster[] | undefined> = resource({
    loader: async ({ request, abortSignal }) => this.fetchMonsters(request, abortSignal),
  });

  constructor(
    private storyService: StoryService,
    private adventurerState: AdventurerState,
    private fetchService: FetchService
  ) {}

  public generateNewMonster() {
    this.monstersResource.reload();
  }

  public removeMonster(): void {
    this.monstersResource.set(undefined);
  }

  private async fetchMonsters(request: unknown, abortSignal: AbortSignal): Promise<Monster[] | undefined> {
    const story = this.storyService.story();
    if (!story) {
      return undefined;
    }

    const adventurer = this.adventurerState.adventurer();
    if (!adventurer) {
      return undefined;
    }

    const generateMonsterDto: GenerateMonstersDto = {
      level: adventurer.level,
      biome: story.biome,
      number: 1,
      withPictures: false,
    };

    return this.fetchService.fetch(`${this.apiUrl}/generate`, 'POST', abortSignal, generateMonsterDto);
  }
}
