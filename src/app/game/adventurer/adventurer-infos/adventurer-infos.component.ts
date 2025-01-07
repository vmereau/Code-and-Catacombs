import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ResourceRef,
  WritableSignal
} from '@angular/core';
import {Adventurer} from '../adventurer.class';
import {AdventurerService} from '../adventurer.service';

@Component({
  selector: 'app-adventurer-infos',
  imports: [],
  templateUrl: './adventurer-infos.component.html',
  standalone: true,
  styleUrl: './adventurer-infos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdventurerInfosComponent {
  public adventurer: WritableSignal<Adventurer | undefined>;

  constructor(private adventurerService: AdventurerService) {
    this.adventurer = this.adventurerService.adventurer;
  }
}
