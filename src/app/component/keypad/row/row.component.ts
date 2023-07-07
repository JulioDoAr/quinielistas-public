import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup} from '@angular/material/button-toggle';

@Component({
    selector: 'app-row',
    templateUrl: './row.component.html',
    styles: []
})
export class RowComponent implements OnInit, AfterContentInit {

    @Input() data: string[];
    @Input() value: string;
    @Input() index: number;

    @Output() change: EventEmitter<RowSignal>;
    public matButtonToggleGroup: MatButtonToggleGroup;

    constructor() {
        this.change = new EventEmitter<RowSignal>();
    }

    ngOnInit() {
        if (this.value === undefined)
            this.value = '0';
    }

    ngAfterContentInit() {
        if (this.matButtonToggleGroup !== undefined) {
            this.matButtonToggleGroup.value = this.value.split("");
        }
    }

    public onChange(event: MatButtonToggleChange) {
        try {
            const toggle: MatButtonToggle = event.source;
            const group: MatButtonToggleGroup = toggle.buttonToggleGroup;

            if (group.value.length > 1) {
                group.value = [toggle.value];
                this.value = toggle.value.toString();
            } else if (this.value === toggle.value.toString()) {
                group.value = [];
                this.value = '0';
            } else {
                group.value = [toggle.value];
                this.value = toggle.value.toString();
            }
        } catch (error) {
            this.value = '0';
        }

        this.emitSignal();
    }

    private emitSignal(): void {
        this.change.emit(new RowSignal(this.index, this.value));
    }

}

export class RowSignal {
    public index: number;
    public value: string;

    constructor(index: number, value: string) {
        this.index = index;
        this.value = value;
    }
}
