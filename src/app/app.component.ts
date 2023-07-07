import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    selectedCol: string;

    public setSelectedCol(selectedCol: string): void {
        this.selectedCol = selectedCol;
    }
}
