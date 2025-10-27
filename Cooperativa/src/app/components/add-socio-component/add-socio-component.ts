import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Coperativa } from '../../models/Coperativa';
import { Socio } from '../../models/Socio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-socio-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-socio-component.html',
  styleUrl: './add-socio-component.css',
})
export class AddSocioComponent {
  socio!: Socio;

  validarDigitos(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 2) {
      input.value = input.value.slice(0, 2);
    }
  }
}
