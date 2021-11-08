import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { PlaceHolderDirective } from '../place-holder.directive';
import { AlertComponent } from '../shared/alert/alert.component';
import { AuthService,AuthResponseData } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(private authService:AuthService,private router:Router,private componentFactoryResolver:ComponentFactoryResolver,
    private store:Store<fromApp.AppState>) { }
  isLoginMode =  true;
  isLoading = false;
  error:string = null;
  @ViewChild(PlaceHolderDirective,{static:false})alertHost: PlaceHolderDirective;
  private closeSub: Subscription;
  private storeSub: Subscription;

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onHandleError(){
    this.store.dispatch(new AuthActions.ClearError());
  }
  onSubmit(form: NgForm) {
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    
    this.isLoading =true;
    if(this.isLoginMode){
      this.store.dispatch(new AuthActions.LoginStart({email:email,password:password}));
    //authObs = this.authService.logIn(email, password);

    } else {
      this.store.dispatch(new AuthActions.SignupStart({email:email,password:password}));
    }
   
/*     authObs.subscribe(resData => {
      console.log(resData);
      this.isLoading =false;
      this.router.navigate(['/recipes']);
    }, errorMessge => {
      console.log(errorMessge);
      this.error = errorMessge;
      this.showErrorAlert(errorMessge);
      this.isLoading =false;
    }
    ); */

    form.reset();
  }
  showErrorAlert(message: string) {
    //const alertcmt = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub =componentRef.instance.close.subscribe(()=>{
    this.closeSub.unsubscribe();
    hostViewContainerRef.clear();
    });
  }


  

  ngOnInit(){
    this.storeSub = this.store.select('auth').subscribe(authState =>{
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if(this.error){
        this.showErrorAlert(this.error);
      }
    });
  }
  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
    if(this.storeSub){
    this.storeSub.unsubscribe();
    }
  }

}
