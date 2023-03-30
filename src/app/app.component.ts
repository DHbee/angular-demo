import {Component, ViewChild, ViewChildren} from '@angular/core';
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

  constructor(appService : AppService){

  }

  setTemplateReferenceData(data: string){
    console.log(data)
  }

  printChildData(){
    console.log(this.viewChild.data)
    return this.viewChild.data;
  }

  @ViewChild("vchild") viewChildTemplateVar: any;

  @ViewChild("templateDiv") viewChildTemplateDivVar: any;

  printChildTemplateVariableData(){
    console.log(this.viewChildTemplateVar)
  }

  printChildTemplateDivVariableData(){
    this.viewChildTemplateDivVar.nativeElement.style.background="blue";
    console.log(this.viewChildTemplateDivVar)
  }


  @ViewChildren("para") viewChildrenPara: any;

  printViewChildren(){
    for (let ele of this.viewChildrenPara){
      ele.nativeElement.style.background="red";
    }
  }



}
