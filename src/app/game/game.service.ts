import {Injectable, ResourceRef, Signal} from '@angular/core';
import {AdventurerService} from './adventurer/adventurer.service';
import {StoryService} from './story/story.service';
import {SkillService} from './skill/skill.service';
import {ChoiceService} from './choice/choice.service';
import {Choice} from './choice/choice.class';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private adventurerService: AdventurerService,
              private storyService: StoryService,
              private skillService: SkillService,
              private choiceService: ChoiceService) {
  }

  public generateNewChoices(nb: number) {
    this.choiceService.generateNewChoices(nb);
  }
}
