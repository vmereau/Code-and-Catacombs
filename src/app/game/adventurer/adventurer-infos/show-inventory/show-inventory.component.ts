import {ChangeDetectionStrategy, Component, Input, signal, Signal} from '@angular/core';
import {Item} from '../../../shared/items/item.class';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-show-inventory',
  imports: [
    Button,
    Dialog
  ],
  templateUrl: './show-inventory.component.html',
  standalone: true,
  styleUrl: './show-inventory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowInventoryComponent {
  @Input() public inventory: Signal<Item[]> = signal([]);
  @Input() public inventoryName: string = "Inventory";

  public inventoryVisible: boolean = false;

  public toggleInventoryVisibility(): void {
    this.inventoryVisible = !this.inventoryVisible;
  }
}
