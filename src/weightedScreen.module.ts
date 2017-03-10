import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeightedScreen} from './weightedscreen.component';
import { WeightedScreenService } from './weightedscreen.service';

@NgModule({
  declarations: [
    WeightedScreen
  ],
  imports: [CommonModule],
  exports: [WeightedScreen],
  providers: [
      WeightedScreenService
    ]
})

export class WeightedScreenModule {}