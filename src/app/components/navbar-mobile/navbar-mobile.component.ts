import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-navbar-mobile',
    imports: [CommonModule, TranslateModule, RouterLink, RouterLinkActive],
    templateUrl: './navbar-mobile.component.html',
    styleUrls: ['./navbar-mobile.component.scss']
})

export class NavbarMobileComponent {
    currentRoute = 'projects';

    constructor(public langService: LanguageService, private router: Router) {
        this.router.events.subscribe(() => {
            const path = this.router.url.split('/')[1];
            this.currentRoute = path || 'projects';
        });
    }

    switchLang(): void {
        this.langService.switchLanguage();
    }
}
