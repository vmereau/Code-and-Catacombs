import {Injectable} from '@angular/core';
import {AdventurerService} from './adventurer/adventurer.service';
import {StoryService} from './story/story.service';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private adventurerService: AdventurerService,
              private storyService: StoryService) { }
}
