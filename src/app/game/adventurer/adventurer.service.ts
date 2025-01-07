import {computed, Injectable, linkedSignal, resource, ResourceRef, Signal, signal, WritableSignal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Adventurer} from './adventurer.class';

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

  constructor() {}

  public loadNewAdventurer() {
    this.adventurerResource.reload();
  }

  public setMaxHealthAndMana() {
    this.adventurer.update((adventurer) => {
      if(!adventurer) return undefined;

      return { ...adventurer, currentMana: adventurer.mana, currentHealth: adventurer.health};
    });
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
