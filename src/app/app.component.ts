import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent {
    title = 'czizou';

    constructor(public router: Router) {}
    public hideNavbarRoutes = ['/login'];

    showNavbar(): boolean {
        return !this.hideNavbarRoutes.includes(this.router.url);
    }
}
