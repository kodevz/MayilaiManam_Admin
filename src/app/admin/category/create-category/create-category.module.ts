import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCategoryRoutingModule } from './create-category-routing.module';
import { CreateCategoryComponent } from './create-category.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
    
    imports: [
        CommonModule,
        CreateCategoryRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
        CreateCategoryComponent
    ],
    exports: [
        CreateCategoryComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class CreateCategoryModule { }
