import { Recipe } from "./recipe.model";
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class RecipeService {
    selectedRecipe = new EventEmitter<Recipe>();

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

    getRecipes() {
        return this.recipes.slice();
    }
}