import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError,tap } from 'rxjs/operators';
import {BehaviorSubject, from, throwError} from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import  { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions'

export interface AuthResponseData{
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registerd?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer:any;
  

  constructor( private store:Store<fromApp.AppState>) { }


  SetLogOutTimer(expirationDuration:number){
  this.tokenExpirationTimer = setTimeout(() =>{
    this.store.dispatch(new AuthActions.Logout())
  },expirationDuration);
  }
clearLogoutTimer(){
  if(this.tokenExpirationTimer){
    clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }
}
autoLogin(){
  const userData:{
    email: string;
    id: string;
    _token: string;
    _tokenExpirationDate: string;


  } = JSON.parse(localStorage.getItem('userData'));
  if(!userData){
   return;
  }
  const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
  if(loadedUser.token){
    //this.user.next(loadedUser);
    this.store.dispatch(new AuthActions.AuthenticateSucess({
      email: loadedUser.email,
      userId: loadedUser.id,
      toke: loadedUser.token,
      expirationDate: new Date(userData._tokenExpirationDate),
      redirect:true
    }));
    const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
  }
}
}
  


  

