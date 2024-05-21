import { Component, OnInit } from '@angular/core';
import { ResourcesService } from './service/resources.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    selectedCol: string;

    constructor(
    ) {
    }
    ngOnInit(): void {
    }

    public setSelectedCol(selectedCol: string): void {
        this.selectedCol = selectedCol;
    }
}
