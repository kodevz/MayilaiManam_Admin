import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'category', pathMatch: 'prefix' },
            // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
            { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
            { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule) },
            { path: 'grid', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
            { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule) },
            { path: 'blank-page', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule) },
            { path: 'category', loadChildren: () => import('../admin/category/category.module').then(m => m.CategoryModule) },
            { path: 'listing', loadChildren: () => import('../admin/listing/listing.module').then(m => m.ListingModule) },
            { path: 'manage-user', loadChildren: () => import('../admin/manage-users/manage-users.module').then(m => m.ManageUsersModule) },
            { path: 'blood-donars', loadChildren: () => import('../admin/blood-donars/blood-donars.module').then(m => m.BloodDonarsModule) },
            { path: 'ad-post', loadChildren: () => import('../admin/ad-post/ad-post.module').then(m => m.AdPostModule) }
        ]
    }
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
