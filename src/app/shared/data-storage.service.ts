import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http.put("https://shopping-site-69c8a.firebaseio.com/recipes.json",
    recipes).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetchRecipes() {
    return this.http
    .get<Recipe[]>("https://shopping-site-69c8a.firebaseio.com/recipes.json")
    .pipe(map(
      recipes => {
        return recipes.map(recipe => {
          return {...recipe, Ingredients: recipe.Ingredients ? recipe.Ingredients : []};
        });
      }
    ), tap(recipes => {
      this.recipeService.setRecipes(recipes);
    }));
    
  }
  
}