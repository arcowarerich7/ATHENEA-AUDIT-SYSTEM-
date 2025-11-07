export interface SupremacyIndicator {
  score: number;
  analysis: string;
}

export interface PensumIndicator {
  score: number;
  prediction: string;
}

export interface SonicaIndicator {
  score: number;
  recommendation: string;
}

export interface AuditResult {
  target: string;
  cts: SupremacyIndicator;
  hrl: SupremacyIndicator;
  pensum: PensumIndicator;
  sonica: SonicaIndicator;
  timestamp?: number;
}