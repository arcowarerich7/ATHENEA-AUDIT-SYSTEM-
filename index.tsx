
import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';

import { AppComponent } from './src/app.component';

// Protocolo de Transmigración Soberana: Inscribir el Núcleo de Resiliencia (Service Worker)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('ATHENEA: Núcleo de Resiliencia registrado con éxito. Protocolo de Transmigración activo.');
      })
      .catch(err => {
        console.error('ATHENEA: Fallo en el registro del Núcleo de Resiliencia:', err);
      });
  });
}


bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient()
  ],
}).catch(() => { /* Supresión de errores de terminal según protocolo */ });

// AI Studio always uses an `index.tsx` file for all project types.