import {computed, Injectable, resource, ResourceRef, signal, Signal, WritableSignal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Choice} from './choice.class';
import {AdventurerService} from '../adventurer/adventurer.service';
import {StoryService} from '../story/story.service';

@Injectable({
  providedIn: 'root'
})
export class ChoiceService {
  private apiUrl = `${environment.api.baseUrl}/choice`;
  private numberOfChoices: WritableSignal<{ nb: number }> = signal({nb: 3});

  private choicesResource : ResourceRef<Choice[] | undefined> = resource({
    request: () => this.numberOfChoices(),
    loader: async ({request, abortSignal}) => this.fetchChoices(request, abortSignal),
  });

  public choices: Signal<Choice[] | undefined> = computed(() => this.choicesResource.value());
  public isChoicesLoading: Signal<boolean> = computed(() => this.choicesResource.isLoading());
  public isChoicesError: Signal<unknown> = computed(() => this.choicesResource.error());

  constructor(private storyService: StoryService) {}

  public generateNewChoices(nb: number) {
    console.log("nb:", nb);
    this.numberOfChoices.set({nb: nb})
  }

  // Function to fetch the story
  private async fetchChoices(request: any, abortSignal: AbortSignal): Promise<Choice[] | undefined> {

    const story = this.storyService.story();
    if(!story) {
      return undefined;
    }

    console.log("generating new choices...");

    const response = await fetch(`${this.apiUrl}/generate`, {
      signal: abortSignal,
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        story: this.storyService.story(),
        numberOfChoices: this.numberOfChoices().nb
      })
    });

    if (!response.ok) throw new Error("Unable to load new choices");
    return response.json();
  }
}
