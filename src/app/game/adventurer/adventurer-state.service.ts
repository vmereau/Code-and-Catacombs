import {computed, effect, Injectable, linkedSignal, signal, Signal, WritableSignal} from '@angular/core';
import {AdventurerService} from './adventurer.service';
import {Item, ItemTypeEnum} from '../shared/items/item.class';
import {FetchService} from '../shared/fetch.service';
import {Adventurer, AdventurerUpdatableNumberProperties} from './adventurer.class';
import {CharacterUpdatableNumberProperties} from '../shared/character/character.class';

@Injectable({
  providedIn: 'root'
})
export class AdventurerState {

  public adventurer = linkedSignal(() => this.adventurerService.adventurerResource.value());
  public isAdventurerLoading: Signal<boolean> = computed(() => this.adventurerService.adventurerResource.isLoading());
  public isAdventurerError: Signal<unknown> = computed(() => this.adventurerService.adventurerResource.error());

  public adventurerImg: Signal<any | undefined> = computed(() => this.adventurerService.adventurerImgResource.value());
  public isAdventurerImgLoading: Signal<boolean> = computed(() => this.adventurerService.adventurerImgResource.isLoading());
  public isAdventurerImgError: Signal<unknown> = computed(() => this.adventurerService.adventurerImgResource.error());

  private inventory: WritableSignal<Item[]> = signal([]);

  public equipment: Signal<Item[]> = computed(() => {
    return this.inventory().filter((item) => item.type === ItemTypeEnum.equipment);
  });
  public consumables: Signal<Item[]> = computed(() => {
    return this.inventory().filter((item) => item.type === ItemTypeEnum.consumable);
  });

  public needLevelUp: Signal<boolean> = computed(() => {
    const experience  = this.adventurer()?.experience || 0;
    const levelUpThreshold = this.adventurer()?.levelUpExperience || 1;

    return experience / levelUpThreshold >= 1;
  })

  constructor(private adventurerService: AdventurerService) {
    /*const applyLevelUpEffect = effect(() => {
      const leveledUpAdventurer = this.adventurerService.levelUpResource.value();

      if(leveledUpAdventurer) {
        console.log("applying level up");
        this.adventurer.set(leveledUpAdventurer);
      }
    })*/
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
}
