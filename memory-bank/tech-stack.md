# Tech Stack - Arquitectura Tecnológica

El proyecto sigue una arquitectura desacoplada de Frontend y Backend, orquestada mediante contenedores Docker para garantizar la paridad de entornos.

## Backend
- **Framework Principal:** `FastAPI` (Python 3.11) - Elegido por su alto rendimiento asíncrono y la autogeneración de documentación OpenAPI.
- **Validación de Datos:** `Pydantic` - Define los contratos estrictos de la API (`FinancialMovement`, `MetricsSummaryItem`, `MetricsComparison`).
- **Servidor ASGI:** `Uvicorn` con soporte de recarga automática en desarrollo.
- **Testing:** `Pytest` junto con `HTTPX` para la ejecución de pruebas de integración de endpoints.

## Frontend
- **Librería Core:** `React` con `TypeScript` (compilado mediante `Vite`) para garantizar tipado estricto en la interfaz de usuario.
- **Estilos y UI:** `Tailwind CSS` combinado con componentes reutilizables basados en la especificación de `shadcn/ui` (`@radix-ui/react-slot`, `lucide-react`).
- **Gráficos:** `Recharts` - Usado para renderizar de forma reactiva los gráficos de barras y áreas financieras.
- **Testing:** `Vitest` - Suite de pruebas unitarias ultrarrápida para verificar las utilidades matemáticas en el navegador.

## Infraestructura y Ops
- **Contenerización:** `Docker` y `Docker Compose` para levantar en paralelo la API (puerto 8000) y la SPA de React (puerto 5173).