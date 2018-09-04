import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe(
            'NameTest', 
            'DescTest', 
            'http://www.cookuk.co.uk/images/children_spaghetti_face/children-recipe-pic1-smaller.gif',
            [new Ingredient('Rice', 1), new Ingredient('Potatoes', 20)]),
        new Recipe(
            'NameTest1', 
            'DescTest1', 
            'http://www.cookuk.co.uk/images/children_spaghetti_face/children-recipe-pic1-smaller.gif', 
            [new Ingredient('Meat', 4), new Ingredient('Tomatoes', 5)])
    ];

    constructor(private shoppingListService: ShoppingListService){}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeById(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }
}