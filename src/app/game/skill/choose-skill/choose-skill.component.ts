import { ChangeDetectionStrategy, Component, EventEmitter, Output, ResourceRef } from '@angular/core';
import { SkillInfoComponent } from '../skill-info/skill-info.component';
import { Skill } from '../skill.class';
import { SkillService } from '../skill.service';

@Component({
  selector: 'app-choose-skill',
  imports: [SkillInfoComponent],
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
      const skill: Skill | undefined = this.skill.value();

      if (!skill) return skills;

      return [...skills, skill];
    });

    this.skillSelected.emit(true);
  }
}
