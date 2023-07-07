import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ResourcesService {
    constructor(private httpClient: HttpClient) {
    }

    public getMatchs(): Observable<string[][]> {
        return this.httpClient
            .get(environment.path.matchs.url, {responseType: 'text'})
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
            );
    }

    public getMatchs8(): Observable<string[][]> {
        return this.httpClient
            .get(environment.path.matchs.url8, {responseType: 'text'})
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
            );
    }

    public getColumns(): Observable<string[]> {
        return this.httpClient
            .get(environment.path.columns.url, {responseType: 'text'})
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
            );
    }

    public getColumns8(): Observable<string[]> {
        return this.httpClient
            .get(environment.path.columns.url8, {responseType: 'text'})
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
            );
    }
}
