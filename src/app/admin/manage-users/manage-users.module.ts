import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { ManageUsersComponent } from './manage-users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateManageUsersModule } from './create-manage-users/create-manage-users.module';
import { MultiSelectModule } from 'src/app/components/multiselect/multiselect.component';
import { PermissionDirective } from 'src/app/directives/permission.directive';

@NgModule({
    imports: [
        CommonModule,
        ManageUsersRoutingModule,
        FormsModule,    
        SharedModule,
        ReactiveFormsModule,
        NgbModule,
        CreateManageUsersModule,
        MultiSelectModule
    ],
    declarations: [
        ManageUsersComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ]
})
export class ManageUsersModule { }
