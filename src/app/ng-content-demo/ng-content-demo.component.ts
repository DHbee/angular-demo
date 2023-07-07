import {Component, Input} from '@angular/core';

@Component({
  selector: 'ng-content-demo',
  templateUrl: './ng-content-demo-ui.html'
})
export class NgContentDemo {

  @Input() items: string[] = [];

}
