import { Injectable } from '@angular/core';
import { listaSocios } from '../data/socios.data';
import { Coperativa } from '../models/Coperativa';

@Injectable({
  providedIn: 'root'
})
export class SociosService {
  private shop: Coperativa = listaSocios;
  constructor() { }

  getSocios(): Coperativa {
    return this.shop;
  }
}
