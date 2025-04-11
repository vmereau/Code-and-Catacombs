import { ChangeDetectionStrategy, Component, EventEmitter, Output, Signal } from '@angular/core';
import { ChoiceSelectionComponent } from '../choice-selection/choice-selection.component';
import { Choice } from '../choice.class';
import {ChoiceState} from '../choice-state.service';

@Component({
  selector: 'app-choices',
  imports: [ChoiceSelectionComponent],
  templateUrl: './choices.component.html',
  styleUrl: './choices.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoicesComponent {
  public choices: Signal<Choice[] | undefined>;
  public isLoading: Signal<boolean>;
  public isError: Signal<unknown>;

  @Output() choiceSelected = new EventEmitter<Choice>();

  constructor(private choiceState: ChoiceState) {
    this.choices = this.choiceState.choices;
    this.isLoading = this.choiceState.isChoicesLoading;
    this.isError = this.choiceState.isChoicesError;
  }
}
