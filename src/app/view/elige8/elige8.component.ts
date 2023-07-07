import {Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PersistanceService} from 'src/app/service/persistance.service';
import {ResourcesService} from 'src/app/service/resources.service';
import {ScrutinizerService} from '../../service/scrutinizer.service';

@Component({
    selector: 'app-elige8',
    templateUrl: './elige8.component.html',
    styleUrls: ['./elige8.component.css'],
})
export class Elige8Component {
    public selectedMatchs: BehaviorSubject<string[]>;
    public matchs: string[][];
    public columns: string[];

    constructor(private resourcesService: ResourcesService, persistanceService: PersistanceService,
                private scrutinizerService: ScrutinizerService) {
        this.selectedMatchs = persistanceService.selectedMatchs_8;
    }

    ngOnInit() {
        this.resourcesService.getColumns8().subscribe(columns => {
            this.columns = columns
            this.resourcesService.getMatchs8().subscribe(matchs => {
                this.matchs = matchs;
                this.scrutinizerService.calculatePercents(8, this.columns, this.matchs);
            });
        });
    }
}
