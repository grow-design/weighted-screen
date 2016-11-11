import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import d3 from './d3';

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
      }
    `
  ]
})

export class HelloWorld implements OnInit {
  projectTitle: string = 'weighted screen';

  nodesRoot: Object;

  @Input() nodesNumber: number = 10;


  constructor(private weightedScreenService: WeightedScreenService) {}

  getNodes(): void {
    this.weightedScreenService.getNodesByViews(this.nodesNumber).then(
      nodes => {
        let rootNodes = {
          "children": nodes
        };

        this.nodesRoot = rootNodes;

         var width = 1400,
      height = 600;

      var color = d3.scales.scaleOrdinal()
          .range(d3.scales.schemeCategory10
              .map(function(c) { c = d3.color.rgb(c); c.opacity = 0.6; return c; }));

      var root = d3.hierarchy.hierarchy(this.nodesRoot);
  
      root.sum(function(d) { return d.views});

      var treemap = d3.hierarchy.treemap()
          .size([width, height])
          .padding(1);

      treemap(root);

      d3.select("#erd")
          .selectAll(".node")
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
            function(d) { 
              return color(d.id); 
            })
        .append("div")
          .attr("class", "node-label")
          .style("height", function(d) { return d.y1 - d.y0 + "px"; })
          .style("line-height", "inherit")
        .append('a')
          .attr("href", function(d){return d.data.url;})
          .text(
            function(d) { 
              return d.data.name;
          })
      })
  }

  ngOnInit() {
    this.getNodes();
  }
}
