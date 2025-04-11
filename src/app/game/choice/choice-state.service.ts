import {computed, Injectable, Signal} from '@angular/core';
import {Choice} from './choice.class';
import {ChoiceService} from './choice.service';

@Injectable({
  providedIn: 'root'
})
export class ChoiceState {

  public choices: Signal<Choice[] | undefined> = computed(() => this.choiceService.choicesResource.value());
  public isChoicesLoading: Signal<boolean> = computed(() => this.choiceService.choicesResource.isLoading());
  public isChoicesError: Signal<unknown> = computed(() => this.choiceService.choicesResource.error());

  constructor(private choiceService: ChoiceService) { }
}
