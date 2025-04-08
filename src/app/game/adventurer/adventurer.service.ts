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

@Injectable({
  providedIn: 'root',
})
export class AdventurerService {
  private apiUrl = `${environment.api.baseUrl}/adventurer`;

  private adventurerResource: ResourceRef<Adventurer | undefined> = resource({
    loader: async ({ request, abortSignal }) => this.fetchAdventurer(request, abortSignal),
  });

  private levelUpResource: ResourceRef<Adventurer | undefined> = resource({
    request: () => this.needLevelUp(),
    loader: async ({ request, abortSignal }) => this.fetchLevelUp(request, abortSignal),
  })

  public adventurer = linkedSignal(() => this.adventurerResource.value());
  public isAdventurerLoading: Signal<boolean> = computed(() => this.adventurerResource.isLoading());
  public isAdventurerError: Signal<unknown> = computed(() => this.adventurerResource.error());

  private inventory: WritableSignal<Item[]> = signal([]);

  public equipment: Signal<Item[]> = computed(() => {
    return this.inventory().filter((item) => item.type === ItemTypeEnum.equipment);
  });
  public consumables: Signal<Item[]> = computed(() => {
    return this.inventory().filter((item) => item.type === ItemTypeEnum.consumable);
  });

  public additionalGenerationInfos: WritableSignal<string | undefined> = signal(undefined);

  public needLevelUp: Signal<boolean> = computed(() => {
    const experience  = this.adventurer()?.experience || 0;
    const levelUpThreshold = this.adventurer()?.levelUpExperience || 1;

    return experience / levelUpThreshold >= 1;
  })

  constructor() {
    const applyLevelUpEffect = effect(() => {
      const leveledUpAdventurer = this.levelUpResource.value();

      if(leveledUpAdventurer) {
        console.log("applying level up");
        this.adventurer.set(leveledUpAdventurer);
      }
    })
  }


  public loadNewAdventurer() {
    this.adventurerResource.reload();
  }

  public setInitialValues(): void {
    this.adventurer.update((adventurer) => {
      if (!adventurer) return undefined;

      return new Adventurer(
        adventurer.name,
        adventurer.level,
        adventurer.description,
        adventurer.health,
        adventurer.attack,
        adventurer.mana,
        adventurer.defense,
        adventurer.archetype,
      );
    });
  }

  public updateStat(
    property: CharacterUpdatableNumberProperties | AdventurerUpdatableNumberProperties,
    value: number,
  ) {
    this.adventurer.update((adventurer) => {
      if (!adventurer) return undefined;

      adventurer[property] += value;

      return { ...adventurer };
    });
  }

  public addToInventory(item: Item): void {
    if (item.type === ItemTypeEnum.equipment) {
      item.effects.forEach((effect) => {
        this.updateStat(effect.targetProperty, effect.value);
      });
    }

    this.inventory.update((inventory) => {
      return [...inventory, item];
    });
  }

  public withdrawGold(amount: number): void {
    if (amount < 0) {
      throw new Error('Amount must be positive or 0');
    }

    this.updateStat(AdventurerUpdatableNumberProperties.gold, -amount);
  }

  public addGold(amount: number): void {
    if (amount < 0) {
      throw new Error('Amount must be positive or 0');
    }

    this.updateStat(AdventurerUpdatableNumberProperties.gold, amount);
  }

  public giveExperience(amount: number): void {
    if (amount < 0) {
      throw new Error('Amount must be positive or 0');
    }

    this.updateStat(AdventurerUpdatableNumberProperties.experience, amount);
  }

  public removeItemFromInventory(item: Item): void {
    this.inventory.update((inventory) => {
      const usedItemIndex = inventory.findIndex((inventoryItem) => inventoryItem.name === item.name);

      console.log(usedItemIndex);
      if (usedItemIndex > -1) {
        inventory.splice(usedItemIndex, 1);
      }

      return [...inventory];
    });
  }

  private async fetchAdventurer(request: unknown, abortSignal: AbortSignal): Promise<Adventurer> {
    console.log('generating a new Adventurer...');

    const generateAdventurerDto: GenerateAdventurerDto = {};

    if (this.additionalGenerationInfos()) {
      generateAdventurerDto.additionalGenerationInfos = this.additionalGenerationInfos();
    }

    const response = await fetch(`${this.apiUrl}/generate`, {
      signal: abortSignal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(generateAdventurerDto),
    });

    if (!response.ok) throw new Error('Unable to load new adventurer');
    return response.json();
  }

  private async fetchLevelUp(request: unknown, abortSignal: AbortSignal): Promise<Adventurer | undefined> {
    console.log('checking level up');

    if(!this.needLevelUp()){
      return undefined;
    }

    const adventurer = this.adventurer();

    if(!adventurer){
      return undefined;
    }

    const adventurerLevelUpDto: AdventurerLevelUpDto = {
      adventurer: adventurer,
      levelUpExperience: adventurer.levelUpExperience,
      experience: adventurer.experience
    }


    console.log('fetching level up');
    const response = await fetch(`${this.apiUrl}/levelup`, {
      signal: abortSignal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adventurerLevelUpDto),
    });

    if (!response.ok) throw new Error('Unable to load new adventurer');
    return response.json();
  }
}
