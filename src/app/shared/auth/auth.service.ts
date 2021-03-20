import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    accessToken: string = localStorage.getItem('accessToken');

    constructor(public http: HttpClient, public api: ApiService, public router: Router, private cookieService: CookieService) {

    }

    getToken() {    

        return this.cookieService.get('__MMCLIENT__');
        //return localStorage.getItem('__MMCLIENT__');
    }

    /**
     * Check is User Authentication
     */
    isAuthenticated() {
        return this.getToken() ? true :  false
    }

    authDetails() {
        return {
            sessionUserName : localStorage.getItem('userName'),
            role   : 'Manager'
        };  
    }

    authUserCheck() {
        let headers =new Headers( {
            "Accept": "application/json",
             "Content-Type": "application/json",
            "Authorization" : "Bearer "+ localStorage.getItem('__MMCLIENT__')
        })
        
        this.api.get('api', 'user', headers).subscribe((resp:any) => {
            console.log(resp)
        })
        
    }

    /**
     * Api token logout
     */
    logout() {   
        
       
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('__MMCLIENT__');
        localStorage.removeItem('sessionUser');
        this.cookieService.delete('__MMCLIENT__');
        
        setTimeout(() => {
            this.router.navigate(['/']);
        }, 400);
        

        // this.notifyService.onLogoutConfirmation(
        //     "Logout Your Session?",
        //     "",
        //     (state: any, event: any) => {
        //         if (state == 'yes') {
        //             this.api.post('api', 'logoutApi',{}, this.api.getHttpHeaders('api')).subscribe((resp: any) => { 
                      
        //                 if(resp){
                   
        //                     this.cookieService.delete('_GSLARASES_');
        //                     this.router.navigate(['/']);
        //                     localStorage.setItem('accessToken','');            
        //                     this.global._routeMenuSubscription.unsubscribe();
        //                     this.pouch.myEventSubscription.unsubscribe();
                                   
        //                 }
        //             });
        //         }
        //     }
        // );
    }
}
