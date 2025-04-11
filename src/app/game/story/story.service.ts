import { computed, Injectable, resource, signal, Signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GenerateStoryDto, Story } from './story.class';
import {FetchService} from '../shared/fetch.service';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private apiUrl = `${environment.api.baseUrl}/story`;

  private storyResource = resource({
    loader: async ({ request, abortSignal }) => this.fetchStory(request, abortSignal),
  });

  private storyImgResource = resource({
    request: () => this.story(),
    loader: async ({ request, abortSignal }) => this.fetchStoryImg(request, abortSignal),
  });

  public story: Signal<Story | undefined> = computed(() => this.storyResource.value());
  public isStoryLoading: Signal<boolean> = computed(() => this.storyResource.isLoading());
  public isStoryError: Signal<unknown> = computed(() => this.storyResource.error());

  public storyImg: Signal<any | undefined> = computed(() => this.storyImgResource.value());
  public isStoryImgLoading: Signal<boolean> = computed(() => this.storyImgResource.isLoading());
  public isStoryImgError: Signal<unknown> = computed(() => this.storyImgResource.error());

  public premise: WritableSignal<string | undefined> = signal(undefined);

  constructor(private fetchService: FetchService) {}

  public loadNewStory(): void {
    this.storyResource.reload();
  }

  private async fetchStory(request: unknown, abortSignal: AbortSignal): Promise<Story> {
    console.log('generating a new story...');

    const generateStoryDto: GenerateStoryDto = {};
    if (this.premise()) generateStoryDto.premise = this.premise();

    return this.fetchService.fetch(`${this.apiUrl}/generate`, 'POST', abortSignal, generateStoryDto);
  }

  private async fetchStoryImg(request: unknown, abortSignal: AbortSignal): Promise<any> {
    if(!this.story()){
      return undefined;
    }

    console.log('generating a new story img...');

    return this.fetchService.fetch(`${this.apiUrl}/generate-img`, 'POST', abortSignal, this.story());
  }
}
