import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateBloodDonarsRoutingModule } from './create-blood-donars-routing.module';
import { CreateBloodDonarsComponent } from './create-blood-donars.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        CreateBloodDonarsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
        CreateBloodDonarsComponent
    ],
    exports:[
        CreateBloodDonarsComponent
    ]
})
export class CreateBloodDonarsModule { }
