import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { TiendaComponent } from './app/components/tienda/tienda.component';

bootstrapApplication(TiendaComponent, appConfig)
  .catch((err) => console.error(err));
