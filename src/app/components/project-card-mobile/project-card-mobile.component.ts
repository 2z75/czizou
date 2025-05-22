import { Component, Input } from '@angular/core';
import { Project } from '../../interfaces/project';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-project-card-mobile',
    imports: [TranslateModule, CommonModule],
    templateUrl: './project-card-mobile.component.html',
    styleUrl: './project-card-mobile.component.scss'
})

export class ProjectCardMobileComponent {
    @Input() projects: Project[] = [];

}
