# Especificaciones del Frontend - Dashboard Financiero

Este documento define el contrato de datos, los componentes y los casos extremos para las nuevas funcionalidades del Dashboard Financiero. Toda implementación debe ceñirse a estas reglas para garantizar la sincronización con la API y una experiencia de usuario robusta.

---

## Funcionalidad 1: Filtro de rango de fechas

Permite a los usuarios acotar los datos del dashboard principal a un período específico.

* **Endpoints consumidos:** 
  * `GET /api/metrics/facets` (Para obtener el rango histórico disponible).
  * Todos los endpoints de métricas existentes se actualizarán para aceptar el filtro temporal.
* **Tipos TypeScript:**
  * **Petición:** `DateRangeFilter` (usado como base compartida).
  * **Respuesta:** `FacetsResponse` (para leer `min_date` y `max_date`).
* **Parámetros y restricciones:**
  * `startDate` (opcional): Cadena de texto en formato estricto `YYYY-MM-DD`.
  * `endDate` (opcional): Cadena de texto en formato estricto `YYYY-MM-DD`.
* **Casos Edge (Edge Cases):**
  1. **Fechas invertidas:** El usuario selecciona una `startDate` que es posterior a la `endDate`. 
     * *Comportamiento UI:* La UI debe deshabilitar el botón de aplicar filtros o la llamada automática a la API, y mostrar un texto de error debajo de los inputs: *"La fecha de inicio no puede ser posterior a la fecha de fin."*
  2. **Dataset vacío desde la API:** El endpoint de facets devuelve strings vacíos o null para `min_date` y `max_date` porque la base de datos acaba de ser purgada.
     * *Comportamiento UI:* El componente debe ocultar el texto de ayuda visual ("Datos disponibles desde...") para no mostrar "desde null hasta null", y los inputs de fecha deben deshabilitarse.

---

## Funcionalidad 2: Tabla de alertas de anomalías

Muestra los períodos donde el gasto superó la media histórica basándose en un umbral de tolerancia.

* **Endpoints consumidos:** 
  * `GET /api/metrics/alerts`
* **Tipos TypeScript:**
  * **Petición:** `AlertsParams` (que extiende `DateRangeFilter`).
  * **Respuesta:** `AlertsResponse` (Array de `AlertEntry`) y `AlertsValidationErrorResponse` en caso de error 422.
* **Parámetros y restricciones:**
  * `threshold` (opcional): Número decimal (float). Rango válido restrictivo: `0.01` a `1.0`. Valor por defecto si se omite: `0.3`.
  * Hereda `startDate` y `endDate`.
* **Casos Edge (Edge Cases):**
  1. **Error de validación del servidor (HTTP 422):** A pesar de las validaciones del frontend, se envía un request malformado y el servidor devuelve un 422 Unprocessable Entity.
     * *Comportamiento UI:* La tabla debe ocultarse temporalmente y en su lugar mostrar un banner de error leyendo la propiedad `msg` del `ValidationErrorDetail` proporcionado por la API.
  2. **Timeout o carga excesivamente lenta:** El cálculo de medias móviles sobre rangos de fechas muy amplios causa que la API tarde más de 10 segundos en responder.
     * *Comportamiento UI:* Tras 10 segundos, la petición debe abortarse (timeout). El componente de tabla debe reemplazar su estado de carga (skeleton) por un mensaje: *"El análisis está tardando demasiado. Por favor, reduce el rango de fechas e intenta de nuevo."*

---

## Funcionalidad 3: Vista comparativa B2B vs B2C

Página dedicada para comparar el top 5 de categorías de ingresos y el total facturado entre las dos líneas de negocio.

* **Endpoints consumidos:** 
  * `GET /api/metrics/categories/top` (Se llamará dos veces, una filtrando para B2B y otra para B2C).
  * `GET /api/metrics/facets` (Para obtener las categorías disponibles).
* **Tipos TypeScript:**
  * **Petición:** `TopCategoriesParams` (que extiende `DateRangeFilter`).
  * **Respuesta:** `TopCategoriesResponse` (Array de `CategoryEntry`).
* **Parámetros y restricciones:**
  * `operation_type` (requerido): String, valor estricto a `"income"` (ya que es vista de ingresos).
  * `limit` (requerido): Número entero, valor estricto a `5`.
  * Hereda `startDate` y `endDate`.
* **Casos Edge (Edge Cases):**
  1. **Fallo parcial de datos:** La llamada a la API para obtener el top de B2B falla (ej. error 500), pero la llamada de B2C es exitosa.
     * *Comportamiento UI:* El panel B2B debe mostrar un estado de error localizado ("Error al cargar datos B2B") sin bloquear la pantalla completa. El panel B2C se renderiza normalmente. El gráfico comparativo inferior debe ocultarse, ya que no se pueden comparar datos incompletos.
  2. **Totales en cero (División por cero):** En un rango de fechas muy estrecho (ej. un solo día festivo), ambos endpoints devuelven un top 5 válido pero todos los `total_amount` son `0`.
     * *Comportamiento UI:* Al calcular los porcentajes de la tabla (`(total_amount / totalIncome) * 100`), la UI detectaría una división por cero (0/0 = NaN). El frontend debe interceptar esto y renderizar `0%` de forma segura. El gráfico de comparativa debe mostrar un estado vacío: *"Sin ingresos registrados en este período."*