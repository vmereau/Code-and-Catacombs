import { ChangeDetectionStrategy, Component, EventEmitter, Output, ResourceRef } from '@angular/core';
import { Skill } from '../skill.class';
import { SkillService } from '../skill.service';

@Component({
  selector: 'app-choose-skill',
  imports: [],
  templateUrl: './choose-skill.component.html',
  standalone: true,
  styleUrl: './choose-skill.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseSkillComponent {
  public skill: ResourceRef<Skill>;
  @Output() private skillSelected = new EventEmitter<boolean>();

  constructor(private skillService: SkillService) {
    this.skill = this.skillService.skillResource;
    this.skill.reload();
  }

  public selectSkill(): void {
    this.skillService.adventurerSkills.update((skills) => {
      skills.push(this.skill.value() as Skill);
      return skills;
    });

    this.skillSelected.emit(true);
  }
}
