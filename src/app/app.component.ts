import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
      private store:Store<fromApp.AppState>,
      private authService:AuthService,
      @Inject(PLATFORM_ID) private platformId){

    }

  ngOnInit(){
    if(isPlatformBrowser(this.platformId)){
      this.store.dispatch(new AuthActions.AutoLogin());
    }
   
    this.authService.autoLogin();

  }
}
