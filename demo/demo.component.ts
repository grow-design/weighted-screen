import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  template: '<weighted-screen [handicap] = "100" ></weighted-screen>',
  styles: [
    `
    :host {
      border: solid 1px #eee;
      border-bottom: solid 1px #ccc;
      display: block;
    }
    `
  ]
})

export class Demo {
}
