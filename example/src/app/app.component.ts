import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title: string;
  arr_colors: string[];
  arr_heroes: string[];


  constructor() {
    this.title = 'Ng drag drop list';
    this.arr_colors = ['blue', 'red', 'greenyellow', 'purple', 'grey'];
    this.arr_heroes = [
      'http://icons.iconarchive.com/icons/aha-soft/free-large-boss/512/Superman-icon.png',
      'http://icons.iconarchive.com/icons/iconshock/spiderman/256/spiderman-icon.png',
      'http://icons.iconarchive.com/icons/iconshock/batman/256/Batman-icon.png',
      'http://www.free-icons-download.net/images/iron-man-icon-6482.png',
      'https://tstoaddicts.files.wordpress.com/2015/02/unlock_plopperpig.png',
    ];
  }
}
