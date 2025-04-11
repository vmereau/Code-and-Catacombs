import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ResourceRef,
  Signal,
  WritableSignal
} from '@angular/core';
import { SkillInfoComponent } from '../skill-info/skill-info.component';
import { Skill } from '../skill.class';
import { SkillService } from '../skill.service';
import {Adventurer} from '../../adventurer/adventurer.class';
import {SkillState} from '../skill-state.service';

@Component({
  selector: 'app-choose-skill',
  imports: [SkillInfoComponent],
  templateUrl: './choose-skill.component.html',
  standalone: true,
  styleUrl: './choose-skill.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseSkillComponent {
  public skill: WritableSignal<Skill | undefined>;
  public isLoading: Signal<boolean>;
  public isError: Signal<unknown>;

  @Output() private skillSelected = new EventEmitter<boolean>();

  constructor(private skillState: SkillState,
              private skillService: SkillService) {
    this.skill = this.skillState.skill;
    this.isLoading = this.skillState.isSkillLoading;
    this.isError = this.skillState.isSkillError;

    this.skillService.reloadSkill();
  }

  public selectSkill(): void {
    this.skillState.adventurerSkills.update((skills) => {
      const skill: Skill | undefined = this.skill();

      if (!skill) return skills;

      return [...skills, skill];
    });

    this.skillSelected.emit(true);
  }

  public reloadSkill(): void {
    this.skillService.reloadSkill();
  }
}
