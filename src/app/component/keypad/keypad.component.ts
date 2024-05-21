import {AfterContentInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {RowSignal} from './row/row.component';

@Component({
    selector: 'app-keypad',
    templateUrl: './keypad.component.html'
})
export class KeypadComponent implements OnInit {

    @Input() matchs: BehaviorSubject<string[][]>;
    @Input() selectedMatchs: BehaviorSubject<string[]>;
    public signal: string[];

    constructor() {
    }

    ngOnInit(): void {
        this.signal = this.selectedMatchs.value;
        this.emitSignal();
    }
    
    public onChange(event: RowSignal): void {
        this.signal[event.index] = event.value;
        this.emitSignal();
    }

    private emitSignal(): void {
        this.selectedMatchs.next(this.signal);
    }

}
