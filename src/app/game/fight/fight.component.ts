import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  linkedSignal,
  signal,
  Signal,
  WritableSignal
} from '@angular/core';
import {Monster} from '../monster/monster.class';
import {MonsterService} from '../monster/monster.service';
import {CharacterUpdatableNumberProperties} from '../shared/character/character.class';
import {Adventurer} from '../adventurer/adventurer.class';
import {AdventurerService} from '../adventurer/adventurer.service';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  standalone: true,
  styleUrl: './fight.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button
  ]
})
export class FightComponent {
  public monster: WritableSignal<Monster | undefined>;
  public adventurer: WritableSignal<Adventurer | undefined>;

  public isLoading: Signal<boolean>;
  public isError: Signal<unknown>;

  public combatLog: WritableSignal<string[]> = signal([]);
  public playerTurn: WritableSignal<boolean> = signal(true);

  public canAttack: Signal<boolean> = computed(() => {
    if(!this.playerTurn()){
      return false;
    }

    const monsterCurrentHealth = this.monster()?.currentHealth;
    return !(monsterCurrentHealth && monsterCurrentHealth <= 0);
  })

  constructor(private monsterService: MonsterService,
              private adventurerService: AdventurerService) {
    this.monster = this.monsterService.monster;
    this.isLoading = this.monsterService.isMonsterLoading;
    this.isError = this.monsterService.isMonsterError;

    this.adventurer = this.adventurerService.adventurer;

    const endOfFightCheckEffect = effect(() => {
      this.checkEndOfFight();
    });

    const monsterTurnEffect = effect(() => {
      if(this.playerTurn()){
        return;
      }

      this.monsterTurn();
    })
  }

  public adventurerAttack(): void {
    const attack = this.adventurer()?.attack || 1;

    this.monsterService.updateStats(CharacterUpdatableNumberProperties.currentHealth, -attack);
    this.addCombatLog(`${this.adventurer()?.name} attacks the ${this.monster()?.name}, inflicting ${attack} damage.`);
    this.playerTurn.set(false);
  }

  private addCombatLog(newLog: string): void {
    this.combatLog.update((log) => {
      return [...log, newLog];
    })
  }

  private monsterTurn(): void {
    const monsterCurrentHealth = this.monster()?.currentHealth;

    if(monsterCurrentHealth && monsterCurrentHealth <= 0){
      return;
    }

    this.monsterAttack();
  }

  private monsterAttack(): void {
    const attack = this.monster()?.attack || 1;

    this.adventurerService.updateStats(CharacterUpdatableNumberProperties.currentHealth, -attack);
    this.addCombatLog(`${this.monster()?.name} attacks ${this.adventurer()?.name}, inflicting ${attack} damage.`);
    this.playerTurn.set(true);
  }

  private checkEndOfFight(): void {
    const adventurerHealth = this.adventurer()?.currentHealth;
    if(adventurerHealth && adventurerHealth <= 0){
      this.addCombatLog(`${this.adventurer()?.name} is dead, ${this.monster()?.name} wins !`);
    }

    const monsterHealth = this.monster()?.currentHealth;
    if(monsterHealth && monsterHealth <= 0){
      this.addCombatLog(`${this.monster()?.name} is dead, ${this.adventurer()?.name} wins !`);
    }
  }
}
