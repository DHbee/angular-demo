import {Component, EventEmitter, ViewChild, ViewChildren} from '@angular/core';
import { AppService } from 'src/services/app.service';
import {ViewChildDemo} from "./view-child/view-child.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-demo';

  parentInputVar : string = "parentInputVar variable";

  parentOutputVar: String = "parentOutputVar variable";

  @ViewChild(ViewChildDemo) viewChild: any;

  @ViewChild("vchild") viewChildTemplateVar: any;

  @ViewChild("templateDiv") viewChildTemplateDivVar: any;

  @ViewChildren("para") viewChildrenPara: any;

  isLogin: boolean = false;

  puserProfileStatus: string = "hi";
  contacts: string[] = ["partha"];

  constructor(appService : AppService){
  }

  getChildData(event: any){
    this.parentOutputVar = event;
    console.log(event);    
  }
  setTemplateReferenceData(data: string){
   // console.log(data)
  }

  printChildData(){
    console.log(this.viewChild.data)
    return this.viewChild.data;
  }

  printChildTemplateVariableData(){
    console.log(this.viewChildTemplateVar)
  }

  printChildTemplateDivVariableData(){
    this.viewChildTemplateDivVar.nativeElement.style.background="blue";
    console.log(this.viewChildTemplateDivVar)
  }

  printViewChildren(){
    for (let ele of this.viewChildrenPara){
      ele.nativeElement.style.background="red";
    }
  }

  verifyNgOnchanges(){
    this.puserProfileStatus  = "Hello";  
  }

  verifyNgOnchangesOnModifyArray(){
    this.contacts[1]="saradhi"
  }

}
