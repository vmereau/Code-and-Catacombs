import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Skill} from '../skill.class';

@Component({
  selector: 'app-skill-info',
  imports: [],
  templateUrl: './skill-info.component.html',
  standalone: true,
  styleUrl: './skill-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillInfoComponent {
  @Input() skill: Skill | undefined;
}
