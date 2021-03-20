import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table'
import { PageHeaderModule } from './modules';
import { PermissionDirective } from '../directives/permission.directive';



@NgModule({
    declarations: [
        
    ],
    imports: [
        CommonModule,
        TableModule,
        PageHeaderModule
    ],
    exports: [
        TableModule,
        PageHeaderModule
    ]
})
export class SharedModule { }
