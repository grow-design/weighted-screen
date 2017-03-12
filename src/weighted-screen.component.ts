import { Component, ElementRef, Input, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Node } from './node.model';
import { WeightedScreenService } from './weighted-screen.service';
import { Configuration } from './util/configuration';

import { d3 } from 'd3';
import { shuffle } from 'shuffle-array';

@Component({
    selector: 'weighted-screen',
    template: `
        <div id='erd'></div>
    `,
    styles: [
    `
        :host {
            position: relative;
            height: 100%;
        }

        :host #erd {
            min-height: 100vh;
        }
    `
    ],
    encapsulation: ViewEncapsulation.Emulated
})

export class WeightedScreenComponent implements OnInit {
    @Input() nodesNumber: number = 10;
    nodesRoot: Object;
    projectTitle: string = 'weighted screen';
    @Input() shuffle: boolean = true;
    @Input() handicap: number = 10;
    resizeSubscription: any;
    @Input() configuration: Configuration;

    constructor(
        private element: ElementRef,
        private weightedScreenService: WeightedScreenService,
        private zone: NgZone
    ) {}

    getNodes(): void {
        this.weightedScreenService.getNodesByViews(this.nodesNumber)
        .subscribe(
            (data: Array<Node>) => {
                if (this.shuffle) {
                    shuffle(data);
                }

                this.nodesRoot = {
                    'children': data
                };

                this.update();
            }
        );
    }

    ngOnInit(): void {
        this.getNodes();
    }

    ngAfterViewInit(): void {
        this.bindResizeEvents();
    }

    update(): void {
        let colors: any = d3.scales.scaleOrdinal()
        .range(
            d3.scales.schemeCategory10.map(
                (c: any) => {
                    c = d3.color.rgb(c); c.opacity = 0.6; return c;
                }
            )
        );

        let root: any = d3.hierarchy.hierarchy(this.nodesRoot);

        root.sum(
            function(d: any): any {
                return d.views;
            }
        );

        let sizes: any = this.getParentSizes();

        let treemap: any = d3.hierarchy.treemap()
        .size(
            [sizes.width, sizes.height]
        )
        .padding(2);

        treemap(root);

        let node: any = d3.select('#erd').html('');

        node.selectAll('.node')
            .data(root.leaves())
            .enter()
        .append('div')
            .attr('class', 'node')
            .attr('title',
                function(d: any): any {
                    return d.id;
                })
            .style('left',
                function(d: any): any {
                    return d.x0 + 'px';
                })
            .style('top',
                function(d: any): any {
                    return d.y0 + 'px';
                })
            .style('width',
                function(d: any): any {
                    return d.x1 - d.x0 + 'px';
                })
            .style('height',
                function(d: any): any {
                    return d.y1 - d.y0 + 'px';
                })
            .style('line-height',
                function(d: any): any {
                    return d.y1 - d.y0 + 'px';
                })
            .style('text-align', 'center')
            .style('background',
                function(d: any, i: any): any {
                    return colors(i);
                })
        .append('div')
            .attr('class', 'node-label')
            .style('height',
                function(d: any): any {
                    return d.y1 - d.y0 + 'px';
                })
            .style('width',
                function(d: any): any {
                    return d.x1 - d.x0 + 'px';
                })
            .style('line-height', 'inherit')
        .append('a')
            .attr(
                'href',
                function(d: any): any {
                    return d.data.url;
                }
            )
            .text(
                function(d: any): any {
                    return d.data.name;
                }
            );

        d3.selectAll('.node')
            .on(
                'mouseover',
                function(): any {
                    d3.select(this).style('box-shadow', '3px 0px 30px #fff');
                }
            );

        d3.selectAll('.node')
            .on(
                'mouseout',
                function(): any {
                    d3.select(this).style('box-shadow', 'none');
                }
            );
    }

    getParentSizes(): any {
        let height: number = 0;
        let width: number = 0;

        let hostElement: any = this.element.nativeElement;

        if (hostElement.parentNode != null) {
            height = hostElement.parentNode.clientHeight;
            width = hostElement.parentNode.clientWidth;
        }

        return {
            height: height - this.handicap,
            width: width
        };
    }

    protected bindResizeEvents(): void {
        this.bindResizeEvent();
    }

    private bindResizeEvent(): void {
        this.zone.runOutsideAngular(
            () => {
                let source: any = Observable.fromEvent(window, 'resize', null, null);
                let subscription: any = source.debounceTime(100).subscribe(
                    () => {
                        this.zone.run(
                            () => {
                                this.update();
                            }
                        );
                    }
                );

                this.zone.run(
                    () => {
                        this.resizeSubscription = subscription;
                    }
                );
            }
        );
    }
}
