import {WritableSignal} from '@angular/core';
import {Adventurer} from '../../adventurer/adventurer.class';
import {Monster} from '../../monster/monster.class';
import {Character, CharacterUpdatableNumberProperties} from './character.class';

export function updateCharacterStats(
  target: WritableSignal<Character | Adventurer | Monster | undefined>,
  property: CharacterUpdatableNumberProperties,
  value: number,
) {
  target.update((target: Character | Adventurer | Monster | undefined) => {
    if (!target) return undefined;

    if(property === CharacterUpdatableNumberProperties.currentHealth && Math.sign(value) === 1){
      target[property] = Math.min(target[property] + value, target.health);
    } else if (property === CharacterUpdatableNumberProperties.currentMana && Math.sign(value) === 1){
      target[property] = Math.min(target[property] + value, target.mana);
    } else {
      target[property] = target[property] + value;
    }

    return { ...target };
  });
}
