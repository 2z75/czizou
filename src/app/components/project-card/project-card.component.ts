import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../interfaces/project';
import { TranslateModule } from '@ngx-translate/core';
import { GLTFLoader } from 'three-stdlib'
import gsap from 'gsap';
import { AmbientLight, Box3, Clock, DirectionalLight, Group, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';


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
    isDragging = false;
    previousMouseX = 0;
    rotationSpeed = 0.005;
    clock = new Clock();

    ngAfterViewInit(): void {
        this.updateCarouselPosition();
        this.animateShine(); 
        this.init3D();
        this.loadModel(this.currentProject.modelPath);
        const canvas = this.canvasRef.nativeElement;

        canvas.addEventListener('mousedown', (e: MouseEvent) => {
            this.isDragging = true;
            this.previousMouseX = e.clientX;
        });

        canvas.addEventListener('mouseup', () => {
        this.isDragging = false;
        });

        canvas.addEventListener('mouseleave', () => {
        this.isDragging = false;
        });

        canvas.addEventListener('mousemove', (e: MouseEvent) => {
            if (this.isDragging && this.model) {
                const deltaX = e.clientX - this.previousMouseX;
                this.previousMouseX = e.clientX;
                this.model.rotation.y += deltaX * this.rotationSpeed;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['currentProjectIndex'] && !changes['currentProjectIndex'].firstChange) {
            this.updateCarouselPosition();
            this.animateShine();
            this.loadModel(this.currentProject.modelPath);
        }
    }

    animateShine(): void {
        const shine = this.carouselListRef.nativeElement.querySelector('#shine');
        if (!shine) return;

        gsap.set(shine, { top: '-150%', left: '-150%' });
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

    loadModel(path: string): void {
        if (!this.scene) return;

        if (this.model) {
            this.scene.remove(this.model);
            this.model.traverse((child: any) => {
                if (child.isMesh) {
                    child.geometry.dispose();
                    if (child.material.map) child.material.map.dispose();
                    child.material.dispose();
                }
            });
            this.model = null;
        }

        const loader = new GLTFLoader();
        loader.load(path, gltf => {
        const rawModel = gltf.scene;
        const box = new Box3().setFromObject(rawModel);
        const center = new Vector3();
        box.getCenter(center);

        rawModel.position.sub(center);

        const group = new Group();
        group.add(rawModel);
        group.position.y = 0;
        const scale = this.currentProject.scale || 1;
        group.scale.set(scale, scale, scale);

        this.model = group;
        this.scene.add(this.model);
        this.animate();
        });
    }

    init3D(): void {
        const canvas = this.canvasRef.nativeElement;

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(35, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        this.camera.position.z = 7;
        this.renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        const ambientLight = new AmbientLight(0xffffff, 1);
        const dirLight = new DirectionalLight(0xffffff, 0.5);
        dirLight.position.set(5, 5, 5);

        this.scene.add(ambientLight, dirLight);
    }

    animate(): void {
        requestAnimationFrame(() => this.animate());
        const delta = this.clock.getDelta();
        if (this.model) {
            this.model.rotation.y += delta * 0.02;
        }
        this.renderer.render(this.scene, this.camera);
    }
}
