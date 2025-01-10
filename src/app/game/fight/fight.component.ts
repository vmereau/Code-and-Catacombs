import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { Monster } from '../monster/monster.class';
import { MonsterService } from '../monster/monster.service';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  standalone: true,
  styleUrl: './fight.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FightComponent {
  public monster: Signal<Monster | undefined>;
  public isLoading: Signal<boolean>;
  public isError: Signal<unknown>;

  constructor(private monsterService: MonsterService) {
    this.monster = this.monsterService.monster;
    this.isLoading = this.monsterService.isMonsterLoading;
    this.isError = this.monsterService.isMonsterError;
  }
}
