import {Component, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EngineComponent implements OnInit, OnChanges {

  gearStatus: string;
  gearObservable;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['gearStatus']) {
      console.log('Triggering gear change', this.gearStatus);
    }
  }

  checkGear() {
    console.log('Gear status', this.gearStatus);
  }

  public setGearStatus(status) {
    this.gearStatus = status;
    console.log('setting status', this.gearStatus);

  }

}
