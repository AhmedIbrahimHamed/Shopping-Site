import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
})
export class HeaderComponet {

  constructor(private dataStorageService: DataStorageService) {}

  onSaveDataHandler() {
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipesHandler() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

}