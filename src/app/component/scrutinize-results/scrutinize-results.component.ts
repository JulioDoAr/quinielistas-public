import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-scrutinize-results',
    templateUrl: './scrutinize-results.component.html',
    styles: []
})
export class ScrutinizeResultsComponent {

    @Input() hits: number[];
    @Input() maxHits: number;
}
