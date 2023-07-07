import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {RowSignal} from './row/row.component';

@Component({
    selector: 'app-keypad',
    templateUrl: './keypad.component.html'
})
export class KeypadComponent implements OnInit, AfterContentInit {

    @Input() matchs: string[][];
    @Input() selectedMatchs: BehaviorSubject<string[]>;
    public signal: string[];

    constructor() {
    }

    ngOnInit(): void {
        this.selectedMatchs.subscribe(data => this.signal = data);
    }

    ngAfterContentInit() {
        // this.emitSignal();
    }

    public onChange(event: RowSignal): void {
        this.signal[event.index] = event.value;
        this.emitSignal();
    }

    private emitSignal(): void {
        this.selectedMatchs.next(this.signal);
    }

}
