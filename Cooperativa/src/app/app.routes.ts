import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio-component/inicio-component';
import { SociosComponent } from './components/socios-component/socios-component';
import { AddSocioComponent } from './components/add-socio-component/add-socio-component';
import { AddAporteComponent } from './components/add-aporte-component/add-aporte-component';
import { AddPagosComponent } from './components/add-pagos-component/add-pagos-component';
import { AddPrestamosComponent } from './components/add-prestamos-component/add-prestamos-component';
import { CajaComponent } from './components/caja-component/caja-component';
import { ListaAporteComponent } from './components/lista-aporte-component/lista-aporte-component';
import { ListaPrestamosComponent } from './components/lista-prestamos-component/lista-prestamos-component';
import { ListaPagosComponent } from './components/lista-pagos-component/lista-pagos-component';
import { ListaCajaComponent } from './components/lista-caja-component/lista-caja-component';

/**
 * Este es el "mapa" de navegación.
 */
export const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'socios',
    component: SociosComponent
  },
  {
    path: 'aportes',
    component: AddAporteComponent
  },
    {
    path: 'pagos',
    component: AddPagosComponent
  },
    {
    path: 'prestamos',
    component: AddPrestamosComponent
  },
    {
    path: 'caja',
    component: CajaComponent
  },
  {
    path: 'add-socio',
    component: AddSocioComponent
  },
    {
    path: 'listaportes',
    component: ListaAporteComponent
  },
    {
    path: 'litaprestamos',
    component: ListaPrestamosComponent
  },
    {
    path: 'listapagos',
    component: ListaPagosComponent
  },
    {
    path: 'listacaja',
    component: ListaCajaComponent
  },
  {
    path: '', // Si la URL está vacía
    redirectTo: '/inicio', // Redirige a /inicio
    pathMatch: 'full'
  },
  {
    path: '**', // Si la URL no coincide con nada (Error 404)
    redirectTo: '/inicio',
    pathMatch: 'full'
  }
];
