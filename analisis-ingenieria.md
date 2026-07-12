# Buenas y Malas Practicas del Proyecto

## Arquitectura

Buenas practicas

1. Modelado de dominio explicito en backend con tipos y modelos de respuesta.
   Evidencia: backend/app/routes.py (lineas 11-15, 22-63, 248, 262, 305, 342).

2. Separacion de logica de negocio en funciones reutilizables (filtros, agregaciones, alertas).
   Evidencia: backend/app/routes.py (lineas 107-143, 150-187, 190-208, 219-240).

3. Frontend desacoplado del backend mediante proxy en desarrollo.
   Evidencia: frontend/vite.config.ts (lineas 9-17).

Malas practicas / riesgos

1. CORS demasiado permisivo (origen comodin + credenciales), riesgo de seguridad y comportamiento inconsistente en navegador.
   Evidencia: backend/app/main.py (lineas 9-12).

2. Estado global mutable en generacion de datos por uso de random.seed dentro de flujo de endpoints.
   Evidencia: backend/app/routes.py (lineas 95-96, 255, 277, 295, 311, 350, 370, 386).

## Naming

Buenas practicas

1. Naming alineado al dominio financiero (operation_type, business_type, summarize_movements, build_top_categories).
   Evidencia: backend/app/routes.py (lineas 11-15, 161, 190, 248).

2. Naming descriptivo en utilidades de frontend (computeKPIs, computeMonthlyData, formatCurrency, formatPercent).
   Evidencia: frontend/src/lib/financial-utils.ts (lineas 21, 36, 69, 78).

Malas practicas / riesgos

1. Mezcla de idiomas en experiencia de usuario y mensajes visibles, afectando consistencia de producto.
   Evidencia:
   - frontend/src/App.tsx (linea 37, mensaje de error en espanol)
   - frontend/src/components/dashboard/dashboard-header.tsx (lineas 15-16, textos en ingles)
   - frontend/src/components/dashboard/kpi-row.tsx (lineas 15-17 y siguientes, etiquetas en ingles)

## Testing

Buenas practicas

1. Suite backend con cobertura funcional de endpoints principales.
   Evidencia: backend/tests/test_routes.py (lineas 29-189).

2. Tests unitarios en frontend para calculos financieros y formato.
   Evidencia: frontend/src/lib/financial-utils.test.ts (lineas 35-114).

Malas practicas / riesgos

1. Faltan pruebas negativas de validacion (fechas invalidas, rangos invertidos, errores de entrada).
   Evidencia: backend/tests/test_routes.py (predominan casos felices en lineas 36-189).

2. No hay evidencia en el repositorio de pruebas de integracion E2E para el flujo completo dashboard + API.
   Evidencia: estructura actual del proyecto (sin carpeta e2e ni scripts dedicados).

## Documentacion

Buenas practicas

1. README bilingue y pasos de ejecucion local claros.
   Evidencia:
   - README.md (lineas 39-50)
   - README.es.md (lineas 39-50)

Malas practicas / riesgos

1. La documentacion describe estructura esperada para agentes, pero esa estructura no existe actualmente en el repo.
   Evidencia:
   - README.md (lineas 28-37)
   - README.es.md (lineas 28-37)
   - ausencia de carpeta .agents en la raiz actual.

2. El archivo RESUME.md replica detalles tecnicos amplios, con riesgo de desactualizacion si no hay proceso de mantenimiento continuo.
   Evidencia: RESUME.md (lineas 1-181).

## DX (Developer Experience)

Buenas practicas

1. Scripts claros de build/lint/test/coverage en frontend.
   Evidencia: frontend/package.json (lineas 6-14).

2. Configuracion de ESLint moderna para TypeScript + React hooks.
   Evidencia: frontend/eslint.config.js (lineas 8-23).

3. Diseño por tokens CSS y sistema visual centralizado.
   Evidencia: frontend/src/index.css (lineas 5-109).

Malas practicas / riesgos

1. Imagen backend y frontend orientadas a desarrollo como default, sin separacion explicita de perfiles para produccion.
   Evidencia:
   - backend/Dockerfile (linea 12, debugpy + reload)
   - frontend/Dockerfile (linea 12, npm run dev)

2. Dependencias Python sin versionado fijo y mezcla de deps de test/runtime.
   Evidencia: backend/requirements.txt (lineas 1-6).
