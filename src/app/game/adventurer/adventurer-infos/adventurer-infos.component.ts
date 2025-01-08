import {
  ChangeDetectionStrategy,
  Component, signal, Signal,
  WritableSignal
} from '@angular/core';
import {Adventurer} from '../adventurer.class';
import {AdventurerService} from '../adventurer.service';
import {Item} from '../../shared/items/item.class';
import {Dialog} from 'primeng/dialog';
import {Button} from 'primeng/button';
import {ShowInventoryComponent} from './show-inventory/show-inventory.component';

@Component({
  selector: 'app-adventurer-infos',
  imports: [
    ShowInventoryComponent
  ],
  templateUrl: './adventurer-infos.component.html',
  standalone: true,
  styleUrl: './adventurer-infos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdventurerInfosComponent {
  public adventurer: WritableSignal<Adventurer | undefined>;
  public equipment: Signal<Item[]>;
  public consumables: Signal<Item[]>;

  constructor(private adventurerService: AdventurerService) {
    this.adventurer = this.adventurerService.adventurer;
    this.equipment = this.adventurerService.equipment;
    this.consumables = this.adventurerService.consumables;
  }
}
