import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, TitleStrategy } from "@angular/router";
import { Observable, Subject, Subscription } from "rxjs";
import { AuthService, AuthResponseData } from "./auth.service";
import {AlertComponent} from '../shared/alert/alert.component';
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceHolderDirective,{static:false}) alertHost:PlaceHolderDirective;
 private closeSub:Subscription;
    constructor(private authService: AuthService, private router:Router,private componentFactoryResolver:ComponentFactoryResolver) { }
  

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
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            },
            complete: () => {
                console.log('complete');
            }
        });

        form.reset();
    }


    onHandleError()
    {
        this.error=null;
    }


    private showErrorAlert(message:string)
    {
    //  const alertCmp=new AlertComponent();
  const alertCmpFactory= this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
  const  hostViewContainerRef =this.alertHost.ViewContainerRef;
  hostViewContainerRef.clear();

 
  const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub .unsubscribe();
      hostViewContainerRef.clear();
    });

  
    }
    ngOnDestroy(): void {
       if(this.closeSub)
       {
      this.closeSub.unsubscribe();
       }
    }
}