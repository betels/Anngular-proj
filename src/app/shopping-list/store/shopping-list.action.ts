

import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
export const ADD_INGREDIENT = '[shopping-list] Add Ingredient';
export const ADD_INGREDIENTS = '[shopping-list] Add Ingredients';
export const UPDATE_INGREDIENT = '[shopping-list] Update Ingredient';
export const DELETE_INGREDIENT = '[shopping-list] Delete Ingredient';
export const START_EDIT = '[shopping-list] Start Edit';
export const STOP_EDIT = '[shopping-list] Stop Edit';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    constructor(public payload:Ingredient){

    }
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload:Ingredient[]){

    }
}
export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT ;
    constructor(public payload:Ingredient){

    }
}
export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT ;
}
export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload:number){
    }
}
export class StoptEdit implements Action {
    readonly type = STOP_EDIT;
}
export type ShoppingListActions = AddIngredient | AddIngredients | DeleteIngredient 
| UpdateIngredient | StartEdit |StoptEdit
;