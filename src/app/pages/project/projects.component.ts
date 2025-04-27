import { Component } from '@angular/core';
import { projectData } from '../../data/project-data';
import { Project } from '../../interfaces/project';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-projects',
    imports: [CommonModule, ProjectCardComponent],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss',
})

export class ProjectsComponent {
    projects: Project[] = projectData;
    currentProjectIndex = 0;

    onProjectSelected(index: number) {
        this.currentProjectIndex = index;
    }
}
