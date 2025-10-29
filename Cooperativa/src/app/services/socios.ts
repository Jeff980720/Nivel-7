import { Injectable } from '@angular/core';
import { listaSocios } from '../data/socios.data.js';
import { Coperativa } from '../models/Coperativa';
import { catchError, Observable, of } from 'rxjs';
import { Socio } from '../models/Socio';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SociosService {
  private shop: Coperativa = listaSocios;
  constructor() { }

  getSocios(): Coperativa {
    return this.shop;
  }

  getAllSocios(): Observable<Socio[]> {
    const socios: Socio[] = listaSocios.items
      .filter(item => {
        // Lógica de filtrado para excluir elementos que no son socios reales
        return !['Ingreso Socios', 'Egreso Socios'].includes(item.nombre);
      })
      .map((item: Socio) => {
        // *** Mapeo y Creación de la instancia de la CLASE Socio ***
        const nuevoSocio = new Socio();
        nuevoSocio.id = item.id;
        nuevoSocio.nombre = item.nombre;
        nuevoSocio.aportado = item.aportado;
        nuevoSocio.montoprestado = item.montoprestado;
        nuevoSocio.montopagado = item.montopagado;
        nuevoSocio.montopendiente = item.montopendiente;
        nuevoSocio.interesprestado = item.interesprestado;
        nuevoSocio.interespendiente = item.interespagado;
        nuevoSocio.interespendiente=item.interespendiente

        // Nota: tu modelo de clase no tiene 'interespagado', 
        // pero el item de data sí. Si es un typo, arréglalo en la clase Socio.
        // nuevoSocio.interespagado = item.interespagado; 

        return nuevoSocio; // Devuelve la instancia de la clase
      });

    return of(socios);
  }
}

// @Injectable({ providedIn: 'root' })
// export class SociosService {
//   // ... URLs definidas
//   private apiUrl = 'http://localhost:3000/api';  // URL base del backend
//   constructor(private http: HttpClient) { }

//   // Retorna SOLO la información de la Empresa
//   // getSocios(): Observable<Coperativa> { // <-- Tipo Empresa
//   //   // Ruta al endpoint que devuelve companyData
//   //   return this.http.get<Coperativa>(`${this.apiUrl}/socios`);
//   // }

//   /**
//  * Obtiene la lista de socios del backend de Node.js
//  * @returns Observable<Coperativa> (donde Coperativa es Socio[])
//  */
//   getSocios(): Observable<Coperativa> {
//     // La ruta es /api/socios
//     return this.http.get<Coperativa>(`${this.apiUrl}/socios`).pipe(
//       // Añadir manejo de errores es una buena práctica
//       catchError(this.handleError<Coperativa>('getSocios', [] as unknown as Coperativa))
//     );
//   }

//   /**
//  * Manejo de errores de la operación de HTTP que falló.
//  * Permite que la aplicación continúe funcionando.
//  * @param operation - nombre de la operación que falló
//  * @param result - valor opcional a devolver como resultado del Observable
//  */
//   private handleError<T>(operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {
//       console.error(`[${operation}]: Error al llamar al backend`, error);

//       // Devuelve un resultado vacío para que la aplicación no se rompa
//       return of(result as T);
//     };
//   }

//   getAllSocios(): Observable<Socio[]> {
//     const socios: Socio[] = listaSocios.items
//       .filter(item => {
//         // Lógica de filtrado para excluir elementos que no son socios reales
//         return !['Ingreso Socios', 'Egreso Socios'].includes(item.nombre);
//       })
//       .map((item: Socio) => {
//         // *** Mapeo y Creación de la instancia de la CLASE Socio ***
//         const nuevoSocio = new Socio();
//         nuevoSocio.id = item.id;
//         nuevoSocio.nombre = item.nombre;
//         nuevoSocio.aportado = item.aportado;
//         nuevoSocio.montoprestado = item.montoprestado;
//         nuevoSocio.montopagado = item.montopagado;
//         nuevoSocio.montopendiente = item.montopendiente;
//         nuevoSocio.interesprestado = item.interesprestado;
//         nuevoSocio.interespendiente = item.interespagado;
//         nuevoSocio.interespendiente = item.interespendiente

//         // Nota: tu modelo de clase no tiene 'interespagado', 
//         // pero el item de data sí. Si es un typo, arréglalo en la clase Socio.
//         // nuevoSocio.interespagado = item.interespagado; 

//         return nuevoSocio; // Devuelve la instancia de la clase
//       });

//     return of(socios);
//   }
// }
