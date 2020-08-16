import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAdPostRoutingModule } from './create-ad-post-routing.module';
import { CreateAdPostComponent } from './create-ad-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
    
    imports: [
        CommonModule,
        CreateAdPostRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
        CreateAdPostComponent
    ],
    exports:[
        CreateAdPostComponent
    ]
})
export class CreateAdPostModule { }
