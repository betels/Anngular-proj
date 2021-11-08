import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { RecipeItemComponent } from './recipes-list/recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']

})
export class RecipesComponent implements OnInit {
selectedRecipe: Recipe;
  constructor(private recipeService:RecipeService) { }

  ngOnInit() {
    this.recipeService.recipeSelected.
    subscribe(
      (recipe:Recipe) => {
        this.selectedRecipe = recipe;
      }
      );

  }


}
