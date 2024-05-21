import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ScrutinizerService {
    constructor() {
    }

    public scrutinize(selectedCol: string[], columns: string[]): number[] {
        if (columns.length < 1) {
            return [0, 0, 0, 0, 0];
        }

        const successes: number[] = new Array(columns[0].length + 1).fill(0);

        columns.forEach((col) => {
            let hits = 0;

            for (let i = 0; i < col.length; i++)
                if (col[i] === selectedCol[i] || selectedCol[i] === '0') {
                    hits++;
                }

            successes[hits]++;
        });

        return successes.reverse().slice(0, 5);
    }

    /**
     * Calculate the percents of the teams
     * @param arrayLenght Number of matches
     * @param columns All the columns to scrutinize
     * @param matchs The matrix of presentation. Number, Team, X, Team
     */
    public calculatePercents(arrayLenght: number, columns: string[], matchs: string[][]): string[][] {
        if (!columns || !matchs)
            return [];

        var buttonNames: string[][] = this.cloneStringArray(matchs);

        // Initialization of the matrix with 0's
        const total: number[][] = new Array<Array<number>>(arrayLenght).fill([])
            .map(() => new Array<number>(3).fill(0));

        const totalMatchs = columns.length;

        // Calculate the number of hits for each team
        columns.forEach((match, matchsIndex) => {
            for (let i = 0; i < match.length; i++) {
                switch (match[i]) {
                    case '1':
                        total[i][0]++;
                        break;
                    case 'X':
                        total[i][1]++;
                        break;
                    case '2':
                        total[i][2]++;
                        break;
                }
            }
        })

        // Calculate the percent
        total.forEach(item => {
            for (let j = 0; j < item.length; j++) {
                item[j] = Math.round((item[j] / totalMatchs) * 100);
            }
        });

        // Append the percent to the text of the match
        matchs.forEach((game, gameIndex) => {
            for (let teamIndex = 0; teamIndex < game.length - 1; teamIndex++) {
                let percent: number = total[gameIndex][teamIndex];
                if (!Number.isNaN(percent))
                    buttonNames[gameIndex][teamIndex + 1] = matchs[gameIndex][teamIndex + 1] + " (" + percent + "%)";
            }
        })

        return buttonNames;
    }

    public cloneStringArray(originalArray: string[][]): string[][] {
        const newArray: string[][] = [];

        for (let i = 0; i < originalArray.length; i++) {
            const innerArray: string[] = [];
            for (let j = 0; j < originalArray[i].length; j++) {
                innerArray.push(originalArray[i][j]);
            }
            newArray.push(innerArray);
        }

        return newArray;
    }

    public calculateHits(result: string[], columns: string[]): number[] {
        if (!columns)
            return [];
        if (columns.length == 0)
            return [];

        let hits = new Array(columns.length).fill(0);

        if (!result)
            return hits;

        for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
            for (let i = 0; i < result.length; i++) {
                if (columns[columnIndex][i] == result[i] || result[i] === '0') {
                    hits[columnIndex]++;
                }
            }
        }

        return hits;
    }
}
