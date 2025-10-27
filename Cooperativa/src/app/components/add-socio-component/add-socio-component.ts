import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Coperativa } from '../../models/Coperativa';
import { Socio } from '../../models/Socio';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-socio-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-socio-component.html',
  styleUrl: './add-socio-component.css',
})
export class AddSocioComponent {
  addSocioForm: FormGroup;
  socio!: Socio;

  constructor(private router: Router) {
    this.addSocioForm = new FormGroup({
      // Puedes usar 'string' para numeroSocio si es un código
      id: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      aportado: new FormControl(null, Validators.required),
      montoprestado: new FormControl(null, Validators.required),
      montopagado: new FormControl(null, Validators.required),
      montopendiente: new FormControl(null, Validators.required),
      interesprestado: new FormControl(null, Validators.required),
      interespagado: new FormControl(null, Validators.required),
      interespendiente: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.addSocioForm.valid) {
      // 2. Construye el objeto Aporte tipado (Aporte)
      const nuevoSocio: Socio = {

        // Campos directos
        id: this.addSocioForm.get('id')!.value,
        nombre: this.addSocioForm.get('nombre')!.value,
        aportado: this.addSocioForm.get('aportado')?.value,
        montoprestado: this.addSocioForm.get('montoprestado')?.value,
        montopagado: this.addSocioForm.get('montopagado')?.value,
        montopendiente: this.addSocioForm.get('montopendiente')?.value,
        interesprestado: this.addSocioForm.get('interesprestado')?.value,
        interespagado: this.addSocioForm.get('interespagado')?.value,
        interespendiente: this.addSocioForm.get('interespendiente')?.value,
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

  validarDigitos(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 2) {
      input.value = input.value.slice(0, 2);
    }
  }
}
