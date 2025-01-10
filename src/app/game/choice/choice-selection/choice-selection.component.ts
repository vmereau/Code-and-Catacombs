import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';
import { Choice } from '../choice.class';

@Component({
  selector: 'app-choice-selection',
  imports: [],
  templateUrl: './choice-selection.component.html',
  standalone: true,
  styleUrl: './choice-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceSelectionComponent {
  public choice = input<Choice | undefined>(undefined);

  @Output() choiceSelected = new EventEmitter<Choice>();
}
