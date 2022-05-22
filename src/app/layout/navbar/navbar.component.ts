import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
        public readonly accountService: AccountService,
        private router: Router,
        private toastr: ToastrService
    ) { }

    ngOnInit() {}

    login(): void {
        this.accountService.login(this.model)
            .subscribe({
                next: response => {
                    this.router.navigate(['/members']);
                },
                error: error => {
                    console.log(error);
                    this.toastr.error(error.error)
                }
            });
    }

    logout(): void {
        this.accountService.logout();
        this.router.navigate(['/']);
    }

}
