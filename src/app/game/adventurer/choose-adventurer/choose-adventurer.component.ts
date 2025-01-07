import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ResourceRef, Signal,
  WritableSignal
} from '@angular/core';
import {Adventurer} from '../adventurer.class';
import {AdventurerService} from '../adventurer.service';

@Component({
  selector: 'app-choose-adventurer',
  imports: [],
  templateUrl: './choose-adventurer.component.html',
  standalone: true,
  styleUrl: './choose-adventurer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChooseAdventurerComponent {
  public adventurer: WritableSignal<Adventurer | undefined>;
  public isLoading: Signal<boolean>;
  public isError: Signal<unknown>;

  @Output() adventurerSelected = new EventEmitter<boolean>();

  constructor(private adventurerService: AdventurerService) {
    this.adventurer = this.adventurerService.adventurer;
    this.isLoading = this.adventurerService.isAdventurerLoading;
    this.isError = this.adventurerService.isAdventurerError;
  }

  public chooseAdventurer() {
    this.adventurerService.setMaxHealthAndMana();
    this.adventurerSelected.emit(true);
  }

  public loadNewAdventurer() {
    this.adventurerService.loadNewAdventurer();
  }
}
