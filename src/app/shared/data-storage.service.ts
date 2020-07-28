import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) { }

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
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http
        .get<Recipe[]>("https://shopping-site-69c8a.firebaseio.com/recipes.json",
        {
          params: new HttpParams().set('auth', user.token)
        }
      )
    }), map(
      recipes => {
        return recipes.map(recipe => {
          return { ...recipe, Ingredients: recipe.Ingredients ? recipe.Ingredients : [] };
        });
      }
    ), tap(recipes => {
      this.recipeService.setRecipes(recipes);
    })
    );

  }

}