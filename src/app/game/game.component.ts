import {ChangeDetectionStrategy, Component, computed, effect, OnInit, ResourceRef, Signal, signal} from '@angular/core';
import {ChooseStoryComponent} from './story/choose-story/choose-story.component';
import {ChooseAdventurerComponent} from './adventurer/choose-adventurer/choose-adventurer.component';
import {GameService} from './game.service';
import {ChooseSkillComponent} from './skill/choose-skill/choose-skill.component';
import {AdventurerInfosComponent} from './adventurer/adventurer-infos/adventurer-infos.component';
import {Choice} from './choice/choice.class';
import {ChoicesComponent} from './choice/choices/choices.component';

export enum GameStep {
  InitStory = 0,
  InitAdventurer = 1,
  InitSkills = 2,
  GameLoop = 3
}

export enum Encouter {
  None = 0,
  Choices = 1
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
  public encounter = signal(Encouter.None);

  protected readonly GameStep = GameStep;
  protected readonly Encouter = Encouter;

  private startGameEffect = effect(() => {
    if(this.step() === GameStep.GameLoop){
      this.encounter.set(Encouter.Choices);
    }
  })

  private encounterEffect = effect(() => {
    if(this.encounter() === Encouter.Choices){
      this.gameService.generateNewChoices(3);
    }
  })

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  setStep(step: GameStep) {
    this.step.set(step);
  }

  public choiceSelected(choice: Choice): void {
    console.log(choice);
  }
}
