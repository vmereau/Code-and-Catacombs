import {ChangeDetectionStrategy, Component, EventEmitter, Output, Signal, WritableSignal} from '@angular/core';
import { Story } from '../story.class';
import { StoryService } from '../story.service';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-story',
  imports: [
    InputText,
    FormsModule,
    Button
  ],
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

  @Output() storySelected = new EventEmitter<boolean>();

  constructor(private storyService: StoryService) {
    this.story = this.storyService.story;
    this.isLoading = this.storyService.isStoryLoading;
    this.isError = this.storyService.isStoryError;
    this.premise = this.storyService.premise;
  }

  public loadNewStory() {
    this.storyService.loadNewStory();
  }
}
