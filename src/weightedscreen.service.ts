import { Injectable } from '@angular/core';
import { Headers, Http, Response, XHRBackend, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Node } from './node.model';
import { Configuration } from './util/configuration';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WeightedScreenService {

    actionUrl: string;

    headers: Headers;

    constructor (private configuration: Configuration, private http: Http) {
    }

    getNodesByViews(x: number): Observable<Array<Node>> {
        return this.http.get(this.configuration.serverWithApiUrl)
            .map(
                (response: Response) => <Array<Node>>response.json()
            )
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);

        return Observable.throw(error.json().error || 'Server error');
    }
}