import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HelloWorld} from './weightedScreen.component';
import { WeightedScreenService }   from './weighted-screen.service';

@NgModule({
  declarations: [
    HelloWorld
  ],
  imports: [CommonModule],
  exports: [HelloWorld],
  providers: [WeightedScreenService]
})
export class WeightedScreenModule {}