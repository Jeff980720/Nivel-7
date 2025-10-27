import { Injectable } from '@angular/core';
import { listaSocios } from '../data/socios.data';
import { Coperativa } from '../models/Coperativa';
import { Observable, of } from 'rxjs';
import { Socio } from '../models/Socio';

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
