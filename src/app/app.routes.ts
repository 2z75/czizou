import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { PlayComponent } from './pages/play/play.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'projects', loadComponent: () => import('./pages/project/projects.component').then(m => m.ProjectsComponent) },
    { path: 'about', component: AboutComponent},
    { path: 'play', component: PlayComponent}
];
