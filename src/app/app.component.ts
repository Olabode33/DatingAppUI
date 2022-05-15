import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService, AuthUser } from './proxy';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'DatingAppUI';
    users: any;

    constructor(
        private http: HttpClient,
        private accountService: AccountService) { }

    ngOnInit(): void {
        this.getUsers();
        this.setCurrentUser();
    }

    setCurrentUser() {
        const user: AuthUser = JSON.parse(localStorage.getItem('user'));
        this.accountService.setCurrentUser(user);
    }

    getUsers(): void {
        this.http.get('https://localhost:7075/api/users')
            .subscribe({
                next: response => this.users = response,
                error: error => console.log(error)
            });
    }
}
