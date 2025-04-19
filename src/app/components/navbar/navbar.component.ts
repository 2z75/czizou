import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterModule, CommonModule, TranslateModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {
    currentTime: string = '';
    private intervalId: any;
    private timeoutId: any;

    constructor(
        public langService: LanguageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.updateTime();
        this.syncClock();
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
    }

    // Heure
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

    // Sous menu
    profileMenu = [
        { icon: 'assets/icons/message.svg', label: 'navbar.contact', route: '/about' },
        { icon: 'assets/icons/controller.svg', label: 'navbar.play', route: '/play' },
        { icon: 'assets/icons/player.svg', label: 'navbar.switchProfile', route: null, disabled: true },
        { icon: 'assets/icons/logout.svg', label: 'navbar.logout', route: '/login' },
    ];

    isMenuOpen = false;

    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

    navigateTo(route: string): void {
        this.isMenuOpen = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.router.navigate([route]);
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        const target = event.target as HTMLElement;

        if (!target.closest('.profile-avatar') && !target.closest('.profile-menu')) {
            this.isMenuOpen = false;
        }
    }
}
