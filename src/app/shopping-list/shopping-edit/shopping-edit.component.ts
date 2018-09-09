import { Component, OnInit, ElementRef, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppinListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('shoppingList').subscribe(
      data => {
        if(data.editedIngredientId!=null) {
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.shoppinListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else  this.editMode = false;
        
      }
    );
  }

  onSubmitItem(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if(this.editMode) this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}));
    else this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    
    this.onClear();
  }

  onClear() {
    this.shoppinListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
