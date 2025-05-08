import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, NavigationStart } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import gsap from 'gsap';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnDestroy, AfterViewInit {
    @ViewChild('pageWrapper', { static: true }) pageWrapper!: ElementRef;

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

    ngAfterViewInit(): void {
        this.setupTransition()
    }

    private setupTransition(): void {
        this.router.events
        .pipe(filter(event => event instanceof NavigationStart || event instanceof NavigationEnd))
        .subscribe(event => {
            const wrapper = this.pageWrapper.nativeElement;

            if (event instanceof NavigationStart) {
                gsap.to(wrapper, { opacity: 0, scale:0.98, duration: 0.6, ease: 'power3.inOut' });
            }

            if (event instanceof NavigationEnd) {
                gsap.fromTo(wrapper, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 });
            }
        });
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }
}
