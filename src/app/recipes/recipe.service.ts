import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import * as ShoppingListAction from '../shopping-list/store/shopping-list.action';
import * as fromshoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>()
/*   private recipes:Recipe[] = [
    new Recipe('burger','with chips','https://m.bettybossi.ch/static/rezepte/x/bb_bbkn190412_0006a_x.jpg',[
      new Ingredient('burger',1)
    ]),
    new Recipe('burger','with chips','https://m.bettybossi.ch/static/rezepte/x/bb_bbkn190412_0006a_x.jpg',[
      new Ingredient('chips',1)
    ])
   
  ]; */
  private recipes:Recipe[] = [];
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addInfToSch(ingredients: Ingredient[]) {
   // this.shoppingListService.addIngredients(ingredients);
   this.store.dispatch(new ShoppingListAction.AddIngredients(ingredients));
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index:number){
 this.recipes.splice(index,1);
 this.recipesChanged.next(this.recipes.slice());
  }
  setRecipes(recipes:Recipe[]){
  this.recipes = recipes;
  this.recipesChanged.next(this.recipes.slice());
  }


  constructor(private shoppingListService:ShoppingListService, private store:Store<fromApp.AppState>) { }
}
