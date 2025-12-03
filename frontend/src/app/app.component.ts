import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterModule], 
  standalone: true

})
export class AppComponent {
  colors = ['#1C2B4D', '#00C1A7', '#5C7EE6', '#FFFFFF'];
  color = this.colors[2]; // color inicial

  cambiarColor() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    this.color = this.colors[randomIndex];
  }
}
