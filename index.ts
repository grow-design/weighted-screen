import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Configuration } from './src/util/configuration';
import { WeightedScreenComponent } from './src/weighted-screen.component';
import { WeightedScreenService } from './src/weighted-screen.service';

export * from './src/util/configuration';
export * from './src/weighted-screen.component';
export * from './src/weighted-screen.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        WeightedScreenComponent
    ],
    exports: [
        WeightedScreenComponent
    ]
})

export class WeightedScreenModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: WeightedScreenModule,
            providers: [
                Configuration,
                WeightedScreenService
            ]
        };
    }
}
