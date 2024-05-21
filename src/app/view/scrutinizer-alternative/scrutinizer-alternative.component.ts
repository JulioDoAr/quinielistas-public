import { Component, HostListener, OnInit } from '@angular/core';
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { take } from 'rxjs';
import { ColumnOrderService } from 'src/app/service/column-order.service';
import { PersistanceService } from 'src/app/service/persistance.service';
import { ResourcesService } from 'src/app/service/resources.service';
import { ScrutinizerService } from 'src/app/service/scrutinizer.service';

@Component({
  selector: 'app-scrutinizer-alternative',
  templateUrl: './scrutinizer-alternative.component.html',
  styleUrls: ['./scrutinizer-alternative.component.css'],
})
export class ScrutinizerAlternativeComponent implements OnInit {

  // Globals
  public selectedMatchs: string[] = [];
  public matchs: string[][] = [];
  public columns: string[] = [];
  public loading: boolean = true

  // Locals
  public numberOfColumns: number = 1;
  public hits: number[] = [];

  constructor(
    private resourcesService: ResourcesService,
    private persistanceService: PersistanceService,
    private scrutinizerService: ScrutinizerService,
    private columnOrderService: ColumnOrderService) {
  }

  ngOnInit() {
    this.hits = Array(5).fill(0)
    this.resourcesService.columns.subscribe(columns => {
      this.columns = columns;
      this.updateComponent()
    });

    this.resourcesService.matchs.subscribe(matchs => {
      this.matchs = matchs;
      this.updateComponent()
    });

    this.persistanceService.selectedMatchs_15.pipe(take(1)).subscribe(data => {
      this.selectedMatchs = data
      this.updateComponent()
    });

    this.resourcesService.getColumns()
    this.resourcesService.getMatchs()
  }

  private updateComponent() {
    this.loading = this.matchs.length == 0 || this.columns.length == 0;
    this.hits = this.scrutinizerService.scrutinize(this.selectedMatchs, this.columns)
    this.columns = this.columnOrderService.bubleSort(this.selectedMatchs, this.columns)
    this.updateNumberOfColumns()
  }

  public onChange(event: MatButtonToggleChange, i) {
    this.manageInput(event, i);
    this.updateComponent();
  }

  private manageInput(event: MatButtonToggleChange, i) {
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

    this.persistanceService.selectedMatchs_15.next(this.selectedMatchs);
    this.updateComponent();
  }

  //
  // Results showed when resizing
  //
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateNumberOfColumns();
  }

  updateNumberOfColumns(): void {
    let windowWidth = window.innerWidth;

    if (windowWidth < 300)
      windowWidth = windowWidth - 240;
    else
      windowWidth = windowWidth - 280;

    if (windowWidth > 0)
      this.numberOfColumns = Math.round(windowWidth / 15);
    else this.numberOfColumns = 1;
  }
}
