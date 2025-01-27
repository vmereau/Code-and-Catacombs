export class Story {
  name: string;
  story_summary: string;
  biome: string;
  boss_name: string;

  constructor(name: string, story_summary: string, biome: string, boss_name: string) {
    this.name = name;
    this.story_summary = story_summary;
    this.biome = biome;
    this.boss_name = boss_name;
  }
}

export class GenerateStoryDto {
  premise?: string | undefined;

  constructor(premise?: string) {
    this.premise = premise;
  }
}
