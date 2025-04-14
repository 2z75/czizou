import { Component, OnInit, OnDestroy } from '@angular/core';
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


    constructor(public translate: TranslateService, private router: Router) {}

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

    profileMenu = [
        { icon: 'assets/icons/message.svg', label: 'Me contacter', route: '/contact' },
        { icon: 'assets/icons/controller.svg', label: 'Jouer avec moi', route: '/play' },
        { icon: 'assets/icons/settings.svg', label: 'Thème', route: '/contact' },
        { icon: 'assets/icons/logout.svg', label: 'Déconnexion', route: '/login' }, 
    ];

}
