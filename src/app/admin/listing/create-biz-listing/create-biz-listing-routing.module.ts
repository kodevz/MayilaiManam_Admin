import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBizListingComponent } from './create-biz-listing.component';


const routes: Routes = [
    {
      path: '', component: CreateBizListingComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateBizListingRoutingModule { }
