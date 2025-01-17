import { ChangeDetectionStrategy, Component, computed, effect, signal, Signal, WritableSignal } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Adventurer } from '../adventurer/adventurer.class';
import { AdventurerService } from '../adventurer/adventurer.service';
import { Monster } from '../monster/monster.class';
import { MonsterService } from '../monster/monster.service';
import { CharacterUpdatableNumberProperties } from '../shared/character/character.class';
import { updateCharacterStats } from '../shared/character/character.utils';
import { SkillInfoComponent } from '../skill/skill-info/skill-info.component';
import { Skill, SkillTargetCharacterEnum } from '../skill/skill.class';
import { SkillService } from '../skill/skill.service';
import {ItemInfosComponent} from '../shared/items/item-infos/item-infos.component';
import {Item, ItemEffect} from '../shared/items/item.class';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  standalone: true,
  styleUrl: './fight.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Dialog, SkillInfoComponent, ItemInfosComponent],
})
export class FightComponent {
  public monster: WritableSignal<Monster | undefined>;
  public adventurer: WritableSignal<Adventurer | undefined>;
  public adventurerSkills: WritableSignal<Skill[] | undefined>;
  public adventurerConsumables: Signal<Item[] | undefined>;

  public isLoading: Signal<boolean>;
  public isError: Signal<unknown>;

  public combatLog: WritableSignal<string[]> = signal([]);
  public playerTurn: WritableSignal<boolean> = signal(true);

  public useSkillVisible = false;
  public useConsumableVisible = false;

  public canMakeAction: Signal<boolean> = computed(() => {
    if (!this.playerTurn()) {
      return false;
    }

    const monsterCurrentHealth = this.monster()?.currentHealth;
    return !(monsterCurrentHealth && monsterCurrentHealth <= 0);
  });

  constructor(
    private monsterService: MonsterService,
    private adventurerService: AdventurerService,
    private skillService: SkillService
  ) {
    this.monster = this.monsterService.monster;
    this.isLoading = this.monsterService.isMonsterLoading;
    this.isError = this.monsterService.isMonsterError;

    this.adventurer = this.adventurerService.adventurer;
    this.adventurerSkills = this.skillService.adventurerSkills;
    this.adventurerConsumables = this.adventurerService.consumables;

    const endOfFightCheckEffect = effect(() => {
      this.checkEndOfFight();
    });

    const monsterTurnEffect = effect(() => {
      if (this.playerTurn()) {
        return;
      }

      this.monsterTurn();
    });
  }

  public adventurerAttack(): void {
    const damage = Math.max((this.adventurer()?.attack || 1) - (this.monster()?.defense || 0), 1);

    updateCharacterStats(this.monster, CharacterUpdatableNumberProperties.currentHealth, -damage);
    this.addCombatLog(`${this.adventurer()?.name} attacks the ${this.monster()?.name}, inflicting ${damage} damage.`);
    this.playerTurn.set(false);
  }

  public toggleUseSkillsVisible(): void {
    this.useSkillVisible = !this.useSkillVisible;
  }

  public toggleUseConsumableVisible(): void {
    this.useConsumableVisible = !this.useConsumableVisible;
  }

  public castSkill(skill: Skill): void {
    const currentMana = this.adventurer()?.currentMana || 0;

    if (currentMana < skill.cost) {
      this.addCombatLog(
        `Cannot cast ${skill.name} (${skill.cost}), insufficient mana: ${this.adventurer()?.currentMana}`,
      );
      return;
    }

    skill.effects.forEach((skillEffect) => {
      const target: WritableSignal<Adventurer | Monster | undefined> =
        skillEffect.targetCharacter === SkillTargetCharacterEnum.self ? this.adventurer : this.monster;
      updateCharacterStats(target, skillEffect.targetProperty, skillEffect.value);
      this.addCombatLog(`${target()?.name}: ${skillEffect.targetProperty} ${skillEffect.value}`);
    });

    this.adventurerService.updateStats(CharacterUpdatableNumberProperties.currentMana, -skill.cost);
    this.addCombatLog(`${this.adventurer()?.name} casted ${skill.name} successfully !`);
    this.toggleUseSkillsVisible();
    this.playerTurn.set(false);
  }

  public canCastSkill(skill: Skill): boolean {
    if(!this.canMakeAction()) return false;

    const currentMana = this.adventurer()?.currentMana || 0;

    return currentMana >= skill.cost;
  }

  public useConsumable(item: Item): void {
    item.effects.forEach((effect:ItemEffect) => {
      updateCharacterStats(this.adventurer, effect.targetProperty, effect.value);
    })

    this.adventurerService.removeItemFromInventory(item);
    this.addCombatLog(`${this.adventurer()?.name} used ${item.name} successfully !`);
    this.toggleUseConsumableVisible();
    this.playerTurn.set(false);
  }

  private addCombatLog(newLog: string): void {
    this.combatLog.update((log) => {
      return [...log, newLog];
    });
  }

  private monsterTurn(): void {
    const monsterCurrentHealth = this.monster()?.currentHealth;

    if (monsterCurrentHealth && monsterCurrentHealth <= 0) {
      return;
    }

    this.monsterAttack();
  }

  private monsterAttack(): void {
    const damage = Math.max((this.monster()?.attack || 1)- (this.adventurer()?.defense || 0), 1);

    updateCharacterStats(this.adventurer, CharacterUpdatableNumberProperties.currentHealth, -damage);
    this.addCombatLog(`${this.monster()?.name} attacks ${this.adventurer()?.name}, inflicting ${damage} damage.`);
    this.playerTurn.set(true);
  }

  private checkEndOfFight(): void {
    const adventurerHealth = this.adventurer()?.currentHealth;
    if (adventurerHealth && adventurerHealth <= 0) {
      this.addCombatLog(`${this.adventurer()?.name} is dead, ${this.monster()?.name} wins !`);
    }

    const monsterHealth = this.monster()?.currentHealth;
    if (monsterHealth && monsterHealth <= 0) {
      this.addCombatLog(`${this.monster()?.name} is dead, ${this.adventurer()?.name} wins !`);
    }
  }
}
