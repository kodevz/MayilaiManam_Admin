import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../shared/api/api.service';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/auth/auth.service';
import { GlobalService } from '../shared/global/global.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    loginData: any = {
        username : '',
        password : ''
    }

    @ViewChild('f', { static: false }) loginForm: NgForm;

    accessToken:string;

    constructor( public router: Router, public api: ApiService, public authService: AuthService, public globalService: GlobalService, private cookieService: CookieService) {}

    ngOnInit() {}

    onLoggedin() {

        this.loginData = this.setLoginJson(this.loginData);
     
        localStorage.setItem('isLoggedin', 'true');

        this.api.post('oauth', 'token', this.loginData).subscribe((resp : any) => {

            this.accessToken =  resp.access_token;

            localStorage.setItem('__MMCLIENT__', resp.access_token);

            let now = new Date();
            now.setTime(now.getTime() + (2 * 24 * 3600 * 1000));
            //now.setTime(now.getTime() + (15 * 1000));

            this.cookieService.set(`__MMCLIENT__`,resp.access_token,now);

            this.getAuthUser();

            setTimeout(() => {
                this.authService.isAuthenticated() ? this.router.navigate(['category']) :  this.router.navigate(['/']);
            },400)   

        },(error) => {

        });
        
    }

    getAuthUser() {

        let headers =new Headers( {
            "Accept": "application/json",
             "Content-Type": "application/json",
            "Authorization" : "Bearer "+ localStorage.getItem('__MMCLIENT__')
        })
        
        this.api.get('api', 'user', headers).subscribe((resp:any) => {
            localStorage.setItem('sessionUser', JSON.stringify(resp));
            this.globalService.sessionUser$.next(resp);
        })
        
    }

    setLoginJson(longinData) {
		let formObject = longinData
		formObject.client_secret = environment.clientSecret
		formObject.grant_type = environment.grantType
		formObject.client_id = environment.clientId
		formObject.scope = ""
		return formObject
    }
}
