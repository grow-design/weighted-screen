import { Injectable } from '@angular/core';
import { Node } from './node.model';
import { NODES } from './mock-nodes';

@Injectable()
export class WeightedScreenService {
    getNodesByViews(x: number): Promise<Node[]> {
        return Promise.resolve(
           NODES.sort((a, b) => {
                if (a.views > b.views) {
                    return 1;
                }
                if (a.views < b.views) {
                    return -1;
                }
               
                return 0;
            }).slice(0, x)
        );
    }
}