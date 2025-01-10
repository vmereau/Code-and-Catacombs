import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.component.html',
  standalone: true,
  styleUrl: './landing.component.scss',
})
export class LandingComponent {}
