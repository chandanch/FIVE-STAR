import {Component, OnInit, ViewChild} from '@angular/core';
import {EngineComponent} from './engine/engine.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  myForm: FormGroup;
  isValidCardinal = true;

  constructor(private fb: FormBuilder) {
    // this.myForm = fb.group()
    this.myForm = this.fb.group({
      coordinates: [null, Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

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

  submit(value) {
    console.log(value);
    // console.log(this.checkValidity(value.coordinates));
    if (!this.checkValidity(value.coordinates)) {
      this.isValidCardinal = false;
    } else {
      this.isValidCardinal = true;
    }
  }

  checkValidity(cardinalCoordinates: string): boolean {
    console.log('dd', cardinalCoordinates);
    const regex = /[NE]{2}[0-9]{2}.[0-9]{2}\/-?[0-9]{2}.[0-9]{2,},\s[SW]{2}[0-9]{2}.[0-9]{2}\/-?[0-9]{2,3}.[0-9]{2,}/g;
     return regex.test(cardinalCoordinates);
  }
}
