import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdPostComponent } from './ad-post.component';


const routes: Routes = [    
    {
        path : '',
        component : AdPostComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdPostRoutingModule { }
