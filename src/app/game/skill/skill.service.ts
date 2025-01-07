import {Injectable, resource, signal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {GenerateSkillDto, Skill} from './skill.class';
import {AdventurerService} from '../adventurer/adventurer.service';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = `${environment.api.baseUrl}/skill`;
  public adventurerSkills = signal<Skill[]>([]);

  constructor(private adventurerService: AdventurerService) {}


  public skillResource = resource({
    loader: async ({request, abortSignal}) => this.fetchSkill(request, abortSignal),
  });

  // Function to fetch the story
  private async fetchSkill(request: any, abortSignal: AbortSignal): Promise<Skill> {
    console.log("generating a new Skill...");

    const generateSkillDto: GenerateSkillDto = {
      archetype: this.adventurerService.adventurer()?.archetype,
      level: this.adventurerService.adventurer()?.level
    }

    const response = await fetch(`${this.apiUrl}/generate`, {
      signal: abortSignal,
      method: "POST",
      body: JSON.stringify(generateSkillDto)
    });

    if (!response.ok) throw new Error("Unable to load new skill");
    return response.json();
  }
}
