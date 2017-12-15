import { Meta } from './model/meta';
import {Component, OnInit, ViewChild} from '@angular/core';
import {EngineComponent} from './engine/engine.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AfterViewInit } from '@angular/core';

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
  showsuccess = false;
  invalidCardinals: Array<string> = [];
  inputCoordinates: Array<string>;
  meta: Meta;
  names: string[];
  names2;
  highLightColor = 'green';
  showDiv = false;
  todaysDate = new Date();
  birthDay = new Date(1989, 12, 23);

  constructor(private fb: FormBuilder) {
    // this.myForm = fb.group()
    this.myForm = this.fb.group({
      coordinates: [null, Validators.compose([Validators.required, Validators.minLength(4)])]
    });
    this.meta = {
      name: '',
      description: '',
      id: 0,
    }
    this.names = ['e', 'e'];
    this.names2 = this.names;
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
      {
        value: 'NE45.06/-70.31, SW38.03/-76.73'
      },
      {
        value: 'NE47.61/-66.62, SW43.55/-70.31'
      },
      {
        value: 'NE21.96/-154.54, SW18.66/158.54'
      },
    );
    this.meta.name = 'chan';
    this.meta.description = 'dd';
    console.log(this.meta);

     const editable = (<HTMLDivElement>document.getElementById('editable'));
    // editable.textContent = "Enter Coordinates";
     editable.classList.add('editable-content');

     setTimeout(() => {
       this.showDiv = true;
     }, 10000);
  }

  onGearChange(gear: string) {
    console.log('Event gear change', gear);
    this.engine.setGearStatus(gear);
  }

  submit(value) {
    console.log(value);
    // reset the invalid
    this.invalidCardinals.length = 0;
    // reset valid and invalid flags
    this.showsuccess = false;
    this.isValidCardinal = true;
    // split the cardinal coordinates by newline
    const coordinates = value.coordinates.split('\n');
    // iterate through the coordinates to check the validity
    [].forEach.call(coordinates, (coordinate) => {
      // if invalid add to `invalidCardinals` array
      if (!this.checkValidity(coordinate)) {
        this.invalidCardinals.push(coordinate);
      }
    });
    this.showValidityMessage();
  }

  /**
   * @desc show appropriate validity message
   */
  showValidityMessage() {
    if (this.invalidCardinals.length > 0) {
      this.isValidCardinal = false;
    } else {
      this.isValidCardinal = true;
      this.showsuccess = true;
    }
  }

  checkValidity(cardinalCoordinates: string): boolean {
    cardinalCoordinates = cardinalCoordinates.replace(/\s/, '');
    console.log('dd', cardinalCoordinates);
    const regex = /[NE]{2}[0-9]{2}.[0-9]{2}\/-?[0-9]{2}.[0-9]{2,},\s?[SW]{2}[0-9]{2}.[0-9]{2}\/-?[0-9]{2,3}.[0-9]{2,}/g;
     return regex.test(cardinalCoordinates);
  }

  submitData() {
    const editable = (<HTMLDivElement>document.getElementById('editable'));
    this.inputCoordinates = editable.outerText.split('\n');
    this.inputCoordinates = this.cleanupInput(this.inputCoordinates);
    console.log(this.inputCoordinates);
    editable.textContent = '';
    // iterate through the input coordinates
    [].forEach.call(this.inputCoordinates, (inputcoordinate) => {
      // check the validity of each coordinates
      if (this.checkValidity(inputcoordinate)) {
        // if valid
        this.markValidCoordinates(inputcoordinate);
      } else {
        // if invalid
       this.markInvalidCoordinates(inputcoordinate);
      }
    });
  }

  /**
   * @desc 1.get the editable container
   * 2.create a span node 3. add color to span text
   * 3. create a line break node
   * 4. append the span node and line break(so that new nodes are added in new line)
   * @param inputcoordinate
   */
  markValidCoordinates(inputcoordinate) {
    const editable = (<HTMLDivElement>document.getElementById('editable'));
    const span = document.createElement('span');
    // text color color for valid coordinates
    span.style.color = 'green';
    const text = document.createTextNode(inputcoordinate);
    span.appendChild(text);
    const br = document.createElement('br');

    editable.appendChild(span);
    editable.appendChild(br);
  }

  /**
   * @desc 1.get the editable container
   * 2.create a span node 3. add color to span text
   * 3. create a line break node
   * 4. append the span node and line break(so that new nodes are added in new line)
   * @param inputcoordinate
   */
  markInvalidCoordinates(inputcoordinate) {
    const editable = (<HTMLDivElement>document.getElementById('editable'));
    const span = document.createElement('span');
    const br = document.createElement('br');
    // text color red for invalid coordinates
    span.style.color = 'red';
    const text = document.createTextNode(inputcoordinate);
    span.appendChild(text);

    editable.appendChild(span);
    editable.appendChild(br);

  }

  /**
   * @desc clear all empty inputs and redundant new line
   * @param inputCoordinates
   */
  cleanupInput(inputCoordinates: Array<string>) {
    for (let i = 0; i < inputCoordinates.length; i++) {
      if (inputCoordinates[i] === '') {
        inputCoordinates.splice(i, 1);
      }
    }
    return inputCoordinates;
  }

  pasteText(e) {
    // text.stopPropagation();
     let pastedText;

    if ((<any>window).clipboardData && (<any>window).clipboardData.getData) { // IE
      pastedText = (<any>window).clipboardData.getData('Text');
    } else if (e.clipboardData && e.clipboardData.getData) {
      pastedText = e.clipboardData.getData('text/plain');
    }
    const editable = (<HTMLDivElement>document.getElementById('editable'));
    console.log(editable.outerText);
    // // editable.innerHTML = editable.outerText+pastedText;
    // return false;
    this.removeHtml();
  }

  removeHtml() {
    const ediv = (<HTMLDivElement>document.getElementById('editable'));
    setTimeout(function () {
      const text1 = ediv.innerText.replace(/\n/g, '');
      // console.log(text1);
      const text2 = ediv.innerHTML.replace(/<br>/g, '');
      // console.log(text2);

      if (text1 !== text2) {
        ediv.innerText = ediv.innerText;
      }
    }, 1);
  }

  addCar(car: string) {
    console.log(car);
  }
}
