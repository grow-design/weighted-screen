import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Configuration {
    public serverWithApiUrl: string;

    constructor(private server: string, private apiUrl: string) {
        this.serverWithApiUrl = this.server + this.apiUrl;
    }
}