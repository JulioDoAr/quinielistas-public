import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PersistanceService} from 'src/app/service/persistance.service';
import {ResourcesService} from 'src/app/service/resources.service';
import {ScrutinizerService} from "../../service/scrutinizer.service";

@Component({
    selector: 'app-scrutinizer',
    templateUrl: './scrutinizer.component.html',
    styleUrls: ['./scrutinizer.component.css'],
})
export class ScrutinizerComponent implements OnInit {
    public selectedMatchs: BehaviorSubject<string[]>;
    public matchs: string[][];
    public columns: string[];
    public percents: number[];

    constructor(private resourcesService: ResourcesService, persistanceService: PersistanceService, private scrutinizerService: ScrutinizerService) {
        this.selectedMatchs = persistanceService.selectedMatchs_15;
    }

    ngOnInit() {

        this.resourcesService.getColumns().subscribe(columns => {
            this.columns = columns
            this.resourcesService.getMatchs().subscribe(matchs => {
                this.matchs = matchs;
                this.scrutinizerService.calculatePercents(14, this.columns, this.matchs);
            });
        });
    }
}
