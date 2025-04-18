import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { parcoursData} from '../../data/about-data';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {
    
    currentTab: string = 'intro';

    

    tabs = [
        { label: 'about.tabs.intro', key: 'intro' },
        { label: 'about.tabs.parcours', key: 'parcours' },
    ];

    parcours = parcoursData;

}
