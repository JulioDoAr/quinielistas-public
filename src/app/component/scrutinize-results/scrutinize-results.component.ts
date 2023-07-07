import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ScrutinizerService} from 'src/app/service/scrutinizer.service';

@Component({
    selector: 'app-scrutinize-results',
    templateUrl: './scrutinize-results.component.html',
    styles: [],
})
export class ScrutinizeResultsComponent implements OnInit, OnChanges {

    @Input() selectedMatchs: BehaviorSubject<string[]>;
    @Input() columns: string[];

    successes: BehaviorSubject<number[]>;
    maxSuccesses: number;

    constructor(
        private scrutinizerService: ScrutinizerService
    ) {
        this.successes = new BehaviorSubject(new Array(5).fill(0));
    }

    ngOnInit() {
        this.selectedMatchs.subscribe(data => {
            this.updateSuccesses(data, this.columns)
        });

        this.maxSuccesses = this.selectedMatchs.value.length;
        if (this.maxSuccesses > 8)
            this.maxSuccesses = 14;
    }

    ngOnChanges() {
        this.updateSuccesses(this.selectedMatchs.value, this.columns);
    }

    private scrutinize(selectedCol: string[], cols: string[]): number[] {
        return this.scrutinizerService.scrutinize(selectedCol, cols)
            .reverse().splice(0, 5);
    }

    private updateSuccesses(selectedCol: string[], cols: string[]): void {
        this.successes.next(this.scrutinize(selectedCol, cols));
    }
}
