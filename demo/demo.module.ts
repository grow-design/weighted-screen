import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, XHRBackend, RequestOptions,
    BrowserXhr, BaseRequestOptions, ResponseOptions,
    BaseResponseOptions, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';

import { Demo } from './demo.component';
import { DemoConfiguration } from './demo.configuration';
import { WeightedScreenModule } from '../index';
import { Configuration } from '../src/util/configuration';

const HTTP_PROVIDERS: Array<any> = [
    {
        provide: Http,
        useFactory:
            (xhrBackend: XHRBackend, requestOptions: RequestOptions)
                : Http => new Http(xhrBackend, requestOptions),
                    deps: [XHRBackend, RequestOptions]
    },
    BrowserXhr,
    {
        provide: RequestOptions, useClass: BaseRequestOptions
    },
    {
        provide: ResponseOptions, useClass: BaseResponseOptions
    },
    XHRBackend,
    {
        provide: XSRFStrategy, useFactory: () => new CookieXSRFStrategy()
    }
];

@NgModule({
    declarations: [Demo],
    imports: [BrowserModule, WeightedScreenModule],
    bootstrap: [Demo],
    providers: [
        HTTP_PROVIDERS,
        {
            provide: Configuration, useFactory: () => new DemoConfiguration()
        }
    ]
})

export class DemoModule {}