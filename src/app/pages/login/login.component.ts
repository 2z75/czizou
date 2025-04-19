import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginButtonComponent } from '../../components/login-button/login-button.component';

@Component({
    selector: 'app-login',
    imports: [RouterModule, CommonModule, LoginButtonComponent],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    showIntro = true;
    hideIntro = false;
    showButton = false;
    showProfiles = false;
    selectedProfileIndex = 1;

    ngOnInit(): void {
        setTimeout(() => {
            this.hideIntro = true; 
        }, 3000);

        setTimeout(() => {
            this.showIntro = false;
            this.showButton = true;
        }, 5000);
    }

    triggerShowProfiles(): void {
        this.showProfiles = true;
    }

    selectProfile(index: number): void {
        this.selectedProfileIndex = index
    }
}
