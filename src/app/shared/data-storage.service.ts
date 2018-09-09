import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpRequest } from "@angular/common/http";
import { map } from 'rxjs/operators'; 

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";


@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) {
    }

    saveRecipes() {
        /*const token = this.authService.getToken();
        return this.httpClient.put('https://recipebookapp-94eb0.firebaseio.com/recipes.json?', this.recipeService.getRecipes(),
        {
            observe: 'body',
            params: new HttpParams().set('auth', token)
        });*/

        const request = new HttpRequest('PUT', 'https://recipebookapp-94eb0.firebaseio.com/recipes.json?',
        this.recipeService.getRecipes(), {reportProgress: true});
        
        return this.httpClient.request(request);
    }

    fetchRecipes() {
        this.httpClient.get<Recipe[]>('https://recipebookapp-94eb0.firebaseio.com/recipes.json',
        {
           observe: 'body',
           responseType: 'json' 
        })
        .pipe(map(
            (recipes) => {
                for (let recipe of recipes)
                    if(!recipe['ingredients']) recipe['ingredients'] = [];
                
                return recipes;
            }
        ))
        .subscribe(
            (recipes) =>{
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}