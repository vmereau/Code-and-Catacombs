import {computed, Injectable, Signal} from '@angular/core';
import {Story} from './story.class';
import {StoryService} from './story.service';

@Injectable({
  providedIn: 'root'
})
export class StoryState {

  public story: Signal<Story | undefined> = computed(() => this.storyService.storyResource.value());
  public isStoryLoading: Signal<boolean> = computed(() => this.storyService.storyResource.isLoading());
  public isStoryError: Signal<unknown> = computed(() => this.storyService.storyResource.error());

  public storyImg: Signal<any | undefined> = computed(() => this.storyService.storyImgResource.value());
  public isStoryImgLoading: Signal<boolean> = computed(() => this.storyService.storyImgResource.isLoading());
  public isStoryImgError: Signal<unknown> = computed(() => this.storyService.storyImgResource.error());

  constructor(private storyService: StoryService) { }
}
