import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage implements OnInit {
  pinFormatter(value: number) {
    return `${value}%`;
  }
  
  constructor() { }

  ngOnInit() {
  }

}
