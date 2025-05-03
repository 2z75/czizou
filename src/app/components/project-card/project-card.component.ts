import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../interfaces/project';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';


@Component({
    selector: 'app-project-card',
    imports: [CommonModule, TranslateModule ],
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss']
})

export class ProjectCardComponent implements AfterViewInit, OnChanges {
    @Input() projects: Project[] = [];
    @Input() currentProjectIndex = 0;
    @Output() projectSelected = new EventEmitter<number>();

    @ViewChild('carouselList', { static: false }) carouselListRef!: ElementRef;
    @ViewChildren('shine') shinesRef!: QueryList<ElementRef>;

    ngAfterViewInit(): void {
        this.updateCarouselPosition();
        this.animateShine(); // 🔥 déclenche au chargement
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['currentProjectIndex'] && !changes['currentProjectIndex'].firstChange) {
            this.updateCarouselPosition();
            this.animateShine(); // 🔥 re-déclenche à chaque changement de projet
        }
    }

    animateShine(): void {
        const shine = this.carouselListRef.nativeElement.querySelector('#shine');
        if (!shine) return;
        
        gsap.set(shine, { top: '-150%', left: '-150%' }); // reset la position
        gsap.to(shine, {
            top: '150%',
            left: '150%',
            duration: 4,
            ease: 'power2.inOut',
            repeat: -1,
            repeatDelay: 1,
        });
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
        const gap = 6; // gap-1.5 = 6px
        const cardSpacing = baseCardWidth + gap;
        const offset = (this.currentProjectIndex * cardSpacing) + ((activeCardWidth - baseCardWidth) / 2);
    
        gsap.to(this.carouselListRef.nativeElement, {
            x: -offset,
            duration: 0.6,
            ease: 'power3.out',
        });
    }
    

}
