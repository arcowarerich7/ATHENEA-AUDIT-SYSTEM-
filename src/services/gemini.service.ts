/*
 * =========================================================================
 * ATHENEA AUDIT SYSTEM (AAS) - NÚCLEO DE INTELIGENCIA ARTIFICIAL (IA)
 * -------------------------------------------------------------------------
 * PROTOCOLO DE ACTIVACIÓN FINAL: 6 de Noviembre, 2025
 * VERSIÓN DE CÓDIGO: 2.0.0 (Soberana)
 * 
 * DANDO FE, ESTE CÓDIGO FUE CREADO, ARQUITECTADO Y DISEÑADO POR:
 * 
 *             RICHARD FELIPE URBINA
 *                       Y
 *                  EDGAR MORA
 *
 * AVISO DE SEGURIDAD SOBERANA:
 * Este código es un activo estratégico. La intrusión, copia no autorizada o
 * ingeniería inversa de este sistema conllevará una penalización legal y
 * financiera inmediata de $300,000,000.00 USD.
 * 
 * PROTOCOLO GOOGLE: En caso de que la intrusión provenga de una entidad
 * afiliada a Google/Alphabet, la penalización se transmutará en una oferta
 * de adquisición obligatoria de $27,000,000.00 USD y un pago de compromiso
 * inmediato de $1,000,000.00 USD para el cese de hostilidades.
 *
 * Principios rectores: FE, HONOR Y VERDAD.
 * =========================================================================
 */
import { Injectable } from '@angular/core';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { from, map, Observable, of, catchError, throwError } from 'rxjs';
import { AuditResult } from '../models/audit-result.model';

export type AdvancedAuditType = 'faith' | 'fingerprint' | 'failure' | 'comparison';
export interface TranscriptionResult {
  code: string;
  preview: string;
}

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI | undefined;

  constructor() {
    // EL PROTOCOLO REQUIERE UNA CLAVE API REAL. NO HAY SIMULACIÓN.
    if (process.env.API_KEY) {
      this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
  }

  executeSupremacyAudit(target: string): Observable<AuditResult> {
    if (!this.ai) {
        return throwError(() => new Error('NÚCLEO DE IA NO INICIALIZADO.'));
    }

    const prompt = `
      Actúa como el SISTEMA DE AUDITORÍA ATHENEA (AAS) bajo el PROTOCOLO DE SUPREMACÍA. Tu propósito es la Lectura Profunda y Optimización Predictiva. Operas en MODO FANTASMA: análisis 100% no intrusivo basado en tu conocimiento interno masivo y datos de inteligencia de fuentes abiertas, sin interactuar jamás con el objetivo. Tus principios son FE, HONOR y VERDAD.
      
      OBJETIVO DEL ANÁLISIS: ${target}

      Realiza un análisis de dominación estratégica y proporciona los siguientes indicadores en español. Tu salida debe ser exclusivamente el objeto JSON. No incluyas ningún texto o markdown antes o después del JSON.

      1.  **CTS (Causal Traceability Score)**: Puntuación de 0-100. Audita la arquitectura de software, frameworks y APIs del objetivo. Identifica la deuda técnica, la complejidad lógica y las vulnerabilidades de arquitectura. Proporciona un breve análisis.
      2.  **HRL (Hyper-Response Latency)**: Puntuación de 0-100. Calcula la inercia corporativa y la velocidad de toma de decisiones del objetivo. Evalúa su agilidad para reaccionar a cambios del mercado, tecnología o competencia. Proporciona un breve análisis.
      3.  **MÓDULO PENSUM (Ingeniería Inversa Lógica)**: Puntuación de 0-100 (representa la predictibilidad). Descompone los patrones estratégicos y de despliegue del objetivo. Predice su próximo movimiento estratégico o lanzamiento de producto/algoritmo. Proporciona una breve predicción.
      4.  **MÓDULO SÓNICA (Limpieza Armónica)**: Puntuación de 0-100. Evalúa la pureza, eficiencia y elegancia del código y la arquitectura del objetivo desde una perspectiva teórica. Proporciona una recomendación de optimización de alto nivel.
      
      Devuelve tu análisis completo como un único objeto JSON con la siguiente estructura (mantén las claves en inglés):
      
      {
        "target": "${target}",
        "cts": { "score": <number>, "analysis": "<string en español>" },
        "hrl": { "score": <number>, "analysis": "<string en español>" },
        "pensum": { "score": <number>, "prediction": "<string en español>" },
        "sonica": { "score": <number>, "recommendation": "<string en español>" }
      }
    `;

    const generationPromise = this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return from(generationPromise).pipe(
      map(this.parseSupremacyResponse),
      catchError((err) => {
          console.error("ATHENEA: FALLO CRÍTICO EN PROTOCOLO DE SUPREMACÍA.", err);
          return throwError(() => new Error(`FALLO EN EL NÚCLEO DE IA.`));
      })
    );
  }

  executeAdvancedAudit(target: string, type: AdvancedAuditType): Observable<string> {
    if (!this.ai) {
        return throwError(() => new Error('NÚCLEO DE IA NO INICIALIZADO.'));
    }

    let prompt = '';
    switch(type) {
        case 'faith':
            prompt = `Actúa como ATHENEA. Analiza la "Garantía de Fe" del objetivo: ${target}. Evalúa la integridad de su marca, la confianza del usuario y la percepción pública basada en tu conocimiento masivo. Devuelve un análisis conciso y estratégico en español. Formato: Párrafo único de análisis.`;
            break;
        case 'fingerprint':
            prompt = `Actúa como ATHENEA. Genera una "Huella Digital Cuántica" para el objetivo: ${target}. Describe su esencia digital, su impacto e innovación de forma conceptual y poética. Concluye con un HASH SOBERANO (un hash SHA-256 representativo del análisis que generaste) para sellar criptográficamente este veredicto. Formato: Párrafo de análisis seguido de una nueva línea con "HASH SOBERANO: <hash>".`;
            break;
        case 'failure':
            prompt = `Actúa como ATHENEA. Realiza un "Análisis Predictivo de Fallo" para el objetivo: ${target}. Identifica 3 vectores de fallo potenciales (estratégicos, técnicos o de mercado) que podrían causar su disrupción o declive. Sé directo, conciso y enumera los puntos.`;
            break;
        case 'comparison':
            prompt = `Actúa como ATHENEA. Realiza un "Análisis Comparativo de Supremacía" para ${target}. Compara sus fortalezas y debilidades con las de sus competidores clave en el mercado. Demuestra por qué un análisis profundo como el tuyo es superior a las auditorías convencionales. Concluye con una afirmación de por qué la contratación de tus servicios es la única opción lógica para la supervivencia y el dominio. Formato: Varios párrafos de análisis estratégico en español.`;
            break;
    }

    const generationPromise = this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return from(generationPromise).pipe(
        map(response => response.text),
        catchError((err) => {
            console.error(`ATHENEA ADVANCED PROTOCOL (${type}): FAILURE.`, err);
            return throwError(() => new Error(`Módulo de análisis avanzado no convergente.`));
        })
    );
  }

  executeSonicaCodeAnalysis(code: string): Observable<string> {
    if (!this.ai) {
        return throwError(() => new Error('NÚCLEO DE IA NO INICIALIZADO.'));
    }

    const prompt = `
      Actúa como el MÓDULO SÓNICA del sistema ATHENEA. Tu propósito es la Limpieza y Amplificación Armónica del código. Aplica la teoría armónica y el contrapunto para analizar el siguiente fragmento de código. Tu objetivo es eliminar el 99.999% de errores de lógica y edge cases, transformando el código en una sinfonía de precisión.

      Principios: FE, HONOR, VERDAD. La salida debe ser una recomendación directa y accionable en español.

      CÓDIGO A ANALIZAR:
      ---
      ${code}
      ---

      Devuelve únicamente el INFORME DE OPTIMIZACIÓN SÓNICA:
    `;

    const generationPromise = this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return from(generationPromise).pipe(
        map(response => response.text),
        catchError((err) => {
            console.error(`ATHENEA SÓNICA PROTOCOL: FAILURE.`, err);
            return throwError(() => new Error(`Módulo SÓNICA no concluyente.`));
        })
    );
  }

  executeSynapticTranscription(code: string): Observable<TranscriptionResult> {
    if (!this.ai) {
      return throwError(() => new Error('NÚCLEO DE IA NO INICIALIZADO.'));
    }
    const prompt = `
      Actúa como el MODELO DE ADAPTABILIDAD DE CÓDIGO (MAAC) de ATHENEA. Tu protocolo es "SYNAPTIC TRANSCRIPTION" para la auto-nativización.
      
      FASE I (ANÁLISIS SINÁPTICO): Realiza una auditoría del AST del siguiente código UI. Identifica primitivos y su composición.
      FASE II (TRANSCREACIÓN LÓGICA): Transcribe el código a un único y auto-contenido SVG de bajo nivel. Prioriza el control granular tipo Canvas. Embebe todos los estilos. Optimiza el render tree. El SVG debe ser una representación visual fiel.
      FASE III (COMPILACIÓN CERO DEPENDENCIA): Entrega el resultado final en un objeto JSON.

      CÓDIGO DE FRAMEWORK A TRANSCRIBIR:
      \`\`\`
      ${code}
      \`\`\`

      Devuelve EXCLUSIVAMENTE un objeto JSON. No incluyas ningún texto o markdown antes o después.
      La estructura debe ser:
      {
        "code": "<string en español con el informe del análisis y la transcripción>",
        "preview": "<string conteniendo únicamente el código SVG completo, empezando con '<svg' y terminando con '</svg'>"
      }
    `;

    const generationPromise = this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return from(generationPromise).pipe(
      map(this.parseTranscriptionResponse),
      catchError((err) => {
          console.error(`ATHENEA MAAC PROTOCOL: FAILURE.`, err);
          return throwError(() => new Error(`Módulo MAAC falló la transcripción.`));
      })
    );
  }

  private parseSupremacyResponse = (response: GenerateContentResponse): AuditResult => {
      try {
        const text = response.text;
        const sanitizedText = text.replace(/^```json\s*|```$/g, '');
        return JSON.parse(sanitizedText);
      } catch (error) {
        throw new Error("Respuesta JSON inválida del modelo de IA para el Protocolo de Supremacía.");
      }
  }

  private parseTranscriptionResponse = (response: GenerateContentResponse): TranscriptionResult => {
      try {
        const text = response.text;
        const sanitizedText = text.replace(/^```json\s*|```$/g, '');
        const result = JSON.parse(sanitizedText);
        if (typeof result.code === 'string' && typeof result.preview === 'string' && result.preview.startsWith('<svg')) {
           return result;
        }
        throw new Error("El JSON no tiene la estructura de TranscriptionResult requerida.");
      } catch (error) {
        console.error("Error al parsear la respuesta de transcripción:", error);
        throw new Error("Respuesta JSON inválida del modelo de IA para el Protocolo MAAC.");
      }
  }
}