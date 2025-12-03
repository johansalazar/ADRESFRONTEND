// color-toggle.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-color-toggle',
  template: `
    <button (click)="cambiarColor()">Cambiar Color</button>
    <div [style.backgroundColor]="color" class="container">
      Contenedor con color dinámico
    </div>
  `,
  styles: [`
    .container { width: 300px; height: 150px; margin-top: 10px; }
  `]
})
export class ColorToggleComponent {
  colors = ['#1C2B4D', '#00C1A7', '#5C7EE6', '#FFFFFF'];
  color = this.colors[0];

  cambiarColor() {
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
