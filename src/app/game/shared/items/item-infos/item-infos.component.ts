import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Item} from '../item.class';

@Component({
  selector: 'app-item-infos',
  imports: [],
  templateUrl: './item-infos.component.html',
  standalone: true,
  styleUrl: './item-infos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemInfosComponent {
  @Input() item: Item | undefined = undefined;
}
