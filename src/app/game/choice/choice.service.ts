import { computed, Injectable, resource, ResourceRef, signal, Signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { mockChoices } from '../../../mocks/choices.mock';
import { StoryService } from '../story/story.service';
import { Choice } from './choice.class';
import {FetchService} from '../shared/fetch.service';

@Injectable({
  providedIn: 'root',
})
export class ChoiceService {
  private apiUrl = `${environment.api.baseUrl}/choice`;
  private numberOfChoices: WritableSignal<{ nb: number }> = signal({ nb: 3 });

  public choicesResource: ResourceRef<Choice[] | undefined> = resource({
    request: () => this.numberOfChoices(),
    loader: async ({ request, abortSignal }) => this.fetchChoices(request, abortSignal),
  });

  constructor(private storyService: StoryService,
              private fetchService: FetchService) {}

  public generateNewChoices(nb: number) {
    console.log('nb:', nb);
    this.numberOfChoices.set({ nb: nb });
  }

  // Function to fetch the story
  private async fetchChoices(request: unknown, abortSignal: AbortSignal): Promise<Choice[] | undefined> {
    const story = this.storyService.story();
    if (!story) {
      return undefined;
    }

    console.log('generating new choices...');
    return mockChoices;

   /*const generateChoicesDto: GenerateChoicesDto = {
      story: this.storyService.story(),
      numberOfChoices: this.numberOfChoices().nb
    }

    return this.fetchService.fetch(`${this.apiUrl}/generate`, 'POST', abortSignal, generateChoicesDto);*/
  }
}
