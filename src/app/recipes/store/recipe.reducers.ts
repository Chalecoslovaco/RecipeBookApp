import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface RecipeFeatureState extends fromApp.AppState{
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

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {...state, recipes: [...action.payload]};
        case RecipeActions.ADD_RECIPE:
            return {...state, recipes: [...state.recipes, action.payload]};
        case RecipeActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.id];
            const updatedRecipe = {...recipe, ...action.payload.updatedRecipe};
            const recipes = [...state.recipes];
            recipes[action.payload.id] = updatedRecipe;
            return {...state, recipes: recipes};
        case RecipeActions.DELETE_RECIPE:
            const newRecipes = [...state.recipes];
            newRecipes.splice(action.payload, 1);
            return {...state, recipes: newRecipes};
        default:
            return state;
    }
}