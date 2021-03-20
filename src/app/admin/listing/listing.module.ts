import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingRoutingModule } from './listing-routing.module';
import { ListingComponent } from './listing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { CreateBizListingModule } from './create-biz-listing/create-biz-listing.module';
import { DialogModule } from 'primeng/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiSelectModule } from 'src/app/components/multiselect/multiselect.component';
import { PermissionDirective } from 'src/app/directives/permission.directive';

@NgModule({
    
    imports: [
        CommonModule,
        ListingRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        CreateBizListingModule,
        DialogModule,
        NgbModule,
        MultiSelectModule
    ],
    declarations: [
        ListingComponent
    ],
})
export class ListingModule { }
