import { Component, OnInit } from '@angular/core';
import { Socio } from '../../models/Socio';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SociosService } from '../../services/socios';
import { map, Observable, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Aporte } from '../../models/Aportes';

// 💡 ¡AÑADE ESTAS IMPORTACIONES FALTANTES! 💡
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
// Fin de importaciones de Material

@Component({
  selector: 'app-add-aporte-component',
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
  ],
  templateUrl: './add-aporte-component.html',
  styleUrl: './add-aporte-component.css',
})
export class AddAporteComponent implements OnInit {
  // 💡 Propiedad inicializada en el constructor (solución TS2564)
  aporteForm: FormGroup;
  sociosDisponibles: Socio[] = [];
  filteredSocios!: Observable<Socio[]>;

  constructor(private sociosService: SociosService, private router: Router) {
    // 💡 Inicialización en el constructor
    this.aporteForm = new FormGroup({
      // Puedes usar 'string' para numeroAporte si es un código
      numeroAporte: new FormControl('', Validators.required),
      fechaAporte: new FormControl(new Date(), Validators.required),
      // Este FormControl va a contener el objeto Socio completo después de la selección
      idSocio: new FormControl(null, Validators.required),
      // Campo que se llena automáticamente y está deshabilitado
      nombreSocio: new FormControl({ value: '', disabled: false }),
      // nombreSocio: new FormControl(''),
      aportado: new FormControl(0, [Validators.required, Validators.min(0.01)]),
      comentario: new FormControl(''),
    });
  }

  irASocio(): void {
    this.router.navigate(['/socios']);
  }

  limpiarCampos(): void {
    // 1. Usa el método reset() en el FormGroup
    this.aporteForm.reset();

    // 2. Opcional: Re-aplicar valores iniciales si son dinámicos (como la fecha)
    // El método reset() normalmente revierte a los valores dados en el constructor.
    // Si quieres asegurar que la fecha vuelva a ser la de hoy:
    this.aporteForm.patchValue({
      fechaAporte: new Date(),
      aportado: 0
    });
  }


  ngOnInit() {
    // Carga la lista de socios
    this.sociosService.getAllSocios().subscribe(data => {
      this.sociosDisponibles = data;
    });

    // Configura el Autocompletado reactivo
    this.filteredSocios = this.aporteForm.get('idSocio')!.valueChanges.pipe(
      startWith(''),
      // Mapea el valor a string (usa 'nombre' de tu modelo Socio)
      map(value => (typeof value === 'string' ? value : value?.nombre || '')),
      map(name => (name ? this._filter(name) : this.sociosDisponibles.slice()))
    );
  }

  // Busca por nombre o ID (usa 'nombre' e 'id' de Socio)
  private _filter(value: string): Socio[] {
    const filterValue = value.toLowerCase();
    return this.sociosDisponibles.filter(
      socio =>
        socio.nombre.toLowerCase().includes(filterValue) ||
        socio.id.toString().includes(filterValue)
    );
  }

  // Muestra el nombre en el input después de la selección
  displaySocioFn(socio: Socio | null): string {
    return socio ? socio.id.toString() : "";
  }

  // Evento al seleccionar una opción del Autocomplete
  onSocioSelected(event: MatAutocompleteSelectedEvent): void {
    const socioSeleccionado: Socio = event.option.value;

    // Sincroniza el campo de nombre para que el usuario lo vea
    this.aporteForm.get('nombreSocio')!.setValue(socioSeleccionado.nombre);
  }

  onSubmit() {
    if (this.aporteForm.valid) {
      // 1. Obtiene el objeto Socio completo del control 'idSocio'
      const socioSeleccionado: Socio = this.aporteForm.get('idSocio')!.value;

      // 2. Construye el objeto Aporte tipado (Aporte)
      const nuevoAporte: Aporte = {
        // El ID de Aporte es probable que lo genere el backend, 
        // pero si necesitas enviarlo, aquí se incluye
        idAporte: 0, // o algún valor temporal si el backend lo ignora

        // Campos directos
        fechaAporte: this.aporteForm.get('fechaAporte')!.value,
        aportado: this.aporteForm.get('aportado')!.value,
        comentario: this.aporteForm.get('comentario')!.value,

        // Extracción de ID y Nombre del socio seleccionado
        idSocio: socioSeleccionado.id,
        nombreSocio: socioSeleccionado.nombre
      };

      console.log('Objeto Aporte tipado listo para enviar:', nuevoAporte);

      // 3. Llama al servicio para guardar
      // this.sociosService.registrarAporte(nuevoAporte).subscribe(...)
    } else {
      console.log('Formulario inválido. Revise los errores de validación.');
      // Opcional: Marcar todos los campos como 'touched' para mostrar errores
      this.aporteForm.markAllAsTouched();
    }
  }
}

