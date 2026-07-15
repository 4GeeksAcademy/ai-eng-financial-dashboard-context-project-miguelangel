/**
 * Respuesta del endpoint GET /api/metrics/facets.
 * Contiene los rangos de fechas y categorías disponibles en el dataset.
 */
export interface FacetsResponse {
  /**
   * Tipos de operación disponibles para filtrar métricas.
   * Valores típicos: ["income", "outcome"].
   * Formato: string[]
   */
  operation_types: string[];

  /**
   * Tipos de negocio disponibles para filtrar.
   * Valores típicos: ["B2B", "B2C"].
   * Formato: string[]
   */
  business_types: string[];

  /**
   * Categorías financieras disponibles en el dataset.
   * Formato: string[] (ej. "suppliers", "marketing").
   */
  categories: string[];

  /**
   * Fecha más antigua disponible en el dataset.
   * Formato: YYYY-MM-DD
   */
  min_date: string;

  /**
   * Fecha más reciente disponible en el dataset.
   * Formato: YYYY-MM-DD
   */
  max_date: string;
}

/**
 * Entrada individual para la tabla de alertas de anomalías.
 * Endpoint: GET /api/metrics/alerts
 */
export interface AlertEntry {
  /**
   * Período al que corresponde la alerta.
   * Formato: YYYY-MM o YYYY-MM-DD (según API).
   */
  period: string;

  /**
   * Total de gastos registrados en el período.
   * Formato: number (monto monetario).
   */
  outcome_total: number; 

  /**
   * Media móvil de los 3 períodos anteriores.
   * Formato: number (monto monetario).
   */
  baseline_average: number; 

  /**
   * Incremento porcentual respecto a la media móvil.
   * Formato: number (ratio, ej. 0.3 = 30%).
   */
  increase_ratio: number;
}

/**
 * Respuesta del endpoint GET /api/metrics/alerts.
 * Es un array de entradas de alerta.
 */
export interface AlertsResponse extends Array<AlertEntry> {}

/**
 * Detalle de error de validación (HTTP 422).
 * Formato estándar de FastAPI/Pydantic.
 */
export interface ValidationErrorDetail {
  /**
   * Ubicación del error en la estructura de datos.
   * Formato: Array de strings o números (ej. ["query", "threshold"]).
   */
  loc: Array<string | number>;

  /**
   * Mensaje de error legible para el usuario.
   * Formato: string.
   */
  msg: string;

  /**
   * Tipo técnico del error.
   * Ejemplos: "type_error.float", "value_error.missing".
   */
  type: string;

  /**
   * Valor input que causó el error (opcional).
   * Formato: any (serializable).
   */
  input?: unknown | null;

  /**
   * Contexto adicional del error (opcional).
   * Formato: objeto con claves string.
   */
  ctx?: Record<string, unknown> | null;
}

/**
 * Respuesta de error de validación (HTTP 422).
 */
export interface AlertsValidationErrorResponse {
  /**
   * Lista de detalles de errores de validación.
   */
  detail: ValidationErrorDetail[];
}

/**
 * Entrada individual para la tabla de categorías top.
 * Endpoint: GET /api/metrics/categories/top
 */
export interface CategoryEntry {
  /**
   * Nombre de la categoría.
   * Formato: string (snake_case o lowercase).
   */
  category: string;

  /**
   * Tipo de operación asociado.
   * Valores: "income" o "outcome".
   */
  operation_type: string;

  /**
   * Monto total acumulado para esta categoría.
   * Formato: number (monto monetario).
   */
  total_amount: number;
}

/**
 * Respuesta del endpoint GET /api/metrics/categories/top.
 * Es un array de entradas de categorías.
 */
export interface TopCategoriesResponse extends Array<CategoryEntry> {}