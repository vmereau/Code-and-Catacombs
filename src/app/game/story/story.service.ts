import { computed, Injectable, resource, Signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Story } from './story.class';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private apiUrl = `${environment.api.baseUrl}/story`;

  private storyResource = resource({
    loader: async ({ request, abortSignal }) => this.fetchStory(request, abortSignal),
  });

  public story: Signal<Story | undefined> = computed(() => this.storyResource.value());
  public isStoryLoading: Signal<boolean> = computed(() => this.storyResource.isLoading());
  public isStoryError: Signal<unknown> = computed(() => this.storyResource.error());

  public loadNewStory() {
    this.storyResource.reload();
  }

  // Function to fetch the story
  private async fetchStory(request: unknown, abortSignal: AbortSignal): Promise<Story> {
    console.log('generating a new story...');

    const response = await fetch(`${this.apiUrl}/generate`, {
      signal: abortSignal,
      method: 'POST',
    });

    if (!response.ok) throw new Error('Unable to load new story');
    return response.json();
  }
}
