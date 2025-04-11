import {computed, Injectable, linkedSignal, Signal} from '@angular/core';
import {Monster} from './monster.class';
import {MonsterService} from './monster.service';
import {CharacterUpdatableNumberProperties} from '../shared/character/character.class';

@Injectable({
  providedIn: 'root'
})
export class MonsterState {

  public monster = linkedSignal(() => {
    const monsters: Monster[] | undefined = this.monsterService.monstersResource.value();

    if (!monsters || monsters.length === 0) {
      return undefined;
    }

    const monster = monsters[0];
    if (!monster) {
      return undefined;
    }

    return new Monster(
      monster.name,
      monster.level,
      monster.description,
      monster.health,
      monster.attack,
      monster.mana,
      monster.defense,
      monster.experienceGiven,
      monster.goldGiven,
    );
  });

  public isMonsterLoading: Signal<boolean> = computed(() => this.monsterService.monstersResource.isLoading());
  public isMonsterError: Signal<unknown> = computed(() => this.monsterService.monstersResource.error());

  constructor(private monsterService:MonsterService) { }

  public updateStats(property: CharacterUpdatableNumberProperties, value: number) {
    this.monster.update((monster: Monster | undefined) => {
      if (!monster) return undefined;

      monster[property] += value;

      return { ...monster };
    });
  }
}
