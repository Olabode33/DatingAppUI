import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService, AuthUser, LoginUser } from 'src/app/proxy';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    model = {} as LoginUser;

    constructor(
        public readonly accountService: AccountService
    ) { }

    ngOnInit() {}

    login(): void {
        this.accountService.login(this.model)
            .subscribe({
                next: response => {},
                error: error => {
                    console.log(error);
                }
            });
    }

    logout(): void {
        this.accountService.logout();
    }

}
