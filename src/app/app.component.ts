import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping site';
  headerClicked: string = "Recipes";

  onNavigate(headerClicked: string) {
    this.headerClicked = headerClicked;
  }

  
}
