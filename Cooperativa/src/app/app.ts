import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // ¡Importante! Debes importar RouterModule (o al menos RouterOutlet y RouterLink)
  // para que los enlaces y el outlet funcionen.
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Cooperativa');
}
