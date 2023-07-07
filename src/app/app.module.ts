import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TemplateVariable} from "./template-variables/template-variable.component";
import {InputDecorator} from "./input-decorator/input-decorator.component";
import {OutputDecorator} from "./output-decorator/output-decorator.component";
import {TemplateReference} from "./template-reference/template-reference.component";
import {ViewChildDemo} from "./view-child/view-child.component";
import {ObserverDemo} from "./observer-demo/observer-demo.component";
import { NgContentDemo } from './ng-content-demo/ng-content-demo.component';
import { NgOnChangesDemo } from './ng-onchanges-demo/ngonchanges-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateVariable,
    InputDecorator,
    OutputDecorator,
    TemplateReference,
    ViewChildDemo,
    ObserverDemo,
    NgContentDemo,
    NgOnChangesDemo
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
