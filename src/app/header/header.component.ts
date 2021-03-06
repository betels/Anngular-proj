import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions'
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated= false;

  constructor(private dataStorageService: DataStorageService, private authService:AuthService,private store:Store<fromApp.AppState>) { }

  ngOnInit() {
   this.userSub = this.store.select('auth')
   .pipe(map(authState => authState.user))
   .subscribe(user =>{
   this.isAuthenticated = !!user;
   });
  }
  ngOnDestroy(){
    this.userSub.unsubscribe;
  }
  onSaveData(){
// this.dataStorageService.storeRecipes();
this.store.dispatch(new RecipeActions.StoreRecipes());
  }
  onFetchData(){
    //this.dataStorageService.fetchRecipies().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }
  onLogOut(){
    this.store.dispatch(new AuthActions.Logout());
    }
}
