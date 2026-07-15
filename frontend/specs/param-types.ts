/**
 * Parámetros base para filtrar los datos por un rango temporal.
 * Usado transversalmente por las funcionalidades del dashboard.
 */
export interface DateRangeFilter {
  /** * Fecha de inicio del filtro.
   * Formato esperado: YYYY-MM-DD 
   */
  startDate?: string;

  /** * Fecha de fin del filtro.
   * Formato esperado: YYYY-MM-DD 
   */
  endDate?: string;
}

/**
 * Parámetros de consulta para enviar al endpoint /api/metrics/alerts.
 * (Funcionalidad 2 - Tabla de alertas de anomalías)
 */
export interface AlertsParams extends DateRangeFilter {
  /** * Ratio de tolerancia para determinar qué se considera una anomalía.
   * Valores válidos: ratio numérico entre 0.01 y 1.0 (por defecto 0.3).
   */
  threshold?: number;
}

/**
 * Parámetros de consulta para enviar al endpoint /api/metrics/categories/top.
 * (Funcionalidad 3 - Vista comparativa B2B vs B2C)
 */
export interface TopCategoriesParams extends DateRangeFilter {
  /** * Tipo de operación financiera a consultar.
   * Valores válidos: 'income' o 'expense'.
   */
  operation_type: 'income' | 'expense';

  /** * Número máximo de categorías a retornar.
   * Valor esperado: 5 (para la vista top 5).
   */
  limit: number;
}