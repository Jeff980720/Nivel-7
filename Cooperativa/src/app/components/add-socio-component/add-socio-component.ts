import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Coperativa } from '../../models/Coperativa';
import { Socio } from '../../models/Socio';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-socio-component',
  standalone: true,
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
  templateUrl: './add-socio-component.html',
  styleUrl: './add-socio-component.css',
})
export class AddSocioComponent {
  addSocioForm: FormGroup;
  socio!: Socio;

  constructor(private router: Router, private fb: FormBuilder) {

    this.addSocioForm = this.fb.group({
      id: [
        '',
        [
          // REGLA: Obligatorio
          Validators.required,
          // REGLA: Exactamente 2 dígitos (solo números)
          Validators.pattern(/^\d{2}$/)
        ]
      ],
      nombre: [
        '',
        [
          // REGLA: Obligatorio
          Validators.required,
          // REGLA: Mínimo 5 caracteres
          Validators.minLength(5)
        ]
      ],
      // ... el resto de tus campos ...
      aportado: [null],
      montoprestado: [null],
      montopagado: [null],
      montopendiente: [null],
      interesprestado: [null],
      interespagado: [null],
      interespendiente: [null],
    });
  }

  onSubmit() {
    if (this.addSocioForm.valid) {
      // 2. Construye el objeto Aporte tipado (Aporte)
      const nuevoSocio: Socio = {

        // Campos directos
        id: this.addSocioForm.get('id')!.value,
        nombre: this.addSocioForm.get('nombre')!.value,
        aportado: this.addSocioForm.get('aportado')!.value,
        montoprestado: this.addSocioForm.get('montoprestado')!.value,
        montopagado: this.addSocioForm.get('montopagado')!.value,
        montopendiente: this.addSocioForm.get('montopendiente')!.value,
        interesprestado: this.addSocioForm.get('interesprestado')!.value,
        interespagado: this.addSocioForm.get('interespagado')!.value,
        interespendiente: this.addSocioForm.get('interespendiente')!.value,
      };

      console.log('Objeto Socio tipado listo para enviar:', nuevoSocio);

      // 3. Llama al servicio para guardar
      // this.sociosService.registrarAporte(nuevoAporte).subscribe(...)
    } else {
      console.log('Formulario inválido. Revise los errores de validación.');
      // Opcional: Marcar todos los campos como 'touched' para mostrar errores
      this.addSocioForm.markAllAsTouched();
    }
  }

  irASocio(): void {
    this.router.navigate(['/socios']);
  }

  // validarDigitos(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.value.length > 2) {
  //     input.value = input.value.slice(0, 2);
  //   }
  // }

  limpiarCampos(): void {
    // 1. Usa el método reset() en el FormGroup
    this.addSocioForm.reset();

    // 2. Opcional: Re-aplicar valores iniciales si son dinámicos (como la fecha)
    // El método reset() normalmente revierte a los valores dados en el constructor.
    // Si quieres asegurar que la fecha vuelva a ser la de hoy:
    this.addSocioForm.patchValue({
      fechaAporte: new Date(),
      aportado: 0
    });
  }
}
