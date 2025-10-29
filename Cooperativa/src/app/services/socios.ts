import { Injectable } from '@angular/core';
import { listaSocios } from '../data/socios.data.js';
import { Coperativa } from '../models/Coperativa';
import { Observable, of } from 'rxjs';
import { Socio } from '../models/Socio';
import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class SociosService {
//   private shop: Coperativa = listaSocios;
//   constructor() { }

//   getSocios(): Coperativa {
//     return this.shop;
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
//         nuevoSocio.interespendiente=item.interespendiente

//         // Nota: tu modelo de clase no tiene 'interespagado', 
//         // pero el item de data sí. Si es un typo, arréglalo en la clase Socio.
//         // nuevoSocio.interespagado = item.interespagado; 

//         return nuevoSocio; // Devuelve la instancia de la clase
//       });

//     return of(socios);
//   }
// }

@Injectable({ providedIn: 'root' })
export class SociosService {
  // ... URLs definidas
  private apiUrl = 'http://localhost:3000/api';  // URL base del backend
  constructor(private http: HttpClient) { }

  // Retorna SOLO la información de la Empresa
  getSocios(): Observable<Coperativa> { // <-- Tipo Empresa
    // Ruta al endpoint que devuelve companyData
    return this.http.get<Coperativa>(`${this.apiUrl}/socios`);
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
        nuevoSocio.interespendiente = item.interespendiente

        // Nota: tu modelo de clase no tiene 'interespagado', 
        // pero el item de data sí. Si es un typo, arréglalo en la clase Socio.
        // nuevoSocio.interespagado = item.interespagado; 

        return nuevoSocio; // Devuelve la instancia de la clase
      });

    return of(socios);
  }
}
