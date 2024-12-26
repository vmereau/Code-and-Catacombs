import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ResourceRef} from '@angular/core';
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
export class ChooseAdventurerComponent implements OnInit {
  public adventurer: ResourceRef<Adventurer>;
  @Output() adventurerSelected = new EventEmitter<boolean>();

  constructor(private adventurerService: AdventurerService) {
    this.adventurer = this.adventurerService.adventurerResource;
  }

  ngOnInit() {
    this.adventurer.reload();
  }
}
