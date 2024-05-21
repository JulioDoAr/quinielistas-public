import { Injectable } from '@angular/core';
import { ScrutinizerService } from './scrutinizer.service';

@Injectable({
  providedIn: 'root'
})
export class ColumnOrderService {

  constructor(
    private scrutinizerService: ScrutinizerService
  ) { }

  /**
   * Split array and swap values
   *
   * @param {Array<number>} array
   * @param {number} [left=0]
   * @param {number} [right=array.length - 1]
   * @returns {number}
   */
  private partition(hits: number[], columns: string[], left: number = 0, right: number = hits.length - 1) {
    const pivot = hits[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;

    while (i <= j) {
      while (hits[i] > pivot) {
        i++;
      }

      while (hits[j] < pivot) {
        j--;
      }

      if (i <= j) {
        [hits[i], hits[j]] = [hits[j], hits[i]];
        [columns[i], columns[j]] = [columns[j], columns[i]];
        i++;
        j--;
      }
    }
    return i;
  }

  /**
 * Quicksort implementation
 *
 * @param {Array<number>} array
 * @param {number} [left=0]
 * @param {number} [right=array.length - 1]
 * @returns {Array<number>}
 */
  public quickSort(hits: number[], columns: string[], left: number = 0, right: number = hits.length - 1): string[] {
    let index;

    if (hits.length > 1) {
      index = this.partition(hits, columns, left, right);

      if (left < index - 1) {
        this.quickSort(hits, columns, left, index - 1);
      }

      if (index < right) {
        this.quickSort(hits, columns, index, right);
      }
    }
    return columns;
  }

  /**
   * Sort the colums by hits number in descendant order
   * @param hits Number of hits of each column
   * @param columns Columns to be sorted
   * @returns The array columns sorted
   */
  public bubleSort(selectedMatchs: string[], columns: string[]): string[] {

    const hits = this.scrutinizerService.calculateHits(selectedMatchs, columns)

    let swapped: boolean;

    for (let i = 0; i < hits.length - 1; i++) {
      swapped = false;
      for (let j = 0; j < hits.length - i - 1; j++) {
        if (hits[j] < hits[j + 1]) {
          swapped = true;
          [hits[j], hits[j + 1]] = [hits[j + 1], hits[j]];
          [columns[j], columns[j + 1]] = [columns[j + 1], columns[j]];
        }
      }
      if (swapped === false) {
        break;
      }
    }

    return columns;
  }
}
