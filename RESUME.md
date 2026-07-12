# Resumen del Proyecto: Financial Dashboard

Este repositorio implementa un dashboard financiero full-stack con frontend en React + TypeScript y backend en FastAPI . El sistema genera/expone metricas financieras y las visualiza en una interfaz analitica con KPIs y graficas.

## Stack tecnologico (con evidencia)

Frontend:
- React 19 + TypeScript + Vite 8
- Tailwind CSS 4 + Recharts + Lucide
- Vitest + ESLint

Evidencia en `frontend/package.json`:

```json
{
	"scripts": {
		"dev": "vite",
		"build": "tsc -b && vite build",
		"lint": "eslint .",
		"test": "vitest run",
		"test:coverage": "vitest run --coverage"
	},
	"dependencies": {
		"react": "^19.2.4",
		"recharts": "^3.8.1"
	}
}
```

Backend:
- Python + FastAPI + Uvicorn
- Pytest, pytest-cov, httpx, debugpy

Evidencia en `backend/requirements.txt`:

```txt
fastapi
uvicorn[standard]
debugpy
pytest
pytest-cov
httpx
```

## Que hace el proyecto

1. Exponer una API de metricas financieras con filtros.
2. Entregar resumenes por periodo (dia/semana/mes), comparativas y alertas.
3. Mostrar en frontend KPIs de ingreso/egreso/beneficio y graficas temporales.

Evidencia backend en `backend/app/main.py`:

```py
app = FastAPI(title="Financial Metrics API")
app.add_middleware(
		CORSMiddleware,
		allow_origins=["*"],
		allow_credentials=True,
		allow_methods=["*"],
		allow_headers=["*"],
)
app.include_router(router)
```

## Arquitectura funcional

Cliente-servidor desacoplado en dos servicios Docker:

Evidencia en `docker-compose.yml`:

```yml
services:
	frontend:
		ports:
			- "5173:5173"
		depends_on:
			- backend

	backend:
		ports:
			- "8000:8000"
			- "5678:5678"
```

Proxy de Vite hacia backend (sin configurar URL manual en local):

Evidencia en `frontend/vite.config.ts`:

```ts
server: {
	proxy: {
		"/api": {
			target: "http://backend:8000",
			changeOrigin: true,
		},
	},
}
```

## API y logica de negocio

El backend define tipos de negocio (`income`, `outcome`, `B2B`, `B2C`) y genera datos mock reproducibles con `seed=42`.

Evidencia en `backend/app/routes.py`:

```py
OperationType = Literal["income", "outcome"]
BusinessType = Literal["B2B", "B2C"]

def generate_mock_movements(seed: int | None = None) -> list[FinancialMovement]:
		if seed is not None:
				random.seed(seed)
		...

@router.get("/api/metrics")
@router.get("/api/metrics/facets")
@router.get("/api/metrics/summary")
@router.get("/api/metrics/categories/top")
@router.get("/api/metrics/comparison")
@router.get("/api/metrics/alerts")
@router.get("/api/metrics/b2b")
@router.get("/api/metrics/b2c")
```

## Frontend e interfaz

El frontend consume `/api/metrics` y transforma los datos para pintar tarjetas KPI y dos graficas principales.

Evidencia en `frontend/src/App.tsx`:

```tsx
async function fetchFinancialData(): Promise<FinancialMovement[]> {
	const response = await fetch(`${API_BASE_URL}/api/metrics`);
	...
}

fetchFinancialData()
	.then((movements) => {
		setMetrics(computeKPIs(movements));
		setMonthlyData(computeMonthlyData(movements));
	})
```

Componentes visuales relevantes en `frontend/src/components/dashboard/`:
- `dashboard-header.tsx`
- `kpi-row.tsx`
- `income-outcome-chart.tsx`
- `profit-percent-chart.tsx`

## Testing y calidad (con evidencia)

Backend (`backend/tests/test_routes.py`): valida salud, filtros, facets, summary, top categorias, comparison y alerts.

```py
def test_health_endpoint_returns_ok():
		response = client.get("/health")
		assert response.status_code == 200

def test_top_categories_returns_limited_sorted_categories():
		response = client.get("/api/metrics/categories/top", params={"operation_type": "outcome", "limit": 3})
		assert response.status_code == 200
```

Frontend (`frontend/src/lib/financial-utils.test.ts`): valida calculos KPI, agregacion mensual y formateadores.

```ts
expect(metrics).toEqual({
	totalIncome: 1500,
	totalOutcome: 250,
	profit: 1250,
	profitPercent: (1250 / 1500) * 100,
});
```

## Ejecucion

Desde la raiz del proyecto:

```bash
docker compose up --build
```