import {Component, OnInit, ViewChild} from '@angular/core';
import {EngineComponent} from './engine/engine.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(EngineComponent)
  private engine: EngineComponent;
  public hidegears = false;
  sampleText = 'hello';
  cardinalCoordinates: Array<any> = [];

  ngOnInit() {
    console.log('Root component init');
    this.cardinalCoordinates.push(
      {
        value: 'NE49.01/-93.96, SW32.73/124.72'
      },
      {
        value: 'NE32.73/-81.12, SW31.39/-114.7'
      },
      {
        value: 'NE31.89/-81.12, SW29.04/105.82'
      },
      {
        value: 'NE24.96/81.06, SW24.24/-82.34'
      },
    );
  }

  onGearChange(gear: string) {
    console.log('Event gear change', gear);
    this.engine.setGearStatus(gear);
  }
}
