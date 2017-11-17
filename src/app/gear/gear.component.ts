import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-gear',
  templateUrl: './gear.component.html',
  styleUrls: ['./gear.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GearComponent implements OnInit {

  gears: Array<string> = [];
  selectedGear;
  @Output('OnGearChange') OnGearChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    for (let i = 0; i <= 6; i++) {
      this.gears.push('gear' + i);
    }
    this.selectedGear = this.gears[1];
    this.OnGearChange.emit(this.selectedGear);
  }

  gearChange(gear: string) {
    console.log('gear', gear);
    this.OnGearChange.emit(gear);
  }

}
