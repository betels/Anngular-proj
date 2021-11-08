import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import{HttpClientModule} from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreMoule } from './core.module';
import {StoreFeatureModule, StoreModule} from '@ngrx/store';
import { from } from 'rxjs';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import{StoreRouterConnectingModule} from '@ngrx/router-store';
import { environment } from '../environments/environment';
import { RecipeEffects } from './recipes/store/recipe.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
     
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects,RecipeEffects]),
    StoreDevtoolsModule.instrument({logOnly:environment.production}),
    StoreRouterConnectingModule.forRoot(),
    HttpClientModule,
    SharedModule,
    CoreMoule,
    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
