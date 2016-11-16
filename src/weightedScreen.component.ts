import { Component, ElementRef, Input, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from "rxjs";
import d3 from './d3';
import shuffle from './shuffle-array';
import { WeightedScreenService } from './weighted-screen.service';

@Component({
    selector: 'weighted-screen',
    template: `
        <div id="erd"></div>
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

export class WeightedScreen implements OnInit {
    @Input() nodesNumber: number = 10;
    nodesRoot: Object;
    projectTitle: string = 'weighted screen';
    @Input() shuffle: boolean = true;
    @Input() handicap: number = 10;
    resizeSubscription: any;

    constructor(
        private element: ElementRef,
        private weightedScreenService: WeightedScreenService,
        private zone: NgZone
    ) {}

    getNodes(): void {
        this.weightedScreenService.getNodesByViews(this.nodesNumber)
        .then(
            nodes => {
                if (this.shuffle) {
                    shuffle.shuffle(nodes);
                }

                let rootNodes = {
                    "children": nodes
                };

                this.nodesRoot = rootNodes ;

                this.update();
            }
        )
    }

    ngOnInit(): void {
            this.getNodes();
    }

    ngAfterViewInit(): void {
            this.bindResizeEvents();
    }

    update() {
        let colors = d3.scales.scaleOrdinal()
        .range(
            d3.scales.schemeCategory10.map(
                function(c) {
                    c = d3.color.rgb(c); c.opacity = 0.6; return c;
                }
            )
        );

        let root = d3.hierarchy.hierarchy(this.nodesRoot);
    
        root.sum(
            function(d) {
                return d.views
            }
        );

        let sizes = this.getParentSizes();

        let treemap = d3.hierarchy.treemap()
        .size(
            [sizes.width, sizes.height]
        )
        .padding(2);

        treemap(root);

        let node = d3.select("#erd").html("");

        node.selectAll(".node")
            .data(root.leaves())
            .enter()
        .append("div")
            .attr("class", "node")
            .attr("title",
                function(d) {
                    return d.id;
                })
            .style("left",
                function(d) {
                    return d.x0 + "px";
                })
            .style("top",
                function(d) {
                    return d.y0 + "px";
                })
            .style("width",
                function(d) {
                    return d.x1 - d.x0 + "px";
                })
            .style("height",
                function(d) {
                    return d.y1 - d.y0 + "px";
                })
            .style("line-height",
                function(d) {
                    return d.y1 - d.y0 + "px";
                })
            .style("text-align", "center")
            .style("background",
                function(d, i) { 
                    return colors(i); 
                })
        .append("div")
            .attr("class", "node-label")
            .style("height",
                function(d) {
                    return d.y1 - d.y0 + "px";
                })
            .style("width",
                function(d) {
                    return d.x1 - d.x0 + "px";
                })
            .style("line-height", "inherit")
        .append('a')
            .attr("href", function(d){return d.data.url;})
            .text(
                function(d) { 
                    return d.data.name;
                }
            )

        d3.selectAll('.node').on('mouseover',function() {
            d3.select(this).style('box-shadow','3px 0px 30px #fff');
        });

        d3.selectAll('.node').on('mouseout',function() {
            d3.select(this).style('box-shadow','none');
        });
    }

    getParentSizes() {
        let height = 0;
        let width = 0;

        let hostElement = this.element.nativeElement;

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

    private bindResizeEvent() {
        this.zone.runOutsideAngular(
            () => {
                let source = Observable.fromEvent(window, 'resize', null, null);
                let subscription = source.debounceTime(100).subscribe(
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
