import { Component, OnInit, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Output } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('NameTest', 'DescTest', 'http://www.cookuk.co.uk/images/children_spaghetti_face/children-recipe-pic1-smaller.gif'),
    new Recipe('NameTest1', 'DescTest1', 'http://www.cookuk.co.uk/images/children_spaghetti_face/children-recipe-pic1-smaller.gif')
  ];
  @Output() selectedRecipe = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  onSelectRecipe(recipe: Recipe){
    this.selectedRecipe.emit(recipe);
  }

}
