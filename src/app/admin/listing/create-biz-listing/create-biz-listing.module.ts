import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateBizListingRoutingModule } from './create-biz-listing-routing.module';
import { CreateBizListingComponent } from './create-biz-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';

import {NgxMaterialTimepickerModule, NgxMaterialTimepickerComponent} from 'ngx-material-timepicker';
//import { NgxMaterialTimepickerContainerComponent } from 'ngx-material-timepicker/src/app/material-timepicker/components/ngx-material-timepicker-container/ngx-material-timepicker-container.component';
@NgModule({
    
    imports: [
        CommonModule,
        CreateBizListingRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        MaterialModule,
        NgxMaterialTimepickerModule
    ],
    declarations: [
        CreateBizListingComponent,
    ],
    exports:[
        CreateBizListingComponent
    ]
})
export class CreateBizListingModule { }
