import {ChangeDetectionStrategy, Component, effect, OnInit, signal} from '@angular/core';
import {ChooseStoryComponent} from './story/choose-story/choose-story.component';
import {ChooseAdventurerComponent} from './adventurer/choose-adventurer/choose-adventurer.component';
import {ChooseSkillComponent} from './skill/choose-skill/choose-skill.component';
import {AdventurerInfosComponent} from './adventurer/adventurer-infos/adventurer-infos.component';
import {Choice, ChoiceTypeEnum} from './choice/choice.class';
import {ChoicesComponent} from './choice/choices/choices.component';
import {ChoiceService} from './choice/choice.service';

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
    AdventurerInfosComponent,
    ChoicesComponent
  ],
  templateUrl: './game.component.html',
  standalone: true,
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  public step = signal(GameStep.InitStory);
  public encounter = signal(ChoiceTypeEnum.None);

  protected readonly GameStep = GameStep;
  protected readonly Encouter = ChoiceTypeEnum;

  constructor(private choiceService: ChoiceService) {
    // startGameEffect
    effect(() => {
      if(this.step() === GameStep.GameLoop){
        this.encounter.set(ChoiceTypeEnum.Choices);
      }
    })

    // encounterEffect
    effect(() => {
      if(this.encounter() === ChoiceTypeEnum.Choices){
        this.choiceService.generateNewChoices(3);
      }
    })
  }

  ngOnInit() {}

  public startGame(): void {
    this.step.set(GameStep.GameLoop);
    this.encounter.set(ChoiceTypeEnum.Choices);
  }

  setStep(step: GameStep) {
    this.step.set(step);
  }

  public choiceSelected(choice: Choice): void {
    // force effect trigger if same choice type
    this.encounter.set(ChoiceTypeEnum.None);
    this.encounter.set(choice.type);
  }
}
