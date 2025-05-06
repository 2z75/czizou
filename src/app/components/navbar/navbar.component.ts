import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import gsap from 'gsap';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, RouterModule, CommonModule, TranslateModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
    })

export class NavbarComponent implements OnInit, OnDestroy {
    currentTime: string = '';
    private intervalId: any;
    private timeoutId: any;

    isMenuOpen = false;

    @ViewChild('dropMenu') dropMenuRef!: ElementRef;

    profileMenu = [
        { icon: 'assets/icons/message.svg', label: 'navbar.contact', route: '/about' },
        { icon: 'assets/icons/controller.svg', label: 'navbar.play', route: '/play' },
        { icon: 'assets/icons/player.svg', label: 'navbar.switchProfile', route: null, disabled: true },
        { icon: 'assets/icons/logout.svg', label: 'navbar.logout', route: '/' }
    ];

    constructor( public langService: LanguageService, private router: Router ) {}

    ngOnInit(): void {
        this.updateTime();
        this.syncClock();
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
    }

    private updateTime(): void {
        const now = new Date();
        this.currentTime = now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        }).replace(':', ' : ');
    }

    private syncClock(): void {
        const now = new Date();
        const secondsUntilNextMinute = 60 - now.getSeconds();
        this.timeoutId = setTimeout(() => {
            this.updateTime();
            this.intervalId = setInterval(() => this.updateTime(), 60000);
        }, secondsUntilNextMinute * 1000);
    }

    toggleMenu(): void {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.isMenuOpen = true;
            setTimeout(() => this.animateProfileMenu(), 50);
        }
    }

    private animateProfileMenu(): void {
        const menu = this.dropMenuRef?.nativeElement;
        if (!menu) return;

        gsap.set(menu, { opacity: 0, y: -10 });
        gsap.to(menu, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' });

        const items = menu.querySelectorAll('li');
        gsap.fromTo(items, { opacity: 0, y: -5 }, { opacity: 1, y: 0, duration: 0.25, stagger: 0.05, delay: 0.15, ease: 'power2.out' });
    }

    private closeMenu(): void {
        const menu = this.dropMenuRef?.nativeElement;
        if (!menu) {
            this.isMenuOpen = false;
            return;
        }

        const items = menu.querySelectorAll('li');
        gsap.to(items, { opacity: 0, y: -5, stagger: { each: 0.05, from: 'end'}, duration: 0.25, ease: 'power2.in' });
        gsap.to(menu, { opacity: 0, y: -10, duration: 0.3, ease: 'power3.in', delay: 0.15, onComplete: () => { this.isMenuOpen = false }});
    }

    navigateTo(route: string): void {
        this.closeMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.router.navigate([route]);
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        if ( !target.closest('.profile-avatar') && !target.closest('.profile-menu')) {
            this.closeMenu();
        }
    }
}
