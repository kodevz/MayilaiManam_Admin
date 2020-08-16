import { Component, OnInit } from '@angular/core';
import { GlobalService } from './shared/global/global.service';
import { AuthService } from './shared/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(globalService: GlobalService, private authService: AuthService) {

        globalService.setSessionUser();
    }

    ngOnInit() {
        if (!this.authService.getToken()) {
            this.authService.logout();
        }
    }
}
