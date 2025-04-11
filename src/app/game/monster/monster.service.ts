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

  private monstersResource: ResourceRef<Monster[] | undefined> = resource({
    loader: async ({ request, abortSignal }) => this.fetchMonsters(request, abortSignal),
  });

  public monster = linkedSignal(() => {
    const monsters: Monster[] | undefined = this.monstersResource.value();

    if (!monsters || monsters.length === 0) {
      return undefined;
    }

    const monster = monsters[0];
    if (!monster) {
      return undefined;
    }

    return new Monster(
      monster.name,
      monster.level,
      monster.description,
      monster.health,
      monster.attack,
      monster.mana,
      monster.defense,
      monster.experienceGiven,
      monster.goldGiven,
    );
  });

  public isMonsterLoading: Signal<boolean> = computed(() => this.monstersResource.isLoading());
  public isMonsterError: Signal<unknown> = computed(() => this.monstersResource.error());

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

  public updateStats(property: CharacterUpdatableNumberProperties, value: number) {
    this.monster.update((monster: Monster | undefined) => {
      if (!monster) return undefined;

      monster[property] += value;

      return { ...monster };
    });
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
