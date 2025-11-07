import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

interface ServiceTier {
  level: string;
  name: string;
  price: string;
  priceDetails: string;
  priceUSD: string;
  isFlagship: boolean;
  deliverables: string[];
  ourBenefits: { icon: string; text: string; }[];
  competitionDelivers: string[];
}

@Component({
  selector: 'app-strategic-offer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full">
      <header class="text-center mb-8">
        <h2 class="text-xl sm:text-2xl font-bold text-cyan-300 tracking-widest uppercase">
          Protocolo de Adquisición de Supremacía
        </h2>
        <p class="text-cyan-400/70 text-sm mt-1">
          La victoria no es una opción, es un veredicto. Elija su vector de inteligencia.
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        @for (tier of serviceTiers(); track tier.name) {
          <div 
            class="service-tier-card"
            [class.flagship]="tier.isFlagship">
            
            <div class="card-header">
              <span class="level-text">{{ tier.level }}</span>
              <h3 class="name-text">{{ tier.name }}</h3>
              <div class="price-container">
                <span class="price-amount">{{ tier.price }}</span>
                <span class="price-details">{{ tier.priceDetails }}</span>
              </div>
              <span class="price-usd">{{ tier.priceUSD }}</span>
            </div>

            <div class="card-body">
              <div>
                <h4 class="section-title-us">ENTREGABLES DE SUPREMACÍA</h4>
                <ul class="comparison-list">
                  @for (item of tier.deliverables; track item) {
                    <li class="us-item">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <span>{{ item }}</span>
                    </li>
                  }
                </ul>
              </div>

              <div>
                <h4 class="section-title-us">BENEFICIOS ESTRATÉGICOS (PROTOCOLO ATHENEA)</h4>
                <ul class="comparison-list">
                    @for (item of tier.ourBenefits; track item.text) {
                        <li class="us-item">
                            <div class="h-4 w-4 flex-shrink-0" [innerHTML]="sanitizer(item.icon)"></div>
                            <span>{{ item.text }}</span>
                        </li>
                    }
                </ul>
              </div>

              <div>
                <h4 class="section-title-them">ENTREGABLES CONVENCIONALES (LA COMPETENCIA)</h4>
                <ul class="comparison-list">
                  @for (item of tier.competitionDelivers; track item) {
                    <li class="them-item">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                      </svg>
                      <span>{{ item }}</span>
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .service-tier-card {
      @apply bg-black/40 border border-cyan-800/60 rounded-lg flex flex-col transition-all duration-300 h-full;
    }
    .service-tier-card:hover {
        @apply border-cyan-500/80 transform -translate-y-2 shadow-2xl shadow-cyan-500/20;
    }
    .flagship {
      @apply border-2 border-amber-400 relative;
      box-shadow: 0 0 30px rgba(251, 191, 36, 0.4), inset 0 0 20px rgba(251, 191, 36, 0.2);
    }
     .flagship:hover {
      @apply shadow-2xl shadow-amber-400/30;
    }
    .card-header {
      @apply p-6 text-center border-b border-cyan-800/60;
    }
    .flagship .card-header { @apply border-amber-400/60; }
    .level-text { @apply text-xs font-bold text-cyan-400 tracking-[0.2em] uppercase; }
    .flagship .level-text { @apply text-amber-300; }
    .name-text { @apply text-xl font-bold text-white mt-1; }
    .price-container { @apply mt-4; }
    .price-amount { @apply text-4xl font-bold text-cyan-200; }
    .flagship .price-amount { @apply text-amber-200; }
    .price-details { @apply block text-xs text-cyan-400/70 uppercase tracking-wider; }
    .price-usd { @apply block text-xs text-cyan-500 mt-2; }
    .flagship .price-usd { @apply text-amber-500; }
    
    .card-body {
      @apply p-6 flex-grow space-y-6;
    }
    .section-title-us {
      @apply font-bold text-cyan-300 text-sm mb-3 tracking-wider;
    }
    .flagship .section-title-us { @apply text-amber-200; }
    .section-title-them {
      @apply font-bold text-gray-500 text-sm mb-3 tracking-wider;
    }
    .comparison-list {
      @apply space-y-2 text-xs;
    }
    .us-item {
      @apply flex items-start gap-3 text-cyan-200;
    }
    .us-item svg { @apply text-green-400; }
    .flagship .us-item svg { @apply text-amber-400; }

    .them-item {
      @apply flex items-start gap-3 text-gray-400 italic;
    }
    .them-item svg { @apply text-red-500; }
  `]
})
export class StrategicOfferComponent {
    // Sanitizer bypass is not available in templates. This is a safe workaround for trusted SVG content.
    sanitizer(svg: string) { return svg; }

    serviceTiers = signal<ServiceTier[]>([
    {
      level: 'Nivel 1',
      name: 'INFORME OPERATIVO',
      price: '$45,000',
      priceDetails: 'MXN / PAGO ÚNICO',
      priceUSD: '~ $2,500 USD',
      isFlagship: false,
      deliverables: [
        'Análisis de M365 Business y su configuración.',
        'Auditoría de seguridad base en Azure AD.',
        'Evaluación de gestión de Endpoints (Intune).',
        'Informe de Resiliencia y Continuidad Operativa.'
      ],
      ourBenefits: [
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>', text: 'Línea Base de Ciber-Soberanía' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>', text: 'Optimización de Flujo Colaborativo' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002-2h2a2 2 0 002 2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>', text: 'Reportes de Inteligencia Operativa' },
      ],
      competitionDelivers: [
        'Reporte básico de licenciamiento Office',
        'Checklist de configuración de email',
        'Informe de tickets de soporte resueltos',
        'Cotización de licencias'
      ]
    },
    {
      level: 'Nivel 2',
      name: 'INFORME TÁCTICO AVANZADO',
      price: '$135,000',
      priceDetails: 'MXN / PAGO ÚNICO',
      priceUSD: '~ $7,500 USD',
      isFlagship: false,
      deliverables: [
        'Auditoría de despliegue y licenciamiento E3/E5',
        'Análisis de protocolos de seguridad (Defender, Sentinel)',
        'Evaluación de potencial de automatización (Power Platform)',
        'Dossier de Inteligencia de Amenazas Proactiva'
      ],
      ourBenefits: [
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>', text: 'Anulación de Amenazas (Zero-Day)' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>', text: 'Aceleración Cuántica de Procesos' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.75-2.25M21 18l-3.75-2.25m0 0a11.955 11.955 0 01-5.814-5.519L9 11.25" /></svg>', text: 'Generación de Inteligencia de Negocio' },
      ],
      competitionDelivers: [
        'Inventario de licencias E3/E5 activas',
        'Reporte genérico de alertas de seguridad',
        'Resumen de logs de actividad mensual',
        'Análisis de vulnerabilidades superficial'
      ]
    },
    {
      level: 'Nivel 3',
      name: 'DOSSIER DE HEGEMONÍA',
      price: 'Desde $360,000',
      priceDetails: 'MXN / PAGO ÚNICO',
      priceUSD: '~ DESDE $20,000 USD',
      isFlagship: true,
      deliverables: [
        'Análisis exhaustivo del stack de seguridad MS (Full E5)',
        'Blueprint para desarrollo de IA/ML en Azure',
        '**Dossier estratégico del Sistema ATHENEA**',
        'Análisis predictivo de vectores de fallo sistémico'
      ],
      ourBenefits: [
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 1.5v21m-8.25-6.75h16.5M3.75 8.25h16.5" /></svg>', text: 'Supremacía Predictiva (ATHENEA)' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M12 14.75L6.236 18M12 14.75L17.764 18" /></svg>', text: 'Soberanía Estratégica Total' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-3.866-3.134-7-7-7S5.5 8.134 5.5 12c0 1.932.784 3.682 2.05 4.95a5.5 5.5 0 007.9 0A7.03 7.03 0 0019.5 12z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>', text: 'Claridad Absoluta. Cero Incertidumbre' },
      ],
      competitionDelivers: [
        'Informe de consultoría de "alto nivel"',
        'Propuesta de proyecto de Business Intelligence',
        'Análisis de riesgos genérico',
        '**NO EXISTE UN EQUIVALENTE DIRECTO**'
      ]
    },
  ]);
}
