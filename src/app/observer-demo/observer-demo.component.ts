import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'observer-demo',
  templateUrl: './observer-demo.html'
})
export class ObserverDemo {

  myObservable = new Observable()
}
