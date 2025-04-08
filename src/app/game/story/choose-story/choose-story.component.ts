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

@Component({
  selector: 'app-story',
  imports: [InputText, FormsModule, Button, NgOptimizedImage],
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

  @Output() storySelected = new EventEmitter<boolean>();

  constructor(private storyService: StoryService) {
    this.story = this.storyService.story;
    this.isLoading = this.storyService.isStoryLoading;
    this.isError = this.storyService.isStoryError;
    this.premise = this.storyService.premise;

    this.storyImg = this.storyService.storyImg;
    this.isStoryImgLoading = this.storyService.isStoryImgLoading;
  }

  public loadNewStory() {
    this.storyService.loadNewStory();
  }
}
