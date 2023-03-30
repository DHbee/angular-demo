import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'view-child',
  templateUrl: './view-child.html'
})
export class ViewChildDemo {
  data: string = "it is view child variable"

}
