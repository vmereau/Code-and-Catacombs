import {Injectable, resource, ResourceRef, signal, WritableSignal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Adventurer} from './adventurer.class';

@Injectable({
  providedIn: 'root'
})
export class AdventurerService {
  private apiUrl = `${environment.api.baseUrl}/adventurer`;

  public adventurer : ResourceRef<Adventurer> = resource({
    loader: async ({request, abortSignal}) => this.fetchAdventurer(request, abortSignal),
  });

  constructor() {}

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
