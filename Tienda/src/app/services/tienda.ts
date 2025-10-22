// import { Injectable } from '@angular/core';
// import { Tienda } from '../model/Tienda';
// import { TiendaData } from '../data/tiendaData';

// @Injectable({
//   providedIn: 'root'
// })
// export class TiendaService {
//   private shop:Tienda=TiendaData;
//   constructor(){}

//   //Metodo de la clase para traer los datos
//   getTienda():Tienda{
//     return this.shop
//   }
// }

// import { Injectable } from '@angular/core';
// import { Tienda } from '../model/Tienda';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Sucursales } from '../model/Sucursal';
// import { Empresa } from '../model/Empresa';

// @Injectable({
//   providedIn: 'root'
// })
// export class TiendaService {

//   private apiUrl = 'http://localhost:3000/api';  // URL base del backend

//   constructor(private http: HttpClient) { }

//   getCompany(): Observable<Tienda> {
//     console.log('EmpresaService: solicitando datos del backend...');
//     return this.http.get<Tienda>(`${this.apiUrl}/company`);
//   }

//   getProduct(): Observable<Tienda> {
//     console.log('ProductosService: solicitando datos del backend...');
//     return this.http.get<Tienda>(`${this.apiUrl}/products`);
//   }

//   checkBackendHealth(): Observable<any> {
//     console.log('InvoiceService: verificando salud del backend...');
//     return this.http.get(`${this.apiUrl}/health`);
//   }
// }

// services/tienda.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../model/Empresa';
import { Sucursales } from '../model/Sucursal';
import { Tienda } from '../model/Tienda';

@Injectable({ providedIn: 'root' })
export class TiendaService {
    // ... URLs definidas
      private apiUrl = 'http://localhost:3000/api';  // URL base del backend
    constructor(private http: HttpClient) { }

    // Retorna SOLO la información de la Empresa
    getCompany(): Observable<Tienda> { // <-- Tipo Empresa
        // Ruta al endpoint que devuelve companyData
        return this.http.get<Tienda>(`${this.apiUrl}/company`); 
    }

    // Retorna un objeto que contiene el array de sucursales
    getSucursales(): Observable<{ sucursales: Sucursales[] }> { // <-- Tipo Objeto con sucursales[]
        // Ruta al endpoint que devuelve productData
        return this.http.get<{ sucursales: Sucursales[] }>(`${this.apiUrl}/products`);
    }
}
