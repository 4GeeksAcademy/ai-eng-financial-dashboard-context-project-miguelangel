# Skill: Formateo y Consistencia de Datos Financieros (`financial-data-formatting`)

## 🎯 Objetivo
Garantizar la homogeneidad visual y la precisión matemática en la presentación de balances, métricas (KPIs) y gráficos dentro de la aplicación, forzando el uso exclusivo de las funciones centralizadas de `frontend/src/lib/financial-utils.ts` y previniendo malas prácticas comunes de formateo manual de strings.

## 📥 Inputs
- Archivos dentro de `frontend/src/components/dashboard/` (`kpi-card.tsx`, `kpi-row.tsx`, etc.).
- Funciones auxiliares en `frontend/src/lib/`.
- Operaciones donde se transformen valores numéricos en cadenas de texto descriptivas para el usuario.

## 📤 Outputs Esperados
- Componentes refactorizados que deleguen el formateo visual en los utilitarios designados del sistema.
- Eliminación de símbolos de divisas (`$`, `€`) quemados directamente (hardcoded) en el JSX.

## 📋 Criterios de Aceptación

### 1. Centralización del Formateo Monetario y Porcentajes
- **Regla:** Queda estrictamente prohibido formatear números financieros usando interpolación manual de strings (`$ ${value}` o `${value}%`) dentro del JSX de los componentes.
- **Acción:** Se debe verificar la existencia y el uso correcto de las funciones exportadas en `src/lib/financial-utils.ts` (como `formatCurrency` o `formatPercentage`). Si no existen, el agente debe crearlas usando la API nativa `Intl.NumberFormat('es-ES')` (o la región configurada en el proyecto) para asegurar la localización correcta.

### 2. Tratamiento de Valores Nulos o Indefinidos
- **Regla:** Ante la ausencia de datos financieros en un KPI o barra de gráfico, nunca se debe mostrar un espacio vacío o un error en tiempo de ejecución.
- **Acción:** Forzar un valor fallback por defecto (`$0.00` o `-`) controlando opcionalmente el tipado estricto a través de las interfaces de `financial-types.ts`.

### 3. Sincronización con el Memory Bank
- Toda modificación derivada de esta skill debe asentarse de forma transparente en la documentación de progreso local.