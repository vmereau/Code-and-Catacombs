import {
  computed,
  Injectable,
  linkedSignal,
  resource,
  ResourceRef,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import { CharacterUpdatableNumberProperties } from '../shared/character/character.class';
import { Item, ItemTypeEnum } from '../shared/items/item.class';
import { Adventurer, AdventurerUpdatableNumberProperties, GenerateAdventurerDto } from './adventurer.class';

@Injectable({
  providedIn: 'root',
})
export class AdventurerService {
  private apiUrl = `${environment.api.baseUrl}/adventurer`;

  private adventurerResource: ResourceRef<Adventurer | undefined> = resource({
    loader: async ({ request, abortSignal }) => this.fetchAdventurer(request, abortSignal),
  });

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

  public updateStats(
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
        this.updateStats(effect.targetProperty, effect.value);
      });
    }

    this.inventory.update((inventory) => {
      return [...inventory, item];
    });
  }

  public withdrawGold(amount: number): void {
    if (amount < 0) {
      throw new Error('Amount must be positive');
    }

    this.adventurer.update((adventurer) => {
      if (!adventurer) throw new Error('Adventurer undefined');

      if (!adventurer.gold) {
        adventurer.gold = 0;
      }

      return { ...adventurer, gold: adventurer.gold - amount };
    });
  }

  public addGold(amount: number): void {
    if (amount < 0) {
      throw new Error('Amount must be positive');
    }

    this.adventurer.update((adventurer) => {
      if (!adventurer) throw new Error('Adventurer undefined');

      if (!adventurer.gold) {
        adventurer.gold = 0;
      }

      return { ...adventurer, gold: adventurer.gold + amount };
    });
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

    if (this.additionalGenerationInfos())
      generateAdventurerDto.additionalGenerationInfos = this.additionalGenerationInfos();

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
}
