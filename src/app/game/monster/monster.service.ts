import { computed, Injectable, linkedSignal, resource, ResourceRef, Signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { mockMonster } from '../../../mocks/monster.mock';
import { AdventurerService } from '../adventurer/adventurer.service';
import { CharacterUpdatableNumberProperties } from '../shared/character/character.class';
import { StoryService } from '../story/story.service';
import { Monster } from './monster.class';

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
    );
  });

  public isMonsterLoading: Signal<boolean> = computed(() => this.monstersResource.isLoading());
  public isMonsterError: Signal<unknown> = computed(() => this.monstersResource.error());

  constructor(
    private storyService: StoryService,
    private adventurerService: AdventurerService,
  ) {}

  public generateNewMonster() {
    this.monstersResource.reload();
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

    const adventurer = this.adventurerService.adventurer();
    if (!adventurer) {
      return undefined;
    }

    console.log('generating a new Monster...');
    return mockMonster;

    /*const generateMonsterDto: GenerateMonstersDto = {
      level: adventurer.level,
      biome: story.biome,
      number: 1,
      withPictures: false,
    };

    const response = await fetch(`${this.apiUrl}/generate`, {
      signal: abortSignal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(generateMonsterDto),
    });

    if (!response.ok) throw new Error('Unable to load new monster');
    return response.json();*/
  }
}
