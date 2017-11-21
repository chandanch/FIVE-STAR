import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GearComponent } from './gear/gear.component';
import { EngineComponent } from './engine/engine.component';
import {FormsModule} from "@angular/forms";
import { BolderPipe } from './bolder.pipe';


@NgModule({
  declarations: [
    AppComponent,
    GearComponent,
    EngineComponent,
    BolderPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
