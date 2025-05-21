import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-navbar-mobile',
    imports: [RouterLink],
    templateUrl: './navbar-mobile.component.html',
    styleUrl: './navbar-mobile.component.scss'
})
export class NavbarMobileComponent {

    constructor( public langService: LanguageService, private router: Router ) {}

}
