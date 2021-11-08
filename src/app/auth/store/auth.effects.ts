import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthResponseData{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registerd?:boolean;
  }
  const handleAuthentication = (expiresIn:number,email:string,userId:string,token:string) =>{
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000);
      const user = new User (email,userId,token,expirationDate );
      localStorage.setItem('userData', JSON.stringify(user));
 return new AuthActions.AuthenticateSucess({
     email:email,
     userId:userId,
     toke:token,
     expirationDate:expirationDate,
     redirect:true
  });
  };
  const handleError = (errorRes) =>{
    let errorMessage = 'An Unkown message occured!';
    if(!errorRes.error || !errorRes.error.error){
      return of(new AuthActions.AuthenticateFail(errorMessage));
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
            return of(new AuthActions.AuthenticateFail(errorMessage));
  };
@Injectable()
export class AuthEffects{
  @Effect()
    authSignUp = this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap(( signupAction:AuthActions.SignupStart) =>{
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseAPIKey, {
          email: signupAction.payload.email,
          password: signupAction.payload.password,
          returnSecureToken: true
        }).pipe(
          tap(resData =>{
            this.authService.SetLogOutTimer(+resData.expiresIn * 1000 );
          }),
          map(resData=>{
        return handleAuthentication(+resData.expiresIn,resData.email,resData.localId,resData.idToken );
        }),
        catchError(errorRes =>{
      return handleError(errorRes);
       })
        );
  })
    );
    
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData:AuthActions.LoginStart)=>{
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.fireBaseAPIKey,{
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
              }).pipe(
                tap(resData =>{
                  this.authService.SetLogOutTimer(+resData.expiresIn * 1000 );
                }),
                map(resData=>{
                return handleAuthentication(+resData.expiresIn,resData.email,resData.localId,resData.idToken );
              }),
              catchError(errorRes =>{
                return handleError(errorRes);
             })
              );
        }),

    );
    @Effect ({dispatch:false})
    authRedirect = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSucessAction:AuthActions.AuthenticateSucess)=>{
      if(authSucessAction.payload.redirect){
        this.router.navigate(['/']);
      }
    })
    );
    
    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT),tap(()=>{
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
      }));

  @Effect({ dispatch: false })
  autoLogin = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN),
   tap(() => {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return {type:'DUMMY'};
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
       const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.authService.SetLogOutTimer(expirationDuration); 
      //this.user.next(loadedUser);
      return new AuthActions.AuthenticateSucess({
        email: loadedUser.email,
        userId: loadedUser.id,
        toke: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate),
        redirect:false
      });
      
    }
   return {type:'DUMMY'};
  }));
    constructor(private actions$:Actions,private http:HttpClient,
      private router:Router, private authService:AuthService){
 
    }
}



