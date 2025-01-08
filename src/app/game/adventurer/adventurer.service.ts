import {computed, Injectable, linkedSignal, resource, ResourceRef, Signal, signal, WritableSignal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Adventurer} from './adventurer.class';
import {Item, ItemTypeEnum} from '../shared/items/item.class';
import {CharacterUpdatableNumberProperties} from '../shared/character/character.class';

@Injectable({
  providedIn: 'root'
})
export class AdventurerService {
  private apiUrl = `${environment.api.baseUrl}/adventurer`;

  private adventurerResource : ResourceRef<Adventurer> = resource({
    loader: async ({request, abortSignal}) => this.fetchAdventurer(request, abortSignal),
  });

  public adventurer = linkedSignal(() => this.adventurerResource.value());
  public isAdventurerLoading: Signal<boolean> = computed(() => this.adventurerResource.isLoading());
  public isAdventurerError: Signal<unknown> = computed(() => this.adventurerResource.error());

  private inventory: WritableSignal<Item[]> = signal([]);

  public equipment: Signal<Item[]>= computed(() => {
    return this.inventory().filter(item => item.type === ItemTypeEnum.equipment);
  })
  public consumables: Signal<Item[]> = computed(() => {
    return this.inventory().filter(item => item.type === ItemTypeEnum.consumable);
  })

  constructor() {}

  public loadNewAdventurer() {
    this.adventurerResource.reload();
  }

  public setInitialValues(): void {
    this.adventurer.update((adventurer) => {
      if(!adventurer) return undefined;

      return { ...adventurer, currentMana: adventurer.mana, currentHealth: adventurer.health, gold: 100};
    });
  }

  public updateStats(property: CharacterUpdatableNumberProperties, value: number) {
    this.adventurer.update(adventurer => {
      if(!adventurer) return undefined;

      adventurer[property] += value;

      return {...adventurer};
    })
  }

  public addToInventory(item: Item): void {

    if(item.type === ItemTypeEnum.equipment) {
      item.effects.forEach(effect => {
        this.updateStats(effect.targetProperty, effect.value);
      })
    }

    this.inventory.update(inventory => {
      return [...inventory, item];
    })
  }

  public withdrawGold(amount: number): void {
    if(amount < 0){
      throw new Error("Amount must be positive");
    }

    this.adventurer.update(adventurer => {
      if(!adventurer) throw new Error("Adventurer undefined");

      if(!adventurer.gold){
        adventurer.gold = 0;
      }

      return { ...adventurer, gold: adventurer.gold - amount }
    })
  }

  public addGold(amount: number): void {
    if(amount < 0){
      throw new Error("Amount must be positive");
    }

    this.adventurer.update(adventurer => {
      if(!adventurer) throw new Error("Adventurer undefined");

      if(!adventurer.gold){
        adventurer.gold = 0;
      }

      return { ...adventurer, gold: adventurer.gold + amount }
    })
  }

  private async fetchAdventurer(request: any, abortSignal: AbortSignal): Promise<Adventurer> {

    console.log("generating a new Adventurer...");

    const response = await fetch(`${this.apiUrl}/generate`, {
      signal: abortSignal,
      method: "POST"
    });

    if (!response.ok) throw new Error("Unable to load new adventurer");
    return response.json();
  }
}
