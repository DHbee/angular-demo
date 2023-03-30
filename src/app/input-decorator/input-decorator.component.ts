import {Component, Input} from '@angular/core';

@Component({
  selector: 'input-decorator',
  templateUrl: './input-decorator.html'
})
export class InputDecorator {

  @Input() childVar : string = "";

}
