import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { ApiService } from './shared/api/api.service';
import { DatatableService } from './shared/datatable/datatable.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CookieService } from 'ngx-cookie-service';
import { PermissionDirective } from './directives/permission.directive';

enableProdMode();
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        ReactiveFormsModule,
        AppRoutingModule,
        FormsModule,
        NgxMaterialTimepickerModule,
        NgMultiSelectDropDownModule.forRoot()
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        AuthGuard,
        ApiService,
        DatatableService,
        {
            provide: APP_BASE_HREF,
            useValue: window['base-href']
        },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CookieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
