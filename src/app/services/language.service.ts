import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    currentLang: string = 'fr';

    constructor(private translate: TranslateService) {
        this.currentLang = this.translate.currentLang || this.translate.getBrowserLang() || 'fr';
        this.translate.use(this.currentLang);
    }

    switchLanguage(): void {
        this.currentLang = this.currentLang === 'fr' ? 'en' : 'fr';
        this.translate.use(this.currentLang);
    }

    getCurrentLang(): string {
        return this.currentLang;
    }
}
