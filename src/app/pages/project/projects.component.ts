import { Component, OnDestroy, OnInit } from '@angular/core';
import { projectData } from '../../data/project-data';
import { Project } from '../../interfaces/project';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { ProjectCardMobileComponent } from '../../components/project-card-mobile/project-card-mobile.component';
import { CommonModule } from '@angular/common';
import { DeviceService } from '../../services/device.service';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-projects',
    imports: [CommonModule, ProjectCardComponent, ProjectCardMobileComponent],
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
})

export class ProjectsComponent implements OnInit, OnDestroy {
    projects: Project[] = projectData;
    currentProjectIndex = 0;
    isMobile = false;

    private resizeSubscription!: Subscription;

    constructor(private deviceService: DeviceService) {}

    ngOnInit(): void {
        this.resizeSubscription = fromEvent(window, 'resize')
        .pipe(
            debounceTime(200),
            startWith(null),
            map(() => this.deviceService.isMobile())
        )
        .subscribe(isMobile => {
            this.isMobile = isMobile;
        });
    }

    ngOnDestroy(): void {
        this.resizeSubscription.unsubscribe();
    }

    onProjectSelected(index: number) {
        this.currentProjectIndex = index;
    }
}
