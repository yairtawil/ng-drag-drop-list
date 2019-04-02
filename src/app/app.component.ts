import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  GITHUB_LINK = environment.githubLink;
  colors = new Array(9).fill(null).map(this.randomRGB);
  heroes = [
    'http://icons.iconarchive.com/icons/aha-soft/free-large-boss/512/Superman-icon.png',
    'http://icons.iconarchive.com/icons/iconshock/spiderman/256/spiderman-icon.png',
    'http://icons.iconarchive.com/icons/iconshock/batman/256/Batman-icon.png',
    'http://www.free-icons-download.net/images/iron-man-icon-6482.png',
    'https://tstoaddicts.files.wordpress.com/2015/02/unlock_plopperpig.png'
  ];

  print(event) {
    console.log(event);
  }

  randomRGB() {
    const o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
  }

  rgbTOrgba(rgb, a) {
    return `${rgb.substr(0, rgb.length - 1)}, ${a})`;
  }

}
