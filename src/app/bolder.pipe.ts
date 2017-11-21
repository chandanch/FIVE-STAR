import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bolder'
})
export class BolderPipe implements PipeTransform {

  private transformedValue;

  transform(value: string, args?: any): any {
    let firstCardinalValue;
    let secondCardinalValue;
    value = value.replace(' ', '');
    const coordinates = value.split(',');
    firstCardinalValue = this.boldCardinalDirection(coordinates[0]);
    secondCardinalValue = this.boldCardinalDirection(coordinates[1]);

    return `${firstCardinalValue}, ${secondCardinalValue}`;
  }

  boldCardinalDirection(cardinalValue: string): any {
    let cardinalDirection = cardinalValue.substr(0, 2);
    cardinalDirection = `<b>${cardinalDirection}</b>`;
    const cardinalCoordinates = cardinalValue.substring(2);
    return cardinalDirection + cardinalCoordinates;
  }

}
