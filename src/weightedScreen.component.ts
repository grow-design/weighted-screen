import {
  Component,
  OnInit
} from '@angular/core';

import d3 from './d3';


@Component({
  selector: 'weighted-screen',
  template: `
  <div id="erd">
  </div>
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

  ngOnInit() {
    var tree = `{
        "id": 1,
        "name": "tree",
        "children": [
            { "id": 3, "name": "A Day in the Life of a Product Owner", "views": 48, "url": "https://grow.liferay.com/group/guest/learn/-/wiki/Grow/A+Day+in+the+Life+of+a+Product+Owner" },
            { "id": 4, "name": "Advanced System Architecture", "views": 21, "url": "https://grow.liferay.com/group/guest/learn/-/wiki/Grow/Advanced+System+Architecture" },
            { "id": 5, "name": "Annotations in Liferay portal", "views": 194, "url": "https://grow.liferay.com/group/guest/learn/-/wiki/Grow/Annotations+in+Liferay+portal" },
            { "id": 6, "name": "Basic cluster config", "views": 41, "url": "https://grow.liferay.com/group/guest/learn/-/wiki/Grow/Basic+cluster+config" },
            { "id": 7, "name": "Cloud DB", "views": 155, "url": "https://grow.liferay.com/group/guest/learn/-/wiki/Grow/Cloud+DB" },
            { "id": 2, "name": "Clustering Basics", "views": 47, "url": "https://grow.liferay.com/group/guest/learn/-/wiki/Grow/Clustering+Basics" },
            { "id": 8, "name": "Company Meeting Q video collection", "views": 74, "url": "https://grow.liferay.com/group/guest/learn/-/wiki/Grow/Company+Meeting+Q+video+collection" },
            { "id": 9, "name": "CS & TS workflow", "views": 77, "url": "https://grow.liferay.com/group/guest/learn/-/wiki/Grow/CS+&+TS+workflow" },
            { "id": 10, "name": "Data Dialogs 2016", "views": 185, "url": "https://grow.liferay.com/group/guest/learn/-/wiki/Grow/Data+Dialogs+2016" },
            { "id": 11, "name": "Eclipse Hot Keys", "views": 41, "url": "https://grow.liferay.com/group/guest/learn/-/wiki/Grow/Eclipse+Hot+Keys" }
        ]
    }`;

    var width = 1400,
    height = 600;

    var color = d3.scales.scaleOrdinal()
        .range(d3.scales.schemeCategory10
            .map(function(c) { c = d3.color.rgb(c); c.opacity = 0.6; return c; }));

    var root = JSON.parse( tree );

    root = d3.hierarchy.hierarchy(root);
    root.sum(function(d) { return d.views});

    var treemap = d3.hierarchy.treemap()
        .size([width, height])
        .padding(1);

    treemap(root);

    d3.select("#erd")
      .selectAll(".node")
      .data(root.leaves())
      .enter().append("div")
        .attr("class", "node")
        .attr("title", function(d) { return d.id; })
        .style("left", function(d) { return d.x0 + "px"; })
        .style("top", function(d) { return d.y0 + "px"; })
        .style("width", function(d) { return d.x1 - d.x0 + "px"; })
        .style("height", function(d) { return d.y1 - d.y0 + "px"; })
        .style("line-height", function(d) { return d.y1 - d.y0 + "px"; })
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

  }
}
