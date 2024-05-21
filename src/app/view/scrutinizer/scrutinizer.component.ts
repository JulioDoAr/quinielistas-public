import { Component, OnInit } from '@angular/core';
import { PersistanceService } from 'src/app/service/persistance.service';
import { ResourcesService } from 'src/app/service/resources.service';
import { ScrutinizerService } from "../../service/scrutinizer.service";
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { take } from 'rxjs';

@Component({
  selector: 'app-scrutinizer',
  templateUrl: './scrutinizer.component.html',
  styleUrls: ['./scrutinizer.component.css'],
})
export class ScrutinizerComponent implements OnInit {

  public loading: boolean = true
  public buttonNames: string[][] = [];

  public selectedMatchs: string[] = [];
  public matchs: string[][] = [];
  public columns: string[] = [];

  public hits: number[] = [];

  constructor(
    private resourcesService: ResourcesService,
    private persistanceService: PersistanceService,
    private scrutinizerService: ScrutinizerService) {
  }

  ngOnInit() {
    this.hits = Array(5).fill(0)

    this.resourcesService.columns.subscribe(columns => {
      this.columns = columns;
      this.updateButtonNames()
      this.updateHits()
    });

    this.resourcesService.matchs.subscribe(matchs => {
      this.matchs = matchs;
      this.updateButtonNames()
      this.updateHits()
    });

    this.persistanceService.selectedMatchs_15.pipe(take(1)).subscribe(data => {
      this.selectedMatchs = data
      this.updateHits()
    });

    this.resourcesService.getColumns()
    this.resourcesService.getMatchs()
  }

  private updateHits(): void {
    this.hits = this.scrutinizerService.scrutinize(this.selectedMatchs, this.columns)
  }

  private updateButtonNames(): void {
    var newButtonNames = this.scrutinizerService.calculatePercents(14, this.columns, this.matchs);
    if (newButtonNames.length > 0) {
      this.buttonNames = newButtonNames
      this.loading = false
    }
  }

  //
  // Manage Input
  //
  public onChange(event: MatButtonToggleChange, i) {
    const toggle: MatButtonToggle = event.source;
    const group: MatButtonToggleGroup = toggle.buttonToggleGroup;

    var selectedVal: string = event.value[event.value.length - 1];

    if (selectedVal == undefined) {
      group.writeValue(['0'])
      this.selectedMatchs[i] = '0'
    } else {
      group.writeValue([selectedVal])
      this.selectedMatchs[i] = selectedVal
    }

    this.updateHits()
    this.persistanceService.selectedMatchs_15.next(this.selectedMatchs);
  }
}
