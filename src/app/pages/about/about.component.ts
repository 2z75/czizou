import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { parcoursData} from '../../data/about-data';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';

@Component({
    selector: 'app-about',
    imports: [CommonModule, TranslateModule],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {
    @ViewChild('introRef') introRef!: ElementRef;
    @ViewChild('parcoursRef') parcoursRef!: ElementRef;

    currentTab: string = 'intro';

    tabs = [
        { label: 'about.tabs.intro', key: 'intro' },
        { label: 'about.tabs.parcours', key: 'parcours' },
    ];

    parcours = parcoursData;

    setTab(tab: string) {
        if (tab === this.currentTab) return;
        const outgoing = this.currentTab === 'intro' ? this.introRef : this.parcoursRef;
        const direction = this.tabs.findIndex(t => t.key === tab) > this.tabs.findIndex(t => t.key === this.currentTab) ? 1 : -1;

        gsap.to(outgoing.nativeElement, {
            x: -50 * direction,
            opacity: 0,
            duration: 0.35,
            ease: 'power3.inOut',
            onComplete: () => {
                this.currentTab = tab;

                requestAnimationFrame(() => {
                    const incoming = tab === 'intro' ? this.introRef : this.parcoursRef;
                    gsap.set(incoming.nativeElement, { x: 50 * direction, opacity: 0 });
                    gsap.to(incoming.nativeElement, { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
                });
            }
        });
    }
}
