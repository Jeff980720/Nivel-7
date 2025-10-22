import { Component, Input } from '@angular/core';
import { Sucursales } from '../../model/Sucursal';
import { SucursalItems } from '../sucursal-items/sucursal-items';

@Component({
  selector: 'sucursal-detalle',
  imports: [SucursalItems],
  templateUrl: './sucursal-detalle.html',
  styleUrl: './sucursal-detalle.css'
})
export class SucursalDetalle {
 @Input() sucursales!:Sucursales[];
}
