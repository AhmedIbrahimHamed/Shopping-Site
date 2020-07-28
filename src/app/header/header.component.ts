import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
})
export class HeaderComponet implements OnInit,OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = user ? true : false;
    });
  }

  onSaveDataHandler() {
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipesHandler() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

}