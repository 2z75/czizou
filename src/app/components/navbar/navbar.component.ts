import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterModule, TranslateModule, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {
    currentTime: string = '';
    currentLang: string = 'fr';
    private intervalId: any;
    private timeoutId: any;


    constructor(public translate: TranslateService, private router: Router, ) {}

    // Traduction
    ngOnInit(): void {
        this.currentLang = this.translate.currentLang || this.translate.getBrowserLang() || 'fr';
        this.translate.use(this.currentLang);

        this.updateTime();
        this.syncClock();
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
    }

    switchLanguage(): void {
        this.currentLang = this.currentLang === 'fr' ? 'en' : 'fr';
        this.translate.use(this.currentLang);
    }


    //Heure
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
        { icon: 'assets/icons/message.svg', label: 'navbar.contact', route: '/contact' },
        { icon: 'assets/icons/controller.svg', label: 'navbar.play', route: '/play' },
        { icon: 'assets/icons/player.svg', label: 'navbar.switchProfile', route: null, disabled: true },
        { icon: 'assets/icons/logout.svg', label: 'navbar.logout', route: '/login' },
    ];

    isMenuOpen = false;

    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
        console.log("toggle menu")
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
