import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SafeUrlPipe } from './safe-url.pipe';

@Component({
    selector: 'app-play',
    imports: [CommonModule, TranslateModule, SafeUrlPipe],
    templateUrl: './play.component.html',
    styleUrl: './play.component.scss'
})

export class PlayComponent {

    currentTab: string = 'games';

    tabs = [
        { key: 'games', label: 'play.tabs.games' }
    ];

    games = [
        { thumbnail: 'assets/highlights/callOf.jpg', embedUrl: 'https://youtu.be/QDJs218CwgM' },
        { thumbnail: 'assets/highlights/splitFiction.jpg', embedUrl: '' },
        { thumbnail: 'assets/highlights/grBreakpoint.jpg', embedUrl: '' },
        { thumbnail: 'assets/highlights/fc25.jpg', embedUrl: '' },
        { thumbnail: 'assets/highlights/r6.jpg', embedUrl: '' },
        { thumbnail: 'assets/highlights/ufc5.jpg', embedUrl: '' },
        { thumbnail: 'assets/highlights/bleach.jpg', embedUrl: '' }
    ];

    selectedVideo: string | null = null;
}
