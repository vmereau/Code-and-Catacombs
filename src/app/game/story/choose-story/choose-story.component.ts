import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, output, ResourceRef} from '@angular/core';
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
  public story: ResourceRef<Story>;
  @Output() storySelected = new EventEmitter<boolean>();

  constructor(private storyService: StoryService) {
    this.story = this.storyService.storyResource;
  }
}
