import { Effect, Actions } from "@ngrx/effects";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$.ofType(RecipeActions.FETCH_RECIPES)
        .pipe(switchMap((action: RecipeActions.FetchRecipes) => {
            return this.httpClient.get<Recipe[]>('https://recipebookapp-94eb0.firebaseio.com/recipes.json',
            {
               observe: 'body',
               responseType: 'json' 
            })
        }))
        .pipe(map((recipes) => {
                for (let recipe of recipes)
                    if(!recipe['ingredients']) recipe['ingredients'] = [];
                    
                return {type: RecipeActions.SET_RECIPES, payload: recipes};
        }));         
    
    @Effect({dispatch: false})
    recipeSave = this.actions$.ofType(RecipeActions.SAVE_RECIPES)
        .pipe(withLatestFrom(this.store.select('recipes')))
        .pipe(switchMap(([action, state]) => {
            const request = new HttpRequest('PUT', 'https://recipebookapp-94eb0.firebaseio.com/recipes.json?',
            state.recipes, {reportProgress: true});
        
            return this.httpClient.request(request);
        }));

    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromRecipe.RecipeFeatureState>) {}
}