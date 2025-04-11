import { ChangeDetectionStrategy, Component, effect, Signal, signal, WritableSignal } from '@angular/core';
import { AdventurerInfosComponent } from './adventurer/adventurer-infos/adventurer-infos.component';
import { ChooseAdventurerComponent } from './adventurer/choose-adventurer/choose-adventurer.component';
import { Choice, ChoiceTypeEnum } from './choice/choice.class';
import { ChoiceService } from './choice/choice.service';
import { ChoicesComponent } from './choice/choices/choices.component';
import { FightComponent } from './fight/fight.component';
import { MonsterService } from './monster/monster.service';
import { CharacterInfosComponent } from './shared/character/character-infos/character-infos.component';
import { Character } from './shared/character/character.class';
import { ShopComponent } from './shop/shop.component';
import { ShopService } from './shop/shop.service';
import { ChooseSkillComponent } from './skill/choose-skill/choose-skill.component';
import { ChooseStoryComponent } from './story/choose-story/choose-story.component';
import {MonsterState} from './monster/monster-state.service';

export enum GameStep {
  InitStory = 0,
  InitAdventurer = 1,
  InitSkills = 2,
  GameLoop = 3,
}

@Component({
  selector: 'app-game',
  imports: [
    ChooseStoryComponent,
    ChooseAdventurerComponent,
    ChooseSkillComponent,
    AdventurerInfosComponent,
    ChoicesComponent,
    ShopComponent,
    FightComponent,
    CharacterInfosComponent,
  ],
  templateUrl: './game.component.html',
  standalone: true,
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  public step = signal(GameStep.InitStory);
  public encounter = signal(ChoiceTypeEnum.None);

  public encounterCharacter: WritableSignal<Character | undefined> = signal(undefined);
  public encounterCharacterLoading: Signal<boolean> = signal(false);
  public encounterCharacterError: Signal<unknown> = signal(undefined);
  public showEncounterStats: WritableSignal<boolean> = signal(true);

  protected readonly GameStep = GameStep;
  protected readonly Encouter = ChoiceTypeEnum;

  constructor(
    private choiceService: ChoiceService,
    private shopService: ShopService,
    private monsterState: MonsterState,
    private monsterService: MonsterService
  ) {
    // startGameEffect
    effect(() => {
      if (this.step() === GameStep.GameLoop) {
        this.encounter.set(ChoiceTypeEnum.Choices);
      }
    });

    // encounterEffect
    effect(() => {
      switch (this.encounter()) {
        case ChoiceTypeEnum.Choices:
          console.log('selected choices');
          this.choiceService.generateNewChoices(3);
          this.resetEncounter();
          break;

        case ChoiceTypeEnum.Elite_fight:
          console.log('selected Elite fight');
          break;

        case ChoiceTypeEnum.Fight:
          console.log('selected Fight');
          this.monsterService.generateNewMonster();
          this.setEncounter(
            this.monsterState.monster,
            this.monsterState.isMonsterLoading,
            this.monsterState.isMonsterError,
          );
          break;

        case ChoiceTypeEnum.Shop:
          console.log('selected Shop');
          this.shopService.generateNewShop();
          this.setEncounter(
            this.shopService.shopKeeper,
            this.shopService.isShopLoading,
            this.shopService.isShopError,
            false,
          );
          break;

        case ChoiceTypeEnum.Power:
          console.log('selected Power');
          break;

        case ChoiceTypeEnum.Treasure:
          console.log('selected Treasure');
          break;

        default:
          console.log('reset / none');
          break;
      }
    });
  }

  public startGame(): void {
    this.step.set(GameStep.GameLoop);
    this.goToChoices();
  }

  public goToChoices(): void {
    this.encounter.set(ChoiceTypeEnum.Choices);
  }

  public setStep(step: GameStep) {
    this.step.set(step);
  }

  public choiceSelected(choice: Choice): void {
    // force effect trigger if same choice type
    this.encounter.set(ChoiceTypeEnum.None);

    this.encounter.set(choice.type);
  }

  private setEncounter(
    encounter: WritableSignal<Character | undefined>,
    encounterCharacterLoading: Signal<boolean>,
    encounterCharacterError: Signal<unknown>,
    showStats = true,
  ): void {
    this.encounterCharacter = encounter;
    this.encounterCharacterLoading = encounterCharacterLoading;
    this.encounterCharacterError = encounterCharacterError;
    this.showEncounterStats.set(showStats);
  }

  private resetEncounter(): void {
    this.encounterCharacter = signal(undefined);
    this.encounterCharacterLoading = signal(false);
    this.encounterCharacterError = signal(undefined);
    this.showEncounterStats.set(true);
  }
}
