import { ChangeDetectionStrategy, Component, EventEmitter, Output, Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Adventurer } from '../adventurer.class';
import { AdventurerService } from '../adventurer.service';

@Component({
  selector: 'app-choose-adventurer',
  imports: [Button, FormsModule, InputText],
  templateUrl: './choose-adventurer.component.html',
  standalone: true,
  styleUrl: './choose-adventurer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseAdventurerComponent {
  public adventurer: WritableSignal<Adventurer | undefined>;
  public isLoading: Signal<boolean>;
  public isError: Signal<unknown>;

  public additionalGenerationInfos: WritableSignal<string | undefined>;

  @Output() adventurerSelected = new EventEmitter<boolean>();

  constructor(private adventurerService: AdventurerService) {
    this.adventurer = this.adventurerService.adventurer;
    this.isLoading = this.adventurerService.isAdventurerLoading;
    this.isError = this.adventurerService.isAdventurerError;

    this.additionalGenerationInfos = this.adventurerService.additionalGenerationInfos;
  }

  public chooseAdventurer() {
    this.adventurerService.setInitialValues();
    this.adventurerSelected.emit(true);
  }

  public loadNewAdventurer() {
    this.adventurerService.loadNewAdventurer();
  }
}
