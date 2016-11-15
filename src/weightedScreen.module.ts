import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeightedScreen} from './weightedScreen.component';
import { WeightedScreenService }   from './weighted-screen.service';

@NgModule({
  declarations: [
    WeightedScreen
  ],
  imports: [CommonModule],
  exports: [WeightedScreen],
  providers: [WeightedScreenService]
})
export class WeightedScreenModule {}