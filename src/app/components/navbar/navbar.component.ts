import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterModule, TranslateModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {
    currentTime: string = '';
    currentLang: string = 'fr';
    private intervalId: any;
    private timeoutId: any;

    constructor(public translate: TranslateService) {}

    ngOnInit(): void {
        // Détection initiale de langue (ou fallback en 'fr')
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
}
