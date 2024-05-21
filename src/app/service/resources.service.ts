import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ResourcesService {

    public matchs: BehaviorSubject<string[][]>
    public matchs8: BehaviorSubject<string[][]>
    public columns: BehaviorSubject<string[]>
    public columns8: BehaviorSubject<string[]>

    constructor(private httpClient: HttpClient) {
        this.matchs = new BehaviorSubject([])
        this.matchs8 = new BehaviorSubject([])
        this.columns = new BehaviorSubject([])
        this.columns8 = new BehaviorSubject([])
    }

    public getMatchs(): void {
        if (this.matchs.value.length > 0)
            return

        this.httpClient
            .get(environment.path.matchs.url, { responseType: 'text' })
            .pipe(
                map((matchsString) => {
                    const validData: string[][] = [];
                    const matchs: string[] = matchsString.split(
                        new RegExp(environment.path.matchs.separator.row, 'g')
                    );
                    matchs.forEach((match) => {
                        match = match.trim();
                        if (match.length !== 0) {
                            const aux: string[] = match.split(
                                environment.path.matchs.separator.team
                            );
                            validData.push(aux);
                        }
                    });
                    return validData;
                })
            ).subscribe(data => this.matchs.next(data));
    }

    public getMatchs8(): void {
        if (this.matchs8.value.length > 0)
            return

        this.httpClient
            .get(environment.path.matchs.url8, { responseType: 'text' })
            .pipe(
                map((matchsString) => {
                    const validData: string[][] = [];
                    const matchs: string[] = matchsString.split(
                        new RegExp(environment.path.matchs.separator.row, 'g')
                    );
                    matchs.forEach((match) => {
                        match = match.trim();
                        if (match.length !== 0) {
                            const aux: string[] = match.split(
                                environment.path.matchs.separator.team
                            );
                            validData.push(aux);
                        }
                    });
                    return validData;
                })
            ).subscribe(data => this.matchs8.next(data));;
    }

    public getColumns(): void {
        if (this.columns.value.length > 0)
            return

        this.httpClient
            .get(environment.path.columns.url, { responseType: 'text' })
            .pipe(
                map((rawColumns) => {
                    const validData: string[] = [];
                    const splittedColumns: string[] = rawColumns.split(
                        new RegExp(environment.path.columns.separator, 'g')
                    );
                    splittedColumns.forEach((column) => {
                        column = column.trim();
                        if (column.length > 0) {
                            validData.push(column);
                        }
                    });

                    return validData;
                })
            ).subscribe(data => this.columns.next(data));;
    }

    public getColumns8(): void {
        if (this.columns8.value.length > 0)
            return

        this.httpClient
            .get(environment.path.columns.url8, { responseType: 'text' })
            .pipe(
                map((rawColumns) => {
                    const validData: string[] = [];
                    const splittedColumns: string[] = rawColumns.split(
                        new RegExp(environment.path.columns.separator, 'g')
                    );
                    splittedColumns.forEach((column) => {
                        column = column.trim();
                        if (column.length > 0) {
                            validData.push(column);
                        }
                    });

                    return validData;
                })
            ).subscribe(data => this.columns8.next(data));;
    }
}
