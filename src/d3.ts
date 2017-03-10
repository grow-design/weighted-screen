/// <reference path='../node_modules/awesome-typescript-loader/lib/runtime.d.ts' />

let array: any = require('d3-array');
let brush: any = require('d3-brush');
let color: any = require('d3-color');
let force: any = require('d3-force');
let format: any = require('d3-format');
let interpolate: any = require('d3-interpolate');
let request: any = require('d3-request');
let scales: any = require('d3-scale');
let selection: any = require('d3-selection');
let shape: any = require('d3-shape');
let hierarchy: any = require('d3-hierarchy');

export default {
  arc: shape.arc,
  area: shape.area,
  brush: brush.brush,
  brushX: brush.brushX,
  brushY: brush.brushY,
  color: color,
  event: selection.event,
  extent: array.extent,
  forceCollide: force.forceCollide,
  forceLink: force.forceLink,
  forceManyBody: force.forceManyBody,
  forceSimulation: force.forceSimulation,
  forceX: force.forceX,
  forceY: force.forceY,
  format: format.format,
  interpolate: interpolate.interpolate,
  line: shape.line,
  max: array.max,
  min: array.min,
  mouse: selection.mouse,
  pie: shape.pie,
  range: array.range,
  request: request,
  selection: selection,
  select: selection.select,
  selectAll: selection.selectAll,
  scales: scales,
  shape: shape,
  hierarchy: hierarchy
};