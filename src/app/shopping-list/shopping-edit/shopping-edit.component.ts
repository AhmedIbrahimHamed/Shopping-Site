import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput") ingredientName: ElementRef;
  @ViewChild("amountInput") ingredientAmount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addIngredient() {
    let ingName = this.ingredientName.nativeElement.value;
    let ingAmount = this.ingredientAmount.nativeElement.value;
    this.shoppingListService.addIngredient(ingName,ingAmount);
  }

}
