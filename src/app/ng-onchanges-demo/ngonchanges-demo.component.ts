import {Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'ng-onchanges-demo',
  templateUrl: './ngonchanges-demo-ui.html'
})
export class NgOnChangesDemo implements OnChanges, OnInit, DoCheck, OnDestroy{
    
  @Input() userProfileStatus: string = ""; 

  @Input() contacts: string[] = [];
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngonchanges called")
    console.log(changes);
    
    console.log("userProfileStatus current value " + changes.userProfileStatus.currentValue);
    console.log("userProfileStatus previous value " + changes.userProfileStatus.previousValue);

    console.log("contacts current value " + changes.contacts.currentValue);
    console.log("contacts previous value " + changes.contacts.previousValue);
  }

  ngOnInit(): void{
    console.log("ngOnInit called")
  }

  ngDoCheck(): void {
    console.log("ngDoCheck called")
    console.log("contacts current value " + this.contacts);
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy called")
  }
}
