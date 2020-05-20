import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients() {
       return this.ingredients.slice();
    }

    addIngredient(ingredientName: string, ingredientAmount: number) {
        this.ingredients.push(new Ingredient(ingredientName, ingredientAmount));
        this.ingredientsChanged.emit(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]) {
      this.ingredients.push(...ingredients);
      this.ingredientsChanged.emit(this.getIngredients());
    }
}