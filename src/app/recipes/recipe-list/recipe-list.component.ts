import { Component, OnInit, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Output } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  
  @Output() selectedRecipe = new EventEmitter<Recipe>();

  constructor(private recipeServide: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeServide.getRecipes();
  }

  onSelectRecipe(recipe: Recipe){
    this.selectedRecipe.emit(recipe);
  }

}
