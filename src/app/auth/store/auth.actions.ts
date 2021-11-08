import { Action } from '@ngrx/store';
export const   LOGIN_START= '[Auth] Login start';
export const   AUTHENTICATE_SUCCESS = '[Auth] Login ';
export const   LOGOUT = '[Auth] Logout';
export const   AUTHENTICATE_FAIL = '[Auth] Login fail';
export const   CLEAR_ERROR = '[Auth] Clear error';
export const   SIGNUP_START = '[Auth] Signup start';
export const   AUTO_LOGIN = '[Auth] Auto Login';

export class AuthenticateSucess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;
    constructor(public payload:{
        email:string;
        userId:string;
        toke:string;
        expirationDate:Date;
        redirect:boolean;

    }){ }
}
export class Logout implements Action {
    readonly type = LOGOUT;
 
}
export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: {email:string,password:string}){}
 
}
export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;
    constructor(public payload:string){}
 
}
export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload: {email:string,password:string}){}
 
}
export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
 
}
export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
 
}
export type AuthActions = AuthenticateSucess | Logout | LoginStart | AuthenticateFail | SignupStart
| ClearError | AutoLogin;