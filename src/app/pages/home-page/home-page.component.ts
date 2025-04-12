import { Component } from '@angular/core';
import { projectData } from '../../data/project-data';
import { Project } from '../../interfaces/project';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  projects: Project[] = projectData;
  currentProjectIndex = 0;

  onProjectSelected(index: number) {
    this.currentProjectIndex = index;
  }
}
