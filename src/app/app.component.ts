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

  ngOnInit() {
    console.log('Root component init');
  }

  onGearChange(gear: string) {
    console.log('Event gear change', gear);
    this.engine.setGearStatus(gear);
  }
}
