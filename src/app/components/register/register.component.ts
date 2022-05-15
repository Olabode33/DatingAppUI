import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService, RegisterUser } from 'src/app/proxy';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    @Output() cancelRegister = new EventEmitter();

    model = {} as  RegisterUser;

    constructor(
        private accountService: AccountService
    ) { }

    ngOnInit() {
    }

    register(): void {
        this.accountService.register(this.model)
            .subscribe({
                next: response => {
                    this.cancelRegister.emit(false);
                },
                error: error => {
                    console.log(error);
                }
            });
    }

    cancel(): void {
        this.model = {} as RegisterUser;
        this.cancelRegister.emit(false);
    }

}
