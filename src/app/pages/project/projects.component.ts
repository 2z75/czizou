import { Component, OnInit } from '@angular/core';
import { projectData } from '../../data/project-data';
import { Project } from '../../interfaces/project';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { ProjectCardMobileComponent } from '../../components/project-card-mobile/project-card-mobile.component';
import { CommonModule } from '@angular/common';
import { DeviceService } from '../../services/device.service';

@Component({
    selector: 'app-projects',
    imports: [CommonModule, ProjectCardComponent, ProjectCardMobileComponent],
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
})

export class ProjectsComponent implements OnInit {
    projects: Project[] = projectData;
    currentProjectIndex = 0;
    isMobile = false;

    constructor(private deviceService: DeviceService) {}

        ngOnInit(): void {
            this.isMobile = this.deviceService.isMobile();
        }

    onProjectSelected(index: number) {
        this.currentProjectIndex = index;
    }
}
function ngOnInit() {
    throw new Error('Function not implemented.');
}

