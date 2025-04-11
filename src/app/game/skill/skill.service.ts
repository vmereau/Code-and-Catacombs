import { Injectable, resource, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GenerateSkillDto, Skill } from './skill.class';
import {FetchService} from '../shared/fetch.service';
import {AdventurerState} from '../adventurer/adventurer-state.service';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private apiUrl = `${environment.api.baseUrl}/skill`;
  public adventurerSkills = signal<Skill[]>([]);

  constructor(private adventurerState: AdventurerState,
              private fetchService: FetchService) {}

  public skillResource = resource({
    loader: async ({ request, abortSignal }) => this.fetchSkill(request, abortSignal),
  });

  // Function to fetch the story
  private async fetchSkill(request: unknown, abortSignal: AbortSignal): Promise<Skill> {
    console.log('generating a new Skill...');

    const generateSkillDto: GenerateSkillDto = {
      archetype: this.adventurerState.adventurer()?.archetype,
      level: this.adventurerState.adventurer()?.level,
    };

    return this.fetchService.fetch(`${this.apiUrl}/generate`, 'POST', abortSignal, generateSkillDto);
  }
}
