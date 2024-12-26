import {Injectable, resource} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Story} from './story.class';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private apiUrl = `${environment.api.baseUrl}/story`;

  public storyResource = resource({
    request: () => null,
    loader: async ({request, abortSignal}) => this.fetchStory(request, abortSignal),
  });

  constructor() { }

  // Function to fetch the story
  private async fetchStory(request: any, abortSignal: AbortSignal): Promise<Story> {

    console.log("generating a new story...");

    const response = await fetch(`${this.apiUrl}/generate`, {
      signal: abortSignal,
      method: "POST"
    });

    if (!response.ok) throw new Error("Unable to load new story");
    return response.json();
  }
}
