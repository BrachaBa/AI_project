import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // ייבוא HttpClientModule
import { provideClientHydration } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core'; // הוספת importProvidersFrom
import { FormsModule } from '@angular/forms'; // ייבוא FormsModule

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(), // הוספת HttpClientModule
    importProvidersFrom(FormsModule) // הוספת FormsModule
  ]
};
