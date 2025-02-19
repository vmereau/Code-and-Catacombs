import { computed, Injectable, resource, signal, Signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GenerateStoryDto, Story } from './story.class';

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

  public premise: WritableSignal<string | undefined> = signal(undefined);

  public loadNewStory(): void {
    this.storyResource.reload();
  }

  // Function to fetch the story
  private async fetchStory(request: unknown, abortSignal: AbortSignal): Promise<Story> {
    console.log('generating a new story...');

    const generateStoryDto: GenerateStoryDto = {};
    if (this.premise()) generateStoryDto.premise = this.premise();

    const response = await fetch(`${this.apiUrl}/generate`, {
      signal: abortSignal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(generateStoryDto),
    });

    if (!response.ok) throw new Error('Unable to load new story');
    return response.json();
  }
}
