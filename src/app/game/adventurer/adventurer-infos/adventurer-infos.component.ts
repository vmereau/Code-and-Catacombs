import { ChangeDetectionStrategy, Component, Signal, WritableSignal } from '@angular/core';
import { Item } from '../../shared/items/item.class';
import { Adventurer } from '../adventurer.class';
import { ShowInventoryComponent } from './show-inventory/show-inventory.component';
import {AdventurerState} from '../adventurer-state.service';

@Component({
  selector: 'app-adventurer-infos',
  imports: [ShowInventoryComponent],
  templateUrl: './adventurer-infos.component.html',
  standalone: true,
  styleUrl: './adventurer-infos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdventurerInfosComponent {
  public adventurer: WritableSignal<Adventurer | undefined>;
  public equipment: Signal<Item[]>;
  public consumables: Signal<Item[]>;

  constructor(private adventurerState: AdventurerState) {
    this.adventurer = this.adventurerState.adventurer;
    this.equipment = this.adventurerState.equipment;
    this.consumables = this.adventurerState.consumables;
  }
}
