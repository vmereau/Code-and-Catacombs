import { ChangeDetectionStrategy, Component, Input, signal, Signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ItemInfosComponent } from '../../../shared/items/item-infos/item-infos.component';
import { Item } from '../../../shared/items/item.class';

@Component({
  selector: 'app-show-inventory',
  imports: [Button, Dialog, ItemInfosComponent],
  templateUrl: './show-inventory.component.html',
  standalone: true,
  styleUrl: './show-inventory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowInventoryComponent {
  @Input() public inventory: Signal<Item[]> = signal([]);
  @Input() public inventoryName = 'Inventory';

  public inventoryVisible = false;

  public toggleInventoryVisibility(): void {
    this.inventoryVisible = !this.inventoryVisible;
  }
}
