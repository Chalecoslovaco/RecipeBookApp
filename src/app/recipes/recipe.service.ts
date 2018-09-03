import { Recipe } from "./recipe.model";
import { EventEmitter } from "@angular/core";

export class RecipeService {
    selectedRecipe = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('NameTest', 'DescTest', 'http://www.cookuk.co.uk/images/children_spaghetti_face/children-recipe-pic1-smaller.gif'),
        new Recipe('NameTest1', 'DescTest1', 'http://www.cookuk.co.uk/images/children_spaghetti_face/children-recipe-pic1-smaller.gif')
    ];

    getRecipes() {
        return this.recipes.slice();
    }
}