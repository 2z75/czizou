import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-project-card',
    imports: [CommonModule],
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {

    @Input() title!: string;
    @Input() description!: string;
    @Input() image!: string;
    @Input() background!: string;
    @Input() technos!: string[];
    @Input() fontClass!: string;
    @Input() textColor!: string;


ngOnInit() {
    console.log('Font', this.fontClass)
    console.log('Color', this.textColor)
}

}
