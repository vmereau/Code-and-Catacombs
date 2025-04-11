import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Output,
  Signal,
  WritableSignal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Story } from '../story.class';
import { StoryService } from '../story.service';
import {NgOptimizedImage} from '@angular/common';
import {ImageComponent} from '../../shared/image/image.component';
import {LoaderComponent} from '../../shared/loader/loader.component';
import {StoryState} from '../story-state.service';

@Component({
  selector: 'app-story',
  imports: [InputText, FormsModule, Button, ImageComponent, LoaderComponent],
  templateUrl: './choose-story.component.html',
  standalone: true,
  styleUrl: './choose-story.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseStoryComponent {
  public story: Signal<Story | undefined>;
  public isLoading: Signal<boolean>;
  public isError: Signal<unknown>;

  public premise: WritableSignal<string | undefined>;

  public storyImg: Signal<any | undefined>;
  public isStoryImgLoading: Signal<boolean>;
  public isStoryImgError: Signal<unknown>;

  @Output() storySelected = new EventEmitter<boolean>();

  constructor(private storyState: StoryState,
              private storyService: StoryService) {
    this.story = this.storyState.story;
    this.isLoading = this.storyState.isStoryLoading;
    this.isError = this.storyState.isStoryError;
    this.premise = this.storyService.premise;

    this.storyImg = this.storyState.storyImg;
    this.isStoryImgLoading = this.storyState.isStoryImgLoading;
    this.isStoryImgError = this.storyState.isStoryImgError;
  }

  public loadNewStory() {
    this.storyService.loadNewStory();
  }
}
