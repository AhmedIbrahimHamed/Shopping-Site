import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;
  selectedRecipeIndex: number;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.selectedRecipeIndex = +params["id"];
        this.selectedRecipe = this.recipeService.getRecipe(this.selectedRecipeIndex);
      }
    )
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.Ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.selectedRecipeIndex);
    this.router.navigate(["../"], {relativeTo: this.route});
  }

}
