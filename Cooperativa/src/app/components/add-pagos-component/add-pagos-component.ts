import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pagos } from '../../models/Pagos';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-pagos-component',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,],
  templateUrl: './add-pagos-component.html',
  styleUrl: './add-pagos-component.css',
})
export class AddPagosComponent {

  addPagosForm: FormGroup;
  pagos!: Pagos;

  constructor(private router: Router, private fb: FormBuilder) {
    this.addPagosForm = this.fb.group({
      // IDs: Obligatorios y MÁXIMO 4 caracteres
      idPagos: ['', [Validators.required, Validators.maxLength(4)]],
      idSocios: ['', [Validators.required, Validators.maxLength(4)]],
      idPrestamos: ['', [Validators.required, Validators.maxLength(4)]],

      // CAMPOS NUMÉRICOS: Obligatorios y SOLO NÚMEROS (enteros o decimales)
      // Utilizamos el patrón que acepta dígitos y opcionalmente un punto/coma decimal.
      amortizacion: ['', [
        Validators.required,
        Validators.pattern(/^-?\d+(\.\d*)?$/) // Acepta números enteros y decimales
      ]],

      fechaAmortizacion: ['', [Validators.required]],

      numAmortizacion: ['', [
        Validators.required,
        Validators.pattern(/^\d+$/) // Acepta SOLO números enteros positivos
      ]],

      interes: ['', [
        Validators.required,
        Validators.pattern(/^-?\d+(\.\d*)?$/) // Acepta números enteros y decimales
      ]],

      fechaInteres: ['', [Validators.required]],

      numInteres: ['', [
        Validators.required,
        Validators.pattern(/^\d+$/) // Acepta SOLO números enteros positivos
      ]],

      // COMENTARIO: Obligatorio
      comentario: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.addPagosForm.valid) {
      this.pagos = this.addPagosForm.value;
      const nuevoPago: Pagos = {
        idPagos: this.addPagosForm.get('idPagos')!.value,
        idSocios: this.addPagosForm.get('idSocios')!.value,
        idPrestamos: this.addPagosForm.get('idPrestamos')!.value,
        amortizacion: this.addPagosForm.get('amortizacion')!.value,
        fechaAmortizacion: this.addPagosForm.get('fechaAmortizacion')!.value,
        numAmortizacion: this.addPagosForm.get('numAmortizacion')!.value,
        interes: this.addPagosForm.get('interes')!.value,
        fechaInteres: this.addPagosForm.get('fechaInteres')!.value,
        numInteres: this.addPagosForm.get('numInteres')!.value,
        comentario: this.addPagosForm.get('comentario')!.value,
      };
      console.log('Nuevo Pago agregado:', nuevoPago);
    } else {
      console.log('Formulario de Pagos no es válido');
      this.addPagosForm.markAllAsTouched();
    }
  }

  irASocio(): void {
    this.router.navigate(['/socios']);
  }

  limpiarCampos(): void {
    // 1. Usa el método reset() en el FormGroup
    this.addPagosForm.reset();
  }
}
