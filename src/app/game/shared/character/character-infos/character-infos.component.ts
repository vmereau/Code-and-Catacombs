import { ChangeDetectionStrategy, Component, Input, Signal, signal, WritableSignal } from '@angular/core';
import { Character } from '../character.class';

@Component({
  selector: 'app-character-infos',
  templateUrl: './character-infos.component.html',
  standalone: true,
  styleUrl: './character-infos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterInfosComponent {
  @Input() public character: WritableSignal<Character | undefined> = signal(undefined);
  @Input() public isLoading: Signal<boolean> = signal(false);
  @Input() public isError: Signal<unknown> = signal(false);
}
