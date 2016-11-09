import {
  Component,
  OnInit
} from '@angular/core';

import d3 from './d3';

@Component({
  selector: 'hello-world',
  template: 'Hello world from the {{ projectTitle }} module!'
})
export class HelloWorld implements OnInit {
  projectTitle: string = 'weighted screen';

  ngOnInit() {
    d3.select("body").transition()
    .style("background-color", "black");
  }
}
