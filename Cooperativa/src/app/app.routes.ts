import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio-component/inicio-component';
import { SociosComponent } from './components/socios-component/socios-component';
import { AddSocioComponent } from './components/add-socio-component/add-socio-component';
import { AddAporteComponent } from './components/add-aporte-component/add-aporte-component';

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
    path: 'add-socio',
    component: AddSocioComponent
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
