# Especificación de Componentes - Dashboard Financiero

Este documento detalla la estructura, las props y el comportamiento de los nuevos componentes del dashboard, garantizando que el equipo de desarrollo pueda implementarlos sin ambigüedades.

---

## Funcionalidad 1 — Filtro de rango de fechas en el dashboard principal

### Componente: `GlobalDateFilter`
Se ubicará en la parte superior del dashboard principal.

**Props:**
* `minDate` (string): Fecha más antigua del dataset (proveniente de `FacetsResponse`).
* `maxDate` (string): Fecha más reciente del dataset (proveniente de `FacetsResponse`).
* `onFilterApply` (function): Función que recibe el objeto `DateRangeFilter` para disparar el refresco de datos en la página.

**Layout y UI:**
* Un contenedor en fila (row) que incluye dos campos de tipo `<input type="date">` (Inicio y Fin).
* Al lado de los inputs, un texto de ayuda sutil que muestra el rango válido: *"Datos disponibles desde {minDate} hasta {maxDate}"*.

**Comportamiento (Estados parciales):**
* **Solo Inicio relleno:** El dashboard filtra los datos desde la fecha de inicio seleccionada hasta el final de los datos históricos (`maxDate` o sin límite superior).
* **Solo Fin relleno:** El dashboard filtra desde el principio de los tiempos históricos (`minDate`) hasta la fecha de fin seleccionada.
* **Ambos vacíos:** Se muestran todos los datos disponibles sin filtros.

---

## Funcionalidad 2 — Tabla de alertas de anomalías en el dashboard principal

### Componente: `AnomalyAlertsTable`
Se ubicará debajo de los gráficos existentes en la vista principal.

**Props:**
* `alerts` (AlertEntry[]): Array de anomalías detectadas.
* `currentThreshold` (number): El valor actual del umbral.
* `onThresholdChange` (function): Función para actualizar el parámetro `threshold` en la petición.
* `isLoading` (boolean): Estado de carga de la petición de alertas.

**Layout y Columnas de la Tabla:**
1. **Período:** Renderiza el string `period` (ej. "2023-10").
2. **Outcome Registrado:** Renderiza `outcome_total` formateado como moneda.
3. **Media Móvil (3 períodos):** Renderiza `baseline_average` formateado como moneda.
4. **Incremento %:** Renderiza `increase_ratio` multiplicando por 100 y añadiendo el símbolo `%` (ej. 0.3 se muestra como "30%").

**Comportamiento y Estados:**
* **Estado Vacío:** Si la petición es exitosa pero `alerts` está vacío (`[]`), la tabla NO debe desaparecer. En su lugar, el cuerpo de la tabla debe mostrar un mensaje centrado: *"No se detectaron anomalías para el umbral actual."*
* **Input fuera de rango:** El input numérico de threshold tiene un rango válido de `0.01` a `1.0`. Si el usuario ingresa un valor fuera de este rango (ej. `1.5` o `-0.2`), el componente debe bloquear la llamada a la API, marcar el input en estado de error visual (borde rojo) y mostrar el mensaje: *"El umbral debe estar entre 0.01 y 1.0"*.

---

## Funcionalidad 3 — Vista comparativa B2B vs B2C

### Componentes Involucrados
Esta funcionalidad requiere una nueva página (`BusinessComparisonView`) compuesta por los siguientes sub-componentes.

#### 1. `BusinessTopCategoriesPanel` (Layout de paneles paralelos)
Renderiza las tablas top 5 para una línea de negocio. Se instanciará dos veces en paralelo (una para B2B y otra para B2C).

**Props:**
* `title` (string): "B2B" o "B2C".
* `categories` (CategoryEntry[]): Datos filtrados de esa línea de negocio limitados a 5.
* `totalIncome` (number): La suma total de ingresos de esa línea de negocio, calculada en el frontend para poder sacar el porcentaje.

**Comportamiento del panel:**
* Muestra una tabla con tres columnas: Nombre (`category`), Total (`total_amount`), y Porcentaje (calculado dinámicamente como `(total_amount / totalIncome) * 100`).
* **Estado Vacío:** Si la lista `categories` viene vacía para uno de los paneles, se debe mostrar un mensaje explícito dentro del panel: *"No hay categorías de ingreso registradas para {title} en este período."*

#### 2. `BusinessComparisonChart` (Gráfico)
Se ubicará centrado debajo de los dos paneles.

**Props:**
* `b2bTotal` (number): Sumatoria total de ingresos B2B.
* `b2cTotal` (number): Sumatoria total de ingresos B2C.

**Comportamiento del gráfico:**
* Es un gráfico simple de barras (o anillos) que visualiza solo dos puntos de datos para comparar visualmente los valores de `b2bTotal` frente a `b2cTotal`.
* Su leyenda debe indicar claramente cuál color representa a cada línea de negocio.