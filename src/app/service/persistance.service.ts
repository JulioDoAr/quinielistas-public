import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PersistanceService {

    private static MATCH_15_KEY: string = 'matchs_15';
    private static MATCH_8_KEY: string = 'matchs_8';
    public selectedMatchs_15: BehaviorSubject<string[]>;
    public selectedMatchs_8: BehaviorSubject<string[]>;

    constructor() {
        this.selectedMatchs_15 = this.initialize(PersistanceService.MATCH_15_KEY, 14);
        this.selectedMatchs_8 = this.initialize(PersistanceService.MATCH_8_KEY, 8);

        this.selectedMatchs_15.subscribe(value => localStorage.setItem(PersistanceService.MATCH_15_KEY, value.toString()))
        this.selectedMatchs_8.subscribe(value => localStorage.setItem(PersistanceService.MATCH_8_KEY, value.toString()))
    }

    private initialize(key: string, defaultLenght: number): BehaviorSubject<string[]> {
        let selectedMatchs = new Array(defaultLenght).fill('0');
        let values: string = localStorage.getItem(key)

        if (values) {
            let spValues = values.split(',');
            for (let i = 0; i < spValues.length; i++)
                if (spValues[i])
                    selectedMatchs[i] = spValues[i];
        }
        return new BehaviorSubject<string[]>(selectedMatchs);
    }

}
