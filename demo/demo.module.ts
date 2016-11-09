import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {WeightedScreenModule} from '../src';
import {Demo} from './demo.component';

@NgModule({
  declarations: [Demo],
  imports: [BrowserModule, WeightedScreenModule],
  bootstrap: [Demo],
  providers: []
})
export class DemoModule {}