import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { AuthUser, LoginUser, RegisterUser } from '../models';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    baseUrl = 'https://localhost:7075/api/';
    private currentUserSource = new ReplaySubject<AuthUser>(1);
    currentUser$ = this.currentUserSource.asObservable();

    constructor(private http: HttpClient) { }

    login(model: LoginUser) {
        return this.http.post<AuthUser>(this.baseUrl + 'account/login', model)
            .pipe(
                map((response: AuthUser) => {
                    const user = response;
                    if (user) {
                        localStorage.setItem('user', JSON.stringify(user));
                        this.setCurrentUser(user);
                    }
                })
            );
    }

    setCurrentUser(user: AuthUser): void {
        this.currentUserSource.next(user);
    }

    logout() {
        localStorage.removeItem('user');
        this.currentUserSource.next(null as unknown as AuthUser);
    }

    register(model: RegisterUser) {
        return this.http.post<AuthUser>(this.baseUrl + 'account/register', model)
                    .pipe(
                        map((response: AuthUser) => {
                            const user = response;
                            if (user) {
                                localStorage.setItem('user', JSON.stringify(user));
                                this.setCurrentUser(user);
                            }
                        })
                    );
    }

}
