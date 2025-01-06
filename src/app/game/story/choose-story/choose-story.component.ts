import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  output,
  ResourceRef,
  Signal
} from '@angular/core';
import {Story} from '../story.class';
import {StoryService} from '../story.service';

@Component({
  selector: 'app-story',
  imports: [],
  templateUrl: './choose-story.component.html',
  standalone: true,
  styleUrl: './choose-story.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChooseStoryComponent {
  public story: Signal<Story | undefined>;
  public isLoading: Signal<boolean>;
  public isError: Signal<unknown>;

  @Output() storySelected = new EventEmitter<boolean>();

  constructor(private storyService: StoryService) {
    this.story = this.storyService.story;
    this.isLoading = this.storyService.isStoryLoading;
    this.isError = this.storyService.isStoryError;
  }

  public loadNewStory() {
    this.storyService.loadNewStory();
  }
}
