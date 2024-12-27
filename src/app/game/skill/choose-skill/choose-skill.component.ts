import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ResourceRef} from '@angular/core';
import {Adventurer} from '../../adventurer/adventurer.class';
import {AdventurerService} from '../../adventurer/adventurer.service';
import {SkillService} from '../skill.service';
import {Skill} from '../skill.class';

@Component({
  selector: 'app-choose-skill',
  imports: [],
  templateUrl: './choose-skill.component.html',
  standalone: true,
  styleUrl: './choose-skill.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChooseSkillComponent {
  public skill: ResourceRef<Skill>;
  @Output() private skillSelected = new EventEmitter<boolean>();

  constructor(private skillService: SkillService) {
    this.skill = this.skillService.skillResource;
    this.skill.reload();
  }

  public selectSkill(): void {
    this.skillService.adventurerSkills.update(skills => {
      skills.push(<Skill>this.skill.value());
      return skills;
    });

    this.skillSelected.emit(true);
  }

}
