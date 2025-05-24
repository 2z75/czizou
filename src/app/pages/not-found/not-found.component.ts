import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginButtonComponent } from '../../components/login-button/login-button.component';

@Component({
    selector: 'app-not-found',
    imports: [RouterModule, LoginButtonComponent],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss'
})

export class NotFoundComponent {

}
