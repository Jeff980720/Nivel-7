import { Component, Input } from '@angular/core';
import { Producto } from '../../model/Producto';
import { ProductoItem } from '../../model/ListaProductos';

@Component({
  selector: 'tr[sucursal-items]',
  imports: [],
  templateUrl: './sucursal-items.html',
  styleUrl: './sucursal-items.css'
})
export class SucursalItems {
@Input() item!:ProductoItem;
}
