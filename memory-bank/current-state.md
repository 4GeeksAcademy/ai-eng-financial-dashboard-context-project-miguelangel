# Current State - Estado Actual del Proyecto

## Lo que ya Funciona (Estado Estable)
- **Backend:** Endpoints operativos para `/api/metrics`, `/api/metrics/summary` y `/api/metrics/comparison` devolviendo esquemas Pydantic válidos.
- **Frontend:** Interfaz de usuario responsiva con KPIs dinámicos, gráficos financieros interactivos (Recharts) y filtrado funcional por tipo de negocio.
- **Estructura Operativa:** Suite de pruebas en verde tanto en frontend (`financial-utils.test.ts`) como en backend (`test_routes.py`).

## Brechas Técnicas e Ineficiencias (Deuda Técnica)
1. **Duplicación de Lógica:** El frontend ignora el endpoint de resumen del backend y recalcula localmente las agrupaciones mensuales, desperdiciando ancho de banda y cómputo.
2. **Defectos de Configuración:** Los contenedores exponen puertos de debug en caliente por defecto y la política de CORS usa un comodín (`*`) inseguro para producción.
3. **Casos Borde en Pruebas:** Falta cobertura de pruebas para datos financieros negativos, fechas mal formateadas o fallos de contrato.

## Próximas Prioridades Inmediatas
1. Implementar la separación estricta de entornos (Dev vs Prod) en el archivo `docker-compose.yml`.
2. Refactorizar el frontend para consumir directamente `/api/metrics/summary`.
3. Ajustar los orígenes de CORS según el set de reglas definido en `.agents/rules/`.