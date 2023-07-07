import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'output-decorator',
  templateUrl: './output-decorator.html'
})
export class OutputDecorator {

  @Output() childEvent = new EventEmitter();

  test(event ?: any){
    this.childEvent.emit("it is child component");
  }

}
