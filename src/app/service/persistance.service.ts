import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PersistanceService {

    public selectedMatchs_15: BehaviorSubject<string[]>;
    public selectedMatchs_8: BehaviorSubject<string[]>;

    constructor() {
        this.selectedMatchs_15 = new BehaviorSubject(new Array(14).fill("0"));
        this.selectedMatchs_8 = new BehaviorSubject(new Array(8).fill("0"));
    }

}
