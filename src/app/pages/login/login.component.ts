import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginButtonComponent } from '../../components/login-button/login-button.component';

enum LoginStep {
    INTRO,
    BUTTON,
    PROFILE
}

@Component({
    selector: 'app-login',
    imports: [CommonModule, RouterModule, LoginButtonComponent],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    step: LoginStep = LoginStep.INTRO;

    hideIntro = false;
    hideButton = false;
    hideProfiles = false;

    selectedProfileIndex = 1;

    get isIntro() {
        return this.step === LoginStep.INTRO;
    }

    get isButton() {
        return this.step === LoginStep.BUTTON;
    }

    get isProfile() {
        return this.step === LoginStep.PROFILE;
    }

    ngOnInit(): void {
        setTimeout(() => {
        this.hideIntro = true;
        }, 3000);
        setTimeout(() => {
        this.step = LoginStep.BUTTON;
        }, 5000);
    }

    triggerShowProfiles(): void {
        this.hideButton = true;
        setTimeout(() => {
            this.step = LoginStep.PROFILE;
            setTimeout(() => {
                this.hideProfiles = false;
            }, 50);
        }, 1000);
    }
}
