# Soft Tributario

Sistema base para la **Fase 1** del proyecto tributario: predeclaración mensual para MYPEs y estudios contables en Perú.

## Objetivo de la fase 1

Construir una primera versión funcional que permita registrar empresas, cargar o importar compras y ventas, calcular IGV mensual, detectar observaciones básicas y generar un resumen previo para el Formulario 621.

## Alcance inicial

- Panel multiempresa para contador o estudio contable.
- Registro de empresas por RUC.
- Control de periodos mensuales.
- Carga inicial de ventas y compras mediante datos simulados o importación futura.
- Cálculo de débito fiscal, crédito fiscal y saldo estimado.
- Motor inicial de reglas tributarias.
- Observaciones sobre compras.
- Resumen tipo predeclaración 621.

## Estructura del proyecto

```text
soft-tributario/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   └── rules-engine.js
├── data/
│   ├── sample-companies.json
│   ├── sample-sales.json
│   ├── sample-purchases.json
│   └── tax-rules.json
└── docs/
    ├── fase-1-modelo.md
    ├── reglas-tributarias.md
    └── modelo-datos.md
```

## Cómo abrir la plantilla

Abre `index.html` directamente en el navegador o súbelo a GitHub Pages/Vercel como prototipo estático.

## Roadmap resumido

1. Fase 1: prototipo funcional con datos de prueba.
2. Fase 2: carga CSV/Excel y validaciones básicas.
3. Fase 3: integración con SIRE/SUNAT.
4. Fase 4: panel multiempresa para estudios contables.
5. Fase 5: API para integraciones ERP.
