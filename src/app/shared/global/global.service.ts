import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    sessionUser$ = new BehaviorSubject(null);

    sessionUser;

    constructor() { 
        this.sessionUser$.subscribe(user => this.sessionUser = user);
    }

    setSessionUser(user?:any) {

        if (!user) {
            user = JSON.parse(localStorage.getItem('sessionUser'));
        }
        this.sessionUser$.next(user);
    }
}
