import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let selectedRecipeIndex;
    this.route.params.subscribe(
      (params: Params) => {
        selectedRecipeIndex = +params["id"];
        this.selectedRecipe = this.recipeService.getRecipe(selectedRecipeIndex);
      }
    )
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.Ingredients);
  }

}
