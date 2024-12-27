import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import {ChooseStoryComponent} from './story/choose-story/choose-story.component';
import {ChooseAdventurerComponent} from './adventurer/choose-adventurer/choose-adventurer.component';
import {GameService} from './game.service';
import {ChooseSkillComponent} from './skill/choose-skill/choose-skill.component';
import {AdventurerInfosComponent} from './adventurer/adventurer-infos/adventurer-infos.component';

export enum GameStep {
  InitStory = 0,
  InitAdventurer = 1,
  InitSkills = 2,
  GameLoop = 3
}

@Component({
  selector: 'app-game',
  imports: [
    ChooseStoryComponent,
    ChooseAdventurerComponent,
    ChooseSkillComponent,
    AdventurerInfosComponent
  ],
  templateUrl: './game.component.html',
  standalone: true,
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  public step = signal(GameStep.InitStory);
  // public step = signal(GameStep.GameLoop);
  protected readonly GameStep = GameStep;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  setStep(step: GameStep) {
    this.step.set(step);
  }
}
