import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, NavigationStart } from '@angular/router';
import { filter, Subscription, fromEvent } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarMobileComponent } from './components/navbar-mobile/navbar-mobile.component';
import { DeviceService } from './services/device.service';
import gsap from 'gsap';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, NavbarComponent, NavbarMobileComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnDestroy, AfterViewInit {
    @ViewChild('pageWrapper', { static: true }) pageWrapper!: ElementRef;

    title = 'czizou';
    showNavbar = true;
    isMobile = false;

    private routerSubscription!: Subscription;
    private resizeSubscription!: Subscription;

    constructor(private router: Router, private deviceService: DeviceService) {
        this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
            const hiddenRoutes = ['/', '/404'];
            const currentUrl = this.router.url;
            const isNotFound = !this.router.config.some(route => route.path && currentUrl.startsWith(`/${route.path}`));
            this.showNavbar = !hiddenRoutes.includes(currentUrl) && !isNotFound;
        });

        this.isMobile = this.deviceService.isMobile();
    }

    ngAfterViewInit(): void {
        this.setupTransition();
        this.setupResizeObserver();
    }

    private setupResizeObserver(): void {
        this.resizeSubscription = fromEvent(window, 'resize')
        .pipe(
            debounceTime(200),
            startWith(null),
            map(() => this.deviceService.isMobile())
        )
        .subscribe(isMobile => {
            this.isMobile = isMobile;
        });
    }

    private setupTransition(): void {
        this.router.events
        .pipe(filter(event => event instanceof NavigationStart || event instanceof NavigationEnd))
        .subscribe(event => {
            const wrapper = this.pageWrapper.nativeElement;

            if (event instanceof NavigationStart) {
            gsap.to(wrapper, { opacity: 0, scale: 0.98, duration: 0.6, ease: 'power3.inOut' });
            }

            if (event instanceof NavigationEnd) {
            gsap.fromTo(wrapper, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 });
            }
        });
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
        this.resizeSubscription.unsubscribe();
    }
}
