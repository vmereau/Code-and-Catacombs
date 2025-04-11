import {computed, Injectable, linkedSignal, signal, Signal} from '@angular/core';
import {Choice} from '../choice/choice.class';
import {Skill} from './skill.class';
import {SkillService} from './skill.service';

@Injectable({
  providedIn: 'root'
})
export class SkillState {
  public adventurerSkills = signal<Skill[]>([]);

  public skill = linkedSignal(() => this.skillService.skillResource.value());
  public isSkillLoading: Signal<boolean> = computed(() => this.skillService.skillResource.isLoading());
  public isSkillError: Signal<unknown> = computed(() => this.skillService.skillResource.error());

  constructor(private skillService: SkillService) { }
}
