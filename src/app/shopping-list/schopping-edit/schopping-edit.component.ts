import { state } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListAction from '../store/shopping-list.action';
import * as fromshoppingList from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-schopping-edit',
  templateUrl: './schopping-edit.component.html',
  styleUrls: ['./schopping-edit.component.scss']
})
export class SchoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService,
    private store:Store<fromApp.AppState>) {
   }
  ngOnInit() {
   this.subscription =  this.store.select('shoppingList').subscribe(stateData =>{
      if(stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }else{
        this.editMode = false;
      }
    });
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListAction.UpdateIngredient(newIngredient) );
      //this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
     // this.shoppingListService.addIngredient(newIngredient);
     this.store.dispatch(new ShoppingListAction.AddIngredient(newIngredient))
    }
    this.editMode = false;
    form.reset();

  }
  onClear() {
    this.slForm.reset();
    this.editMode;
    this.store.dispatch(new ShoppingListAction.StoptEdit());
  }
  onDelete() {
   // this.shoppingListService.deleteIngredient(this.editedItemIndex);
   this.store.dispatch(
     new ShoppingListAction.DeleteIngredient() 
     );
    this.onClear();

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListAction.StoptEdit());
  }
}
