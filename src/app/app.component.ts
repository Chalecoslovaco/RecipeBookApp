import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  firedFeature: string = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDrKG3X1As19RvUhKVBYUmfgsDmBksow7A",
      authDomain: "recipebookapp-94eb0.firebaseapp.com"
    });
  }

  onNavigate(feature: string) {
    this.firedFeature = feature;
  }
}
