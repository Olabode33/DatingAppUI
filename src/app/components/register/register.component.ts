import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
        private accountService: AccountService,
        private toastr: ToastrService
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
                    this.toastr.error(error.error);
                }
            });
    }

    cancel(): void {
        this.model = {} as RegisterUser;
        this.cancelRegister.emit(false);
    }

}
