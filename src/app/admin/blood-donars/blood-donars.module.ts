import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BloodDonarsRoutingModule } from './blood-donars-routing.module';
import { BloodDonarsComponent } from './blood-donars.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateBloodDonarsModule } from './create-blood-donars/create-blood-donars.module';
import { MultiSelectModule } from 'src/app/components/multiselect/multiselect.component';


@NgModule({
   
    imports: [
        CommonModule,
        BloodDonarsRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        NgbModule,
        CreateBloodDonarsModule,
        MultiSelectModule
    ],
    declarations: [
        BloodDonarsComponent
    ],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class BloodDonarsModule { }
