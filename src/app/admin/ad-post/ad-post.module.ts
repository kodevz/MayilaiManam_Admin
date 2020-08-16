import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdPostRoutingModule } from './ad-post-routing.module';
import { AdPostComponent } from './ad-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiSelectModule } from 'src/app/components/multiselect/multiselect.component';
import { CreateAdPostModule } from './create-ad-post/create-ad-post.module';


@NgModule({
    imports: [
        CommonModule,
        AdPostRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        NgbModule,
        CreateAdPostModule,
        MultiSelectModule
    ],
    declarations: [
        AdPostComponent
    ],
    schemas :[
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AdPostModule { }
