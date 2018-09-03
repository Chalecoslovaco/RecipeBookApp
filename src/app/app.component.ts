import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  firedFeature: string = 'recipe';

  onNavigate(feature: string) {
    this.firedFeature = feature;
  }
}
