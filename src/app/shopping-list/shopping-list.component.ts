import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ShoppingListService } from './shopping-list.service';
import * as fromshoppingList from './store/shopping-list.reducer';
import * as ShoppingListActtion from './store/shopping-list.action';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable <{ingredients: Ingredient[]}>;
  private igChangeSub: Subscription;
  constructor(private shoppingListServece:ShoppingListService,
    private loggingService:LoggingService,
    private store:Store<fromApp.AppState>) {

   }

  ngOnInit() {
   this.ingredients =  this.store.select('shoppingList');
   /* this.ingredients = this.shoppingListServece.getIngredients();
   this.igChangeSub = this.shoppingListServece.ingredientsChnged.
   subscribe((ingredients:Ingredient[]) => {
     this.ingredients = ingredients; 
   }

   );*/
  }
  onEditItem(index:number){
    //this.shoppingListServece.startEditing.next(index);
    this.store.dispatch(new ShoppingListActtion.StartEdit(index));
  }
ngOnDestroy (){
 // this.igChangeSub.unsubscribe();
}

}
