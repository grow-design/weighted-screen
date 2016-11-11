import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HelloWorld} from './weightedScreen.component';

@NgModule({
  declarations: [
    HelloWorld
  ],
  imports: [CommonModule],
  exports: [HelloWorld]
})
export class WeightedScreenModule {}