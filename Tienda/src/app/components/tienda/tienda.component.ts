// import { Component, OnInit } from '@angular/core';
// import { TiendaService } from '../../services/tienda';
// import { Tienda } from '../../model/Tienda';
// import { CommonModule } from '@angular/common';
// import { EmpresaView } from "../empresa-view/empresa-view";
// import { SucursalDetalle } from "../sucursal-detalle/sucursal-detalle";

// @Component({
//   selector: 'app-tienda',
//   imports: [CommonModule, EmpresaView, SucursalDetalle],
//   templateUrl: './tienda.component.html',
//   styleUrl: './tienda.css'
// })
// export class TiendaComponent implements OnInit {
//   tienda!: Tienda;
//   totalStock: number = 0;

//   //private service:TiendaService=new TiendaService();
//   constructor(private service: TiendaService) { }
//   ngOnInit(): void {
//     this.tienda = this.service.getTienda();

//     // Calcular el total de stock
//     this.totalStock = this.tienda.sucursales.reduce((total, sucursal) => {
//       const subtotal = sucursal.productosItem.reduce((sum, item) => sum + item.cantidad, 0);
//       return total + subtotal;
//     }, 0);
//   }
// }
// export { Tienda };

// import { Component, OnInit } from '@angular/core';
// import { TiendaService } from '../../services/tienda';
// import { Tienda } from '../../model/Tienda';
// import { CommonModule } from '@angular/common';
// import { EmpresaView } from "../empresa-view/empresa-view";
// import { SucursalDetalle } from "../sucursal-detalle/sucursal-detalle";
// import { Sucursales } from '../../model/Sucursal';
// import { Empresa } from '../../model/Empresa';

// @Component({
//   selector: 'app-tienda',
//   imports: [CommonModule, EmpresaView, SucursalDetalle],
//   templateUrl: './tienda.component.html',
//   styleUrl: './tienda.css',
//   // providers: [TiendaService] // <-- Add this line if not provided in root
// })
// export class TiendaComponent implements OnInit {

//   tienda!: Tienda;
//   totalStock: number = 0;

//   constructor(private service: TiendaService) { }

//   ngOnInit(): void {
//     this.service.getCompany().subscribe(
//       (data: Tienda) => {
//         this.tienda = data;
//         console.log('Datos recibidos del backend:', data);

//       },
//       (error) => {
//         console.error('Error al obtener datos del backend:', error);
//         console.error('Asegúrate de que el backend esté en puerto 3000');
//       }
//     );

//     this.service.getProduct().subscribe(
//       (data: Tienda) => {
//         this.tienda = data;
//         console.log('Productos recibidos del backend:', data);

//         // Calcular el total de stock
//         this.totalStock = this.tienda.sucursales.reduce((total, sucursal) => {
//           const subtotal = sucursal.productosItem.reduce((sum, item) => sum + item.cantidad, 0);
//           return total + subtotal;
//         }, 0);
//       },
//       (error) => {
//         console.error('Error al obtener productos del backend:', error);
//         console.error('Asegúrate de que el backend esté en puerto 3000');
//       });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { TiendaService } from '../../services/tienda';
import { Tienda } from '../../model/Tienda';
import { CommonModule } from '@angular/common';
import { EmpresaView } from "../empresa-view/empresa-view";
import { SucursalDetalle } from "../sucursal-detalle/sucursal-detalle";
import { forkJoin } from 'rxjs'; // 👈 Asegúrate de importar forkJoin
// ... otras importaciones

@Component({
  selector: 'app-tienda',
  imports: [CommonModule, EmpresaView, SucursalDetalle],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.css',
  // providers: [TiendaService] // <-- Add this line if not provided in root
})
export class TiendaComponent implements OnInit {

  tienda!: Tienda; // 👈 Inicializa el objeto
  totalStock: number = 0;

  constructor(private service: TiendaService) { }

  ngOnInit(): void {
    // Ejecuta ambas llamadas al mismo tiempo y espera que ambas completen
    forkJoin([
      this.service.getCompany(), // Devuelve Observable<Empresa>
      this.service.getSucursales()  // Devuelve Observable<{ sucursales: Sucursal[] }>
    ]).subscribe({
      next: ([empresaData, productData]) => {
        // 1. Asigna los datos de la Empresa
        this.tienda = { empresa: empresaData.empresa, sucursales: [] }; 

        // 2. Asigna el array de Sucursales (que viene en la propiedad 'sucursales' de productData)
        this.tienda.sucursales = productData.sucursales; 

        console.log('Tienda completa cargada:', this.tienda);
        console.log('Empresa:', this.tienda.empresa.nombre);
        console.log('Sucursales cargadas:', this.tienda.sucursales.length); // ¡Ahora sí aparecerán!

        // Calcular el total de stock
        this.totalStock = this.tienda.sucursales.reduce((total, sucursal) => {
          // Nota: El tipo 'Sucursales' de tu importación original debe ser 'Sucursal' (singular) si seguiste la convención que definimos
          const subtotal = sucursal.productosItem.reduce((sum, item) => sum + item.cantidad, 0);
          return total + subtotal;
        }, 0);
      },
      error: (error) => {
        console.error('Error al obtener datos combinados del backend:', error);
      }
    });
  }
}
