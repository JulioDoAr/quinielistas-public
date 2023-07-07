import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ScrutinizerService {
    constructor() {
    }

    public scrutinize(selectedCol: string[], columns: string[]): number[] {
        if (columns === undefined) {
            return [0, 0, 0, 0, 0];
        }

        const successes: number[] = new Array(columns[0].length + 1).fill(0);

        if (selectedCol !== undefined && columns !== undefined) {
            columns.forEach((col) => {
                let hits = 0;

                // ÑAPA: To show the column 15 only as informative
                let scrutinizeLimit: number = col.length;
                if (scrutinizeLimit > 8)
                    scrutinizeLimit = 14;

                for (let i = 0; i < scrutinizeLimit; i++) {
                    if (col[i] === selectedCol[i] || selectedCol[i] === '0') {
                        hits++;
                    }
                }
                successes[hits]++;
            });
        }

        return successes;
    }

    /**
     * Calculate the percents of the teams
     * @param arrayLenght Number of matches
     * @param columns All the columns to scrutinize
     * @param matchs The matrix of presentation. Number, Team, X, Team
     */
    public calculatePercents(arrayLenght: number, columns: string[], matchs: string[][]): void {
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
        matchs.forEach((team, matchIndex) => {
            team.forEach((game, teamIndex) => {
                if (!Number.isNaN(total[matchIndex][teamIndex]))
                    matchs[matchIndex][teamIndex + 1] += " (" + total[matchIndex][teamIndex] + "%)";
            })
        })
    }
}
