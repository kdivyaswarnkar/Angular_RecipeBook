import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService, AuthResponseData } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router:Router) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onsubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        //  console.log(form.value);



        let authObs: Observable<AuthResponseData>

        this.isLoading = true;
        if (this.isLoginMode) {
            authObs = this.authService.login(email, password)
        } else {
            authObs = this.authService.signup(email, password)
        }

        authObs.subscribe({
            next: (resData: any) => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['./recipes']);
            },
            error: (errorMessage: any) => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            },
            complete: () => {
                console.log('complete');
            }
        });

        form.reset();
    }
}