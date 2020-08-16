import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateManageUsersRoutingModule } from './create-manage-users-routing.module';
import { CreateManageUsersComponent } from './create-manage-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
    declarations: [CreateManageUsersComponent],
    imports: [
        CommonModule,
        CreateManageUsersRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        NgMultiSelectDropDownModule
    ],
    exports:[
        CreateManageUsersComponent
    ]
})
export class CreateManageUsersModule { }
