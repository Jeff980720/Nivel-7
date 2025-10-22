import { Direccion } from "./Direccion";
import { ProductoItem } from "./ListaProductos";
import { Producto } from "./Producto";

export class Sucursales{
    id!:string;
    nombre!:string;
    direccion!:Direccion;
    productosItem!:ProductoItem[];
}