import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Caja } from '../../models/Caja';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-caja-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  templateUrl: './caja-component.html',
  styleUrl: './caja-component.css',
})
export class CajaComponent {
  addCajaForm: FormGroup;
  caja!: Caja;

  constructor(private router: Router, private fb: FormBuilder) {
    this.addCajaForm = this.fb.group({
      idCaja: ['', [Validators.required]],
      efectivo: ['', [Validators.required, Validators.pattern(/^-?(?!0\d*$)\d+(\.\d+)?$/)]],
      fechaCaja: ['', [Validators.required]],
      comentario: ['', []],
    });
  }

  onSubmit() {
    if (this.addCajaForm.valid) {
      // 2. Construye el objeto Aporte tipado (Aporte)
      const nuevoCaja: Caja = {

        // Campos directos
        idCaja: this.addCajaForm.get('idCaja')!.value,
        efectivo: this.addCajaForm.get('idCaja')!.value,
        fechaCaja: this.addCajaForm.get('idCaja')!.value,
        comentario: this.addCajaForm.get('idCaja')!.value,
      };

      console.log('Objeto Caja tipado listo para enviar:', nuevoCaja);

      // 3. Llama al servicio para guardar
      // this.sociosService.registrarAporte(nuevoAporte).subscribe(...)
    } else {
      console.log('Formulario inválido. Revise los errores de validación.');
      // Opcional: Marcar todos los campos como 'touched' para mostrar errores
      this.addCajaForm.markAllAsTouched();
    }
  }

  irASocio(): void {
    this.router.navigate(['/socios']);
  }

  limpiarCampos(): void {
    // 1. Usa el método reset() en el FormGroup
    this.addCajaForm.reset();
  }

}
