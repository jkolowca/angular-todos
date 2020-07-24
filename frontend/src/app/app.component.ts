import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'to-do';
  otherTheme = false;
  constructor() {}
  switchTheme(): void {
    this.otherTheme = !this.otherTheme;
  }
}
