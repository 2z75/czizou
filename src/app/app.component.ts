import { Component, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnDestroy {

    title = 'czizou';
    showNavbar = true;
    private routerSubscription!: Subscription;

    constructor(private router: Router) {
        this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
            this.showNavbar = !['/'].includes(event.urlAfterRedirects);
        });
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }
}
