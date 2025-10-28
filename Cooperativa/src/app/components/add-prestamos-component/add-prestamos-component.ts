import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Prestamos } from '../../models/Prestamos';
import { Router } from '@angular/router';
import { map, Observable, startWith, Subject, takeUntil, throwError } from 'rxjs';
import { Socio } from '../../models/Socio';
import { SociosService } from '../../services/socios';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';

// Define la estructura de cada fila de la tabla
interface AmortizacionRow {
  periodo: number;
  saldoInicial: number;
  cuota: number;
  interes: number;
  amortizacion: number;
  saldoFinal: number;
}

@Component({
  selector: 'app-add-prestamos-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatDividerModule,
    MatTableModule,
  ],
  templateUrl: './add-prestamos-component.html',
  styleUrl: './add-prestamos-component.css',
})

export class AddPrestamosComponent {
  addPrestamoForm: FormGroup;
  prestamo!: Prestamos
  sociosDisponibles: Socio[] = [];
  filteredSocios!: Observable<Socio[]>;
  private destroy$: Subject<void> = new Subject<void>();
  // En tu componente (dentro de la clase)
  tablaAmortizacion: AmortizacionRow[] = [];
  displayedColumns: string[] = ['periodo', 'saldoInicial', 'cuota', 'interes', 'amortizacion', 'saldoFinal'];

  constructor(private router: Router, private fb: FormBuilder, private sociosService: SociosService) {
    this.addPrestamoForm = this.fb.group({
      idPrestamos: ['', Validators.required],
      idSocios: ['', Validators.required],
      fechaPrestamo: ['', Validators.required],
      montoPrestado: ['', [Validators.required,
      // REGLA: Decimal o Entero (positivo o negativo), NO CERO (0)
      // Patrón: /^-?(?!0\d*$)\d+(\.\d+)?$/
      Validators.pattern(/^-?(?!0\d*$)\d+(\.\d+)?$/)]
      ],
      plazoPrestamo: ['', [Validators.required,
      // REGLA: Solo números enteros (dígitos del 0 al 9)
      // El patrón /^-?\d+$/ permite un signo de menos opcional (-) seguido de uno o más dígitos.
      Validators.pattern(/^-?\d+$/)]
      ],
      interesPrestamo: ['', [Validators.required,
      // // El patrón /^[0-9]*$/ asegura que solo haya dígitos.
      // Validators.pattern(/^[0-9]*$/),
      // REGLA: Solo números enteros (dígitos del 0 al 9)
      // El patrón /^-?\d+$/ permite un signo de menos opcional (-) seguido de uno o más dígitos.
      Validators.pattern(/^-?\d+$/)]
      ],
      interesMensual: [''],
      interesTotal: [''],
      amortizacion: [''],
      cuota: [''],
      total: [''],
      comentario: ['', Validators.required],
    })
  }

  onSubmit() {
    if (this.addPrestamoForm.valid) {
      this.prestamo = this.addPrestamoForm.value;
      const nuevoPrestamo: Prestamos = {
        idPrestamos: this.addPrestamoForm.get('idPrestamos')!.value,
        idSocios: this.addPrestamoForm.get('idSocios')!.value,
        fechaPrestamo: this.addPrestamoForm.get('fechaPrestamo')!.value,
        montoPrestado: this.addPrestamoForm.get('montoPrestado')!.value,
        plazoPrestamo: this.addPrestamoForm.get('plazoPrestamo')!.value,
        interesPrestamo: this.addPrestamoForm.get('interesPrestamo')!.value,
        interesMensual: this.addPrestamoForm.get('interesMensual')!.value,
        interesTotal: this.addPrestamoForm.get('interesTotal')!.value,
        amortizacion: this.addPrestamoForm.get('amortizacion')!.value,
        cuota: this.addPrestamoForm.get('cuota')!.value,
        total: this.addPrestamoForm.get('total')!.value,
        comentario: this.addPrestamoForm.get('comentario')!.value,
      };
      console.log('Nuevo Pago agregado:', nuevoPrestamo);
    } else {
      console.log('Formulario de Prestamos no es válido');
      this.addPrestamoForm.markAllAsTouched();
    }
  }

  ngOnInit() {

    // Llamar a la función que escuchará los cambios
    this.setupCalculationListener();
    // Carga la lista de socios
    this.sociosService.getAllSocios().subscribe(data => {
      this.sociosDisponibles = data;
    });

    // Configura el Autocompletado reactivo
    this.filteredSocios = this.addPrestamoForm.get('idSocios')!.valueChanges.pipe(
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
    this.addPrestamoForm.get('nombreSocio')!.setValue(socioSeleccionado.nombre);
  }

  irASocio(): void {
    this.router.navigate(['/socios']);
  }

  limpiarCampos(): void {
    // 1. Usa el método reset() en el FormGroup
    this.addPrestamoForm.reset();
  }

  ngOnDestroy(): void {
    // Limpia la suscripción cuando el componente se destruye
    this.destroy$.next();
    this.destroy$.complete();
  }

  setupCalculationListener(): void {
    // Combina todos los controles de entrada clave en un solo observable
    this.addPrestamoForm.valueChanges
      .pipe(
        // Opcional: si el formulario es muy grande, puedes usar debounceTime para evitar cálculos excesivos
        // debounceTime(300), 
        takeUntil(this.destroy$)
      )
      .subscribe(values => {
        // Llama a la función de cálculo cada vez que cambie un valor
        this.calculateLoanDetails(values);
      });
  }

  generateAmortizationTable(monto: number, plazoMeses: number, interesMensualTasa: number, cuota: number): AmortizacionRow[] {
    const tabla: AmortizacionRow[] = [];
    let saldoActual = monto;

    // Recorrer todos los períodos del préstamo
    for (let i = 1; i <= plazoMeses; i++) {
      const interesMes = interesMensualTasa * 100;
      const amortizacionMes = cuota + interesMes;
      const saldoFinal = saldoActual - cuota;

      tabla.push({
        periodo: i,
        saldoInicial: saldoActual,
        cuota: cuota,
        interes: interesMes,
        amortizacion: amortizacionMes,
        saldoFinal: (saldoFinal < 0.01 && saldoFinal > -0.01) ? 0 : saldoFinal // Corrige pequeños errores de punto flotante
      });

      saldoActual = saldoFinal;
    }
    return tabla;
  }

  /**
   * Función que realiza los cálculos principales del préstamo.
   * @param formValues Los valores actuales del FormGroup.
   */
  calculateLoanDetails(formValues: any): void {
    const monto = parseFloat(formValues.montoPrestado);
    const plazoMeses = parseInt(formValues.plazoPrestamo, 10);
    const interesAnual = parseFloat(formValues.interesPrestamo) / 100; // Convertir a decimal (ej: 5% -> 0.05)
    // Se asegura de que los campos clave sean válidos y positivos antes de calcular
    if (monto > 0 && plazoMeses > 0 && interesAnual >= 0) {

      // 1. CALCULAR TASA DE INTERÉS MENSUAL
      const interesMensualTasa = interesAnual * monto / 100; // Tasa efectiva mensual

      // 2. CALCULAR CUOTA FIJA (Fórmula de Amortización Francesa)
      // Cuota = P * [ i * (1 + i)^n ] / [ (1 + i)^n - 1 ]
      // const cuota = monto * (interesMensualTasa * Math.pow(1 + interesMensualTasa, plazoMeses)) /
      //   (Math.pow(1 + interesMensualTasa, plazoMeses) - 1);
      const cuota = monto / plazoMeses + (monto * interesAnual);
      const amort = monto / plazoMeses;
      // 3. CALCULAR INTERÉS TOTAL (simplificado)
      const totalPagar = cuota * plazoMeses;
      const interesTotalCalculado = totalPagar - monto;

      // 4. ACTUALIZAR LOS CAMPOS DE RESULTADO
      this.addPrestamoForm.patchValue({
        interesMensual: (interesMensualTasa * 100).toFixed(2), // Mostramos la tasa mensual en %
        cuota: cuota.toFixed(2), // Redondeamos a 2 decimales
        interesTotal: interesTotalCalculado.toFixed(2),
        amortizacion: amort.toFixed(2), // Redondeamos a 2 decimales
        total: totalPagar.toFixed(2)
        // Nota: La amortización se calcula dentro de una tabla, no como un campo simple
      }, { emitEvent: false }); // Usamos { emitEvent: false } para evitar un loop infinito
      // 5. ¡NUEVO! GENERAR LA TABLA DE AMORTIZACIÓN
      this.tablaAmortizacion = this.generateAmortizationTable(
        monto,
        plazoMeses,
        interesMensualTasa,
        amort
      );

    } else {
      // Limpiar los campos de resultado si la entrada no es válida
      this.addPrestamoForm.patchValue({
        interesMensual: '',
        cuota: '',
        interesTotal: '',
        total: ''
      }, { emitEvent: false });
      this.tablaAmortizacion = []; // Limpiar la tabla si la entrada no es válida
    }
  }

}

