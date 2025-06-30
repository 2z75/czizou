import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SafeUrlPipe } from './safe-url.pipe';
import gsap from 'gsap';

@Component({
    selector: 'app-play',
    imports: [CommonModule, TranslateModule, SafeUrlPipe],
    templateUrl: './play.component.html',
    styleUrl: './play.component.scss'
})

export class PlayComponent {

    @ViewChild('videoModal', { static: false }) videoModalRef!: ElementRef;
    currentTab: string = 'games';

    tabs = [
        { key: 'games', label: 'play.tabs.games' }
    ];

    games = [
        { thumbnail: 'assets/highlights/r6.jpg', embedUrl: '' },
        { thumbnail: 'assets/highlights/callOf.jpg', embedUrl: '' },
        { thumbnail: 'assets/highlights/warzone.jpg', embedUrl: '' },
        { thumbnail: 'assets/highlights/fc25.jpg', embedUrl: 'https://www.youtube.com/embed/dmwM516cSpY?autoplay=1&rel=0' },
        { thumbnail: 'assets/highlights/bleach.jpg', embedUrl: '' },
        { thumbnail: 'assets/highlights/splitFiction.jpg', embedUrl: '' },
        { thumbnail: 'assets/highlights/ufc5.jpg', embedUrl: '' },
        { thumbnail: 'assets/highlights/grBreakpoint.jpg', embedUrl: '' }
    ];

    selectedVideo: string | null = null;

    openModal(url: string) {
        this.selectedVideo = url;
        setTimeout(() => {
            if (this.videoModalRef?.nativeElement) {
                gsap.fromTo(
                    this.videoModalRef.nativeElement,
                    { opacity: 0, scale: 0.95},
                    { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
                );
            }
        });
    }
    

    closeModal() {
        if (this.videoModalRef) {
            gsap.to(this.videoModalRef.nativeElement, {
                opacity: 0,
                scale: 0.95,
                duration: 0.5,
                ease: 'power3.in',
                onComplete: () => {
                    this.selectedVideo = null;
                }
            });
        } else {
            this.selectedVideo = null;
        }
    }
}
