import { ChangeDetectionStrategy, Component, computed, input, InputSignal } from '@angular/core';

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-line-chart',
  standalone: true,
  template: `
    <svg viewBox="0 0 400 200" class="w-full h-full">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"></feGaussianBlur>
          <feMerge>
            <feMergeNode in="coloredBlur"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
        <radialGradient id="center-glow">
          <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Grid lines -->
      @for (y of [50, 100, 150]; track y) {
        <line [attr.x1]="0" [attr.y1]="y" [attr.x2]="400" [attr.y2]="y" stroke="rgba(14, 165, 233, 0.1)" stroke-width="1" />
      }

      <!-- Center orbital element -->
      <circle cx="200" cy="100" r="60" fill="url(#center-glow)" />
      <circle cx="200" cy="100" r="30" fill="none" stroke="rgba(14, 165, 233, 0.4)" stroke-width="1.5" />
      <circle cx="200" cy="100" r="45" fill="none" stroke="rgba(14, 165, 233, 0.3)" stroke-width="1" transform="rotate(45 200 100)" />
       <circle cx="200" cy="100" r="55" fill="none" stroke="rgba(14, 165, 233, 0.2)" stroke-width="0.5" transform="rotate(-30 200 100)" />

      <!-- Data Line -->
      <path [attr.d]="linePath()" fill="none" stroke="#0ea5e9" stroke-width="2" [style.filter]="'url(#glow)'" />
      
      <!-- Data Points -->
      @for(point of points(); track $index) {
          <circle [attr.cx]="point.x" [attr.cy]="point.y" r="4" fill="#010409" stroke="#fbbf24" stroke-width="2" />
      }

      <!-- Decorative Text -->
      <text x="20" y="30" fill="rgba(14, 165, 233, 0.3)" font-size="9" font-family="monospace">An¡un;za S;rudura WCAG;</text>
      <text x="280" y="45" fill="rgba(14, 165, 233, 0.3)" font-size="9" font-family="monospace">Senteunáriz stacttos y</text>
      <text x="50" y="170" fill="rgba(14, 165, 233, 0.3)" font-size="9" font-family="monospace">S;valient;za dates, sinn;tét;cos</text>
      <text x="200" y="185" fill="rgba(14, 165, 233, 0.3)" font-size="9" font-family="monospace">Estableciendo conexión quántica...</text>

    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent {
  data: InputSignal<number[]> = input.required<number[]>();

  private readonly width = 400;
  private readonly height = 200;
  private readonly padding = 20;

  points = computed(() => {
    const data = this.data();
    if (!data || data.length === 0) return [];
    
    const xStep = (this.width - this.padding * 2) / (data.length - 1);
    
    return data.map((d, i) => {
      const x = this.padding + i * xStep;
      const y = this.height - (d / 100) * (this.height - this.padding * 2) - this.padding;
      return { x, y };
    });
  });

  linePath = computed(() => {
    const points = this.points();
    if (points.length === 0) return '';
    
    // Genera una ruta de polilínea (M = Mover a, L = Línea a).
    // Esto es robusto y coincide con la estética de línea recta de la imagen de referencia.
    return points.map((p, i) => (i === 0 ? 'M' : 'L') + ` ${p.x} ${p.y}`).join(' ');
  });
}