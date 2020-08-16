import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { PageHeaderModule } from './../../shared';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateCategoryModule } from './create-category/create-category.module';
import { CreateBizListingModule } from '../listing/create-biz-listing/create-biz-listing.module';
import { MultiSelectModule } from 'src/app/components/multiselect/multiselect.component';

@NgModule({
    imports: [
        CommonModule,
        CategoryRoutingModule,
        PageHeaderModule, 
        SharedModule,
        ReactiveFormsModule,
        NgbModule,
        CreateCategoryModule,
        MultiSelectModule
    ],
    declarations: [
        CategoryComponent
    ],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class CategoryModule { }
