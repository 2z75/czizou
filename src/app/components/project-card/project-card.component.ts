import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../interfaces/project';
import gsap from 'gsap';


@Component({
    selector: 'app-project-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss']
})

export class ProjectCardComponent implements AfterViewInit, OnChanges {
    @Input() projects: Project[] = [];
    @Input() currentProjectIndex = 0;
    @Output() projectSelected = new EventEmitter<number>();

    @ViewChild('carouselList', { static: false }) carouselListRef!: ElementRef;

    ngAfterViewInit(): void {
        this.updateCarouselPosition();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['currentProjectIndex'] && !changes['currentProjectIndex'].firstChange) {
            this.updateCarouselPosition();
        }
    }

    get currentProject(): Project {
        return this.projects[this.currentProjectIndex];
    }

    selectProject(index: number): void {
        this.projectSelected.emit(index);
    }

    updateCarouselPosition(): void {
        if (!this.carouselListRef?.nativeElement) return;

        const baseCardWidth = 96; // w-24
        const activeCardWidth = 144; // w-36
        const gap = 12; // gap-6
        const cardSpacing = baseCardWidth + gap;
        const offset = this.currentProjectIndex * cardSpacing + (activeCardWidth - baseCardWidth) / 2;

        gsap.to(this.carouselListRef.nativeElement, {
            x: -offset + 32,
            duration: 0.6,
            ease: 'power2.out',
        });
        

    }
}
