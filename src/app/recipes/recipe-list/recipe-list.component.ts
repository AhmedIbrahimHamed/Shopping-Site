import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscrition: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.subscrition = this.recipeService.recipeChange.subscribe(
      (newRcipes: Recipe[])=> {
        this.recipes = newRcipes;
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.subscrition.unsubscribe();
  }

}
