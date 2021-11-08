import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe, Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  recipes:Recipe[] ;
  subscription:Subscription;
  constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute,
    private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('recipes')
    .pipe(map(recipesState => recipesState.recipes))
    .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
        });
    
  }
  onRecipeNew(){
  this.router.navigate(['new'], {relativeTo:this.route});
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
