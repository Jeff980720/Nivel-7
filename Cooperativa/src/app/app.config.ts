import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// Importa las rutas que acabamos de definir
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideBrowserGlobalErrorListeners(),
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes)// ¡Aquí le decimos a Angular que use nuestras rutas!
//     // otros providers si los tienes...
//   ]
// };

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()  // Habilita HttpClient
  ]
};
