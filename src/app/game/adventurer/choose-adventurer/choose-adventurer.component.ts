import { ChangeDetectionStrategy, Component, EventEmitter, Output, Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Adventurer } from '../adventurer.class';
import { AdventurerService } from '../adventurer.service';
import {ImageComponent} from '../../shared/image/image.component';
import {NgTemplateOutlet} from '@angular/common';
import {LoaderComponent} from '../../shared/loader/loader.component';
import {AdventurerState} from '../adventurer-state.service';

@Component({
  selector: 'app-choose-adventurer',
  imports: [Button, FormsModule, InputText, ImageComponent, NgTemplateOutlet, LoaderComponent],
  templateUrl: './choose-adventurer.component.html',
  standalone: true,
  styleUrl: './choose-adventurer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseAdventurerComponent {
  public adventurer: WritableSignal<Adventurer | undefined>;
  public isLoading: Signal<boolean>;
  public isError: Signal<unknown>;

  public adventurerImg: Signal<any | undefined>;
  public isAdventurerImgLoading: Signal<boolean>;
  public isAdventurerImgError: Signal<unknown>;

  public additionalGenerationInfos: WritableSignal<string | undefined>;

  @Output() adventurerSelected = new EventEmitter<boolean>();

  constructor(private adventurerState: AdventurerState,
              private adventurerService: AdventurerService) {
    this.adventurer = this.adventurerState.adventurer;
    this.isLoading = this.adventurerState.isAdventurerLoading;
    this.isError = this.adventurerState.isAdventurerError;

    this.adventurerImg = this.adventurerState.adventurerImg;
    this.isAdventurerImgLoading = this.adventurerState.isAdventurerImgLoading;
    this.isAdventurerImgError = this.adventurerState.isAdventurerImgError;

    this.additionalGenerationInfos = this.adventurerService.additionalGenerationInfos;
  }

  public chooseAdventurer() {
    this.adventurerState.setInitialValues();
    this.adventurerSelected.emit(true);
  }

  public loadNewAdventurer() {
    this.adventurerService.loadNewAdventurer();
  }
}
