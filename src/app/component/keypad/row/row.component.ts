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
        this.manageInput(event);

        this.emitSignal();
    }

    private manageInput(event: MatButtonToggleChange) {
        const toggle: MatButtonToggle = event.source;
        const group: MatButtonToggleGroup = toggle.buttonToggleGroup;
    
        //this.fixButtonToggleGroup(event);
        if (event.value.length > 1)
          event.source.buttonToggleGroup.writeValue([event.value[1]]);
    
        //this.updateSelectedMatch(group.value, i);
        this.value = group.value[0] ? group.value[0] : '0';
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
