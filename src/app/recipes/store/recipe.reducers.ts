import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";

export interface RecipeFeatureState {
    recipes: State
}

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes:  [
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
    ]
};

export function recipeReducer(state = initialState, action) {
    return state;
}