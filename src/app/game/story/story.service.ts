import { computed, Injectable, resource, signal, Signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GenerateStoryDto, Story } from './story.class';
import {FetchService} from '../shared/fetch.service';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private apiUrl = `${environment.api.baseUrl}/story`;

  public storyResource = resource({
    loader: async ({ request, abortSignal }) => this.fetchStory(abortSignal),
  });

  public storyImgResource = resource({
    request: () => this.storyResource.value(),
    loader: async ({ request, abortSignal }) => this.fetchStoryImg(this.storyResource.value(), abortSignal),
  });

  public premise: WritableSignal<string | undefined> = signal(undefined);

  constructor(private fetchService: FetchService) {}

  public loadNewStory(): void {
    this.storyResource.reload();
  }

  private async fetchStory(abortSignal: AbortSignal): Promise<Story> {
    console.log('generating a new story...');

    const generateStoryDto: GenerateStoryDto = {};
    if (this.premise()) generateStoryDto.premise = this.premise();

    return this.fetchService.fetch(`${this.apiUrl}/generate`, 'POST', abortSignal, generateStoryDto);
  }

  private async fetchStoryImg(story: Story | undefined, abortSignal: AbortSignal): Promise<any> {
    if(!story){
      return undefined;
    }

    console.log('generating a new story img...');

    return this.fetchService.fetch(`${this.apiUrl}/generate-img`, 'POST', abortSignal, story);
  }
}
