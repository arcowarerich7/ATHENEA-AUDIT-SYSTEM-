import { ChangeDetectionStrategy, Component, computed, input, InputSignal } from '@angular/core';
import { AuditResult } from '../models/audit-result.model';

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-radar-chart',
  standalone: true,
  template: `
    <svg [attr.viewBox]="'0 0 ' + size + ' ' + size" class="w-full h-full">
      <defs>
        <filter id="radar-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"></feGaussianBlur>
          <feMerge>
            <feMergeNode in="coloredBlur"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs>

      <!-- Grid lines and labels -->
      @for (axis of axes(); track axis.label; let i = $index) {
        <line [attr.x1]="center" [attr.y1]="center" [attr.x2]="axis.x" [attr.y2]="axis.y" stroke="rgba(14, 165, 233, 0.2)" />
        <text [attr.x]="axis.labelX" [attr.y]="axis.labelY" fill="rgba(14, 165, 233, 0.7)" font-size="10" text-anchor="middle" dominant-baseline="middle">{{ axis.label }}</text>
      }

      <!-- Concentric polygons -->
      @for (level of [25, 50, 75, 100]; track level) {
        <polygon [attr.points]="gridLevels()[level]" fill="none" stroke="rgba(14, 165, 233, 0.2)" stroke-width="0.5" />
      }

      <!-- Data polygon -->
      <polygon [attr.points]="points()" fill="rgba(14, 165, 233, 0.3)" stroke="#0ea5e9" stroke-width="2" [style.filter]="'url(#radar-glow)'" />

    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadarChartComponent {
  data: InputSignal<AuditResult | null> = input.required<AuditResult | null>();
  
  readonly size = 200;
  readonly center = this.size / 2;
  readonly radius = this.size / 2 - 20; // Padding for labels
  private readonly labels = ['CTS', 'HRL', 'PENSUM', 'SÓNICA'];
  private readonly angleSlice = (Math.PI * 2) / this.labels.length;

  private getPoint(value: number, index: number): Point {
    const angle = this.angleSlice * index - Math.PI / 2; // Start from top
    const r = (this.radius * value) / 100;
    return {
      x: this.center + r * Math.cos(angle),
      y: this.center + r * Math.sin(angle),
    };
  }

  axes = computed(() => {
    return this.labels.map((label, i) => {
      const point = this.getPoint(100, i);
      const labelPoint = this.getPoint(115, i); // Position labels outside the max radius
      return {
        label,
        x: point.x,
        y: point.y,
        labelX: labelPoint.x,
        labelY: labelPoint.y,
      };
    });
  });

  gridLevels = computed(() => {
    const levels: { [key: number]: string } = {};
    [25, 50, 75, 100].forEach(level => {
      levels[level] = this.labels.map((_, i) => {
        const p = this.getPoint(level, i);
        return `${p.x},${p.y}`;
      }).join(' ');
    });
    return levels;
  });

  points = computed(() => {
    const data = this.data();
    if (!data) return '';

    const values = [
      data.cts.score,
      data.hrl.score,
      data.pensum.score,
      data.sonica.score,
    ];

    return values.map((value, i) => {
      const p = this.getPoint(value, i);
      return `${p.x},${p.y}`;
    }).join(' ');
  });
}
