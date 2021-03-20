import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiHosts } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ManageUserService {

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

    public usersList(params) {
        return this.http.post<any>(ApiHosts['api'] + 'users/all', params, this.reqOpts);
    }

    public userPost(data:any) {
        let id = data.id;
        let endpoint = `users/create`;

        if (id) {
            endpoint = `users/${id}/update`;
        }
        return this.http.post<any>(ApiHosts['api'] + endpoint, data, this.reqOpts);
    }

    public deleteUser(id) {
        return this.http.delete(`${ApiHosts['api']}users/${id}/delete`, this.reqOpts);
    }

    public getUserRoles() {
        return this.http.get(`${ApiHosts['web']}/user/roles`);
    }
}
