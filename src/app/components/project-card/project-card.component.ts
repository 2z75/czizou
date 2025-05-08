import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../interfaces/project';
import { TranslateModule } from '@ngx-translate/core';
import { GLTFLoader } from 'three-stdlib'
import gsap from 'gsap';
import { AmbientLight, Clock, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three';


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
    @ViewChild('canvas3D', { static: false }) canvasRef!: ElementRef;

    scene!: Scene;
    camera!: PerspectiveCamera;
    renderer!: WebGLRenderer;
    model: any;
    clock = new Clock();

    ngAfterViewInit(): void {
        this.updateCarouselPosition();
        this.animateShine(); 
        this.init3D();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['currentProjectIndex'] && !changes['currentProjectIndex'].firstChange) {
            this.updateCarouselPosition();
            this.animateShine(); 
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
            x: -offset + 20,
            duration: 0.6,
            ease: 'power3.out',
        });
    }

    init3D(): void {
        const canvas = this.canvasRef.nativeElement;
        const { modelPath } = this.currentProject;

        this.scene = new Scene();

        this.camera = new PerspectiveCamera(35, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        this.camera.position.z = 6;

        this.renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        const ambientLight = new AmbientLight(0xffffff, 1);
        const dirLight = new DirectionalLight(0xffffff, 0.5);
        dirLight.position.set(5, 5, 5);

        this.scene.add(ambientLight, dirLight);

        const loader = new GLTFLoader();
        loader.load(modelPath, gltf => {
            this.model = gltf.scene;
            this.model.position.set(0, -1.7, 0);
            this.model.scale.set(0.01, 0.01, 0.01);
            this.scene.add(this.model);
            this.animate();
        });
    }

    animate(): void {
        requestAnimationFrame(() => this.animate());
        
        const delta = this.clock.getDelta();
        if (this.model) {
            this.model.rotation.y += delta * 0.5;
        }
        
        this.renderer.render(this.scene, this.camera);
    }

}
