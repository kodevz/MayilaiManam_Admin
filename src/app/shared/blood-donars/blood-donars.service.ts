import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { ApiHosts } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BloodDonarsService {

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



    public bloodGroups() {
        let reqOpts = {
            headers: new HttpHeaders({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('__MMCLIENT__')
            })
        }

        return this.http.get(`${ApiHosts['api']}blood-groups/all`, reqOpts);
    }

    public donarsList(params) {

        let reqOpts = {
            headers: new HttpHeaders({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('__MMCLIENT__'),
            })
        }

        return this.http.post<any>(ApiHosts['api'] + 'blood-donars/all', params,  reqOpts);
    }
    
    public donarPost(data) {
        return this.http.post<any>(ApiHosts['api'] + 'blood-donar/create', data,  this.reqOpts);
    }
}
