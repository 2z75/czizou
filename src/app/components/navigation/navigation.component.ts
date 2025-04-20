import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Project } from '../../interfaces/project';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navigation',
    imports: [ CommonModule ],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

    @Input() projects: Project[] = [];
    @Output() projectSelected = new EventEmitter<number>();

    selectProject(index: number) {
        this.projectSelected.emit(index);
    }

    @Input() currentProjectIndex!: number;

    calculateTranslateX(): number {
        const itemWidth = 160 + 24; // w-40 + gap-6
        const center = Math.floor(this.projects.length / 2);
        return (center - this.currentProjectIndex) * itemWidth;
    }

}


