import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ApiHosts } from 'src/environments/environment';
import { DTPageOptions } from '../datatable/model/dtoptions';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {


    reqOpts = {
        headers : new HttpHeaders({
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : "Bearer "+ localStorage.getItem('__MMCLIENT__')
        })
    }

    constructor(public http: HttpClient, public router: ActivatedRoute) { }

   
    public parentCategories() {
        let  reqOpts = {
            headers : new HttpHeaders({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+ localStorage.getItem('__MMCLIENT__')
            })
        }
  
        return this.http.get(`${ApiHosts['api']}category/parent-categories`, reqOpts);
    }

    public categorySearch(search:string) {
        let  reqOpts = {
            params: new HttpParams({ fromObject: { search: search} }),
            headers : new HttpHeaders({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+ localStorage.getItem('__MMCLIENT__')
            })
        }
  
        return this.http.get(`${ApiHosts['api']}category/search`, reqOpts);
    }

    public  listingPost(formData) {
        let  reqOpts = {
            headers : new HttpHeaders({
                "Accept": "application/json",
                "Authorization" : "Bearer "+ localStorage.getItem('__MMCLIENT__'),
                "enctype" : "multipart/form-data"
            })
        }
        return this.http.post<any>(ApiHosts['api'] + 'listing/create', formData, reqOpts)
        
    }


    public  categoryList(data: DTPageOptions) {

        
        let reqOpts = {
            headers: new HttpHeaders({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('__MMCLIENT__'),
            })
        }

        return this.http.post<any>(ApiHosts['api'] + 'category/parent', data, reqOpts)
    }

    public  categoryPost(data:any) {
        let id = data.get('id');
        let endpoint = `category/create`;
       
      
        let  reqOpts = {
            headers : new HttpHeaders({
                "Accept": "application/json",
                "Authorization" : "Bearer "+ localStorage.getItem('__MMCLIENT__'),
                "enctype" : "multipart/form-data"
            })
        }

        if (id && id != 'null') {
            endpoint = `category/${id}/update`;
            return this.http.post<any>(ApiHosts['api'] + endpoint, data, reqOpts);
        }


        

        return this.http.post<any>(ApiHosts['api'] + endpoint, data, reqOpts);
    }
}
