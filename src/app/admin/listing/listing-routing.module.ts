import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './listing.component';
import { CreateBizListingComponent } from './create-biz-listing/create-biz-listing.component';



const routes: Routes = [
    {
        path: '',
        children :[
            {
                path: '', component: ListingComponent,
            },
            {
                path: 'create-listing',
                component: CreateBizListingComponent
            }
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListingRoutingModule { }
