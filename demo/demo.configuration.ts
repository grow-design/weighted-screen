import { Injectable } from '@angular/core';
import { Configuration } from '../src/util/configuration';

@Injectable()
export class DemoConfiguration extends Configuration {
    constructor() {
       super('', '/mock/mock.node.json');
    }
}