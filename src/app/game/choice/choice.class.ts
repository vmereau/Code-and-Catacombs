import { Story } from '../story/story.class';

export enum ChoiceTypeEnum {
  None = 'none',
  Fight = 'Fight',
  Elite_fight = 'Elite_fight',
  Treasure = 'Treasure', // Strong item
  Power = 'Power', // new skill
  Shop = 'Shop',
  Choices = 'Choices',
}

export class Choice {
  title: string;
  description: string;
  type: ChoiceTypeEnum;

  constructor(title: string, description: string, type: ChoiceTypeEnum) {
    this.title = title;
    this.description = description;
    this.type = type;
  }
}

export interface GenerateChoicesDto {
  story: Story | undefined;
  numberOfChoices: number;
}
