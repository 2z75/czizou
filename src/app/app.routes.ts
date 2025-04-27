import { Routes } from '@angular/router';
import { ProjectsComponent } from './pages/project/projects.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { PlayComponent } from './pages/play/play.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'about', component: AboutComponent},
    { path: 'play', component: PlayComponent}
];
