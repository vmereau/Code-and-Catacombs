import {Choice, ChoiceTypeEnum} from '../app/game/choice/choice.class';

export const mockChoices: Choice[] = [
  {
    "description": "A narrow passage, the current seems strong, you will need to make an athletics check to swim through it",
    "title": "Swim Through the Currents",
    "type": ChoiceTypeEnum.Shop
  },
  {
    "description": "You spot an underwater cave, there are some strange symbols near the entrance, could be some old puzzles, may require investigation skills.",
    "title": "Explore the Underwater Cave",
    "type": ChoiceTypeEnum.Choices
  },
  {
    "description": "You see a group of aquatic guardians patrolling a submerged temple, they are clearly hostile, engaging them might be risky.",
    "title": "Confront the Aquatic Guardians",
    "type": ChoiceTypeEnum.Treasure
  }
]
