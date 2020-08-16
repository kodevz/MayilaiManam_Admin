import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BloodDonarsComponent } from './blood-donars.component';


const routes: Routes = [    
    {
        path : '',
        component : BloodDonarsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BloodDonarsRoutingModule { }
