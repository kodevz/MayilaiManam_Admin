import { Injectable } from '@angular/core';
import { ApiHosts } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AdPostService {

    reqOpts = {
        headers: new HttpHeaders({
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('__MMCLIENT__'),
        })
    }

    constructor(
        public http: HttpClient
    ) { }


    public adList(params) {

        let reqOpts = {
            headers: new HttpHeaders({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('__MMCLIENT__'),
            })
        }

        return this.http.post<any>(ApiHosts['api'] + 'ads/all', params, reqOpts);
    }

    public adPost(data) {
       

         let  reqOpts = {
            headers : new HttpHeaders({
                "Accept": "application/json",
                "Authorization" : "Bearer "+ localStorage.getItem('__MMCLIENT__'),
                "enctype" : "multipart/form-data"
            })
        }
        
        return this.http.post<any>(ApiHosts['api'] + 'ad/create', data, reqOpts);
    }


}
