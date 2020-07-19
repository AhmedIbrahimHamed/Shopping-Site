import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute,private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        this.editMode = params["id"] != null;
        this.initForm();
      }
    )
  }

  private initForm() {
    let recipeName = "";
    let recipeImgPath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imgPath;
      recipeDescription = recipe.description;
      if (recipe['Ingredients']) {
        for (let ingredient of recipe.Ingredients){
          recipeIngredients.push(
            new FormGroup({
              "name": new FormControl(ingredient.name, Validators.required),
              "amount": new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "imgPath": new FormControl(recipeImgPath, Validators.required),
      "description": new FormControl(recipeDescription, Validators.required),
      "ingredients": recipeIngredients
    });

  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        "name": new FormControl(null, Validators.required),
        "amount": new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onCancelEdit() {
    this.router.navigate(["../"], {relativeTo: this.route});
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value["name"],
      this.recipeForm.value["description"],
      this.recipeForm.value["imgPath"],
      this.recipeForm.value["ingredients"]
    );

    if (this.editMode){
      this.recipeService.updateRecipe(this.id, newRecipe);
    }else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.router.navigate(["../"], {relativeTo: this.route});

  }

}
