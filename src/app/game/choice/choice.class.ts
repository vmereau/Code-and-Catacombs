export enum ChoiceTypeEnum {
  Fight = 'Fight',
  Elite_fight = 'Elite_fight',
  Treasure = 'Treasure', // Strong item
  Power = 'Power', // new skill
  Shop = 'Shop',
  Other_choices = 'Other_choices',
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
