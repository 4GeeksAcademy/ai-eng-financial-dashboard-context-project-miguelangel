# Resumen del Proyecto: Financial Dashboard

Presento a continuación el desglose técnico y funcional del proyecto **Financial Dashboard**.

## 🛠 Stack Tecnológico

El proyecto utiliza un stack moderno y orientado al rendimiento, separando claramente el frontend del backend para facilitar la escalabilidad:

**Frontend:**
- **Core:** React 19, TypeScript
- **Build Tool:** Vite 8
- **Estilos y UI:** Tailwind CSS 4, Lucide React (iconos), utilidades de clases (`clsx`, `tailwind-merge`)
- **Visualización de Datos:** Recharts
- **Testing & Calidad:** Vitest, ESLint

**Backend:**
- **Core:** Python, FastAPI (Framework REST asíncrono y de alto rendimiento)
- **Servidor:** Uvicorn (ASGI)
- **Testing & Herramientas:** Pytest, HTTPX (para pruebas de cliente asíncrono), Debugpy (para debugging remoto)

**Infraestructura:**
- **Contenedores:** Docker, Docker Compose

---

## 🎯 Qué hace el proyecto

Es una aplicación web full-stack diseñada para la visualización y análisis de **métricas financieras**. 
El backend expone una API REST ("Financial Metrics API") que procesa y provee los datos de negocio. El frontend consume esta API para desplegar un **dashboard interactivo y analítico**, permitiendo a los usuarios monitorear KPIs (Key Performance Indicators), evaluar balances de ingresos frente a egresos, y visualizar márgenes o porcentajes de beneficio a través de gráficos enriquecidos.

---

## 🏗 Arquitectura Funcional

El sistema sigue una **arquitectura cliente-servidor desacoplada y contenerizada**:

- **API Gateway / Backend (Puerto 8000):** Basado en FastAPI, actúa como el motor de datos. Está configurado con middleware CORS para permitir el consumo seguro desde el cliente web. Incluye mapeo de puertos adicionales (5678) que habilita la conexión de un depurador externo (Debugpy).
- **Cliente SPA (Puerto 5173):** Aplicación de página única (Single Page Application) modularizada. Gestiona el enrutamiento y estado local y se comunica vía HTTP (`fetch` o similares) hacia la API.
- **Orquestación y Entorno Dev:** Todo está administrado por `docker-compose.yml`. Define la red interna, mapea volúmenes (ej. `./frontend:/app` y `./backend:/app`) para habilitar *hot-reload* instantáneo durante el desarrollo y establece la topología de inicio (el frontend espera a que el backend se levante mediante `depends_on`).

---

## 🖥 Interfaz

La interfaz está diseñada bajo un paradigma estricto basado en **componentes funcionales reutilizables**:

- **Componentización:** Estructura modular dividida en sub-componentes lógicos como `dashboard-header`, `kpi-card`, y `kpi-row`.
- **Visualización Analítica:** Emplea `Recharts` para inyectar gráficos de alto impacto y reactivos (`income-outcome-chart`, `profit-percent-chart`).
- **Sistema de Diseño (Design System):** Utiliza Tailwind CSS con utilidades de interpolación para crear una interfaz responsive y unificada. Se enfoca en la experiencia de usuario (UX) implementando estados de carga mediante esqueletos (`skeleton.tsx`).

---

## 🧪 Testing y Calidad

El proyecto hace un fuerte énfasis en la fiabilidad del software mediante herramientas modernas de validación:

- **Frontend:** Implementa **Vitest** con cobertura v8 (`vitest run --coverage`) para una ejecución de pruebas unitarias ultrarrápida. Garantiza la consistencia y detección temprana de errores mediante **TypeScript** (tipado estricto) y **ESLint** (análisis estático).
- **Backend:** Emplea **Pytest** como framework de pruebas, apoyado por `pytest-cov` para asegurar y medir la cobertura de código (Test Coverage). `httpx` se utiliza para testear las rutas de FastAPI (`test_routes.py`) de forma robusta.

---

## 🚀 Cómo se ejecuta

La aplicación está preparada para levantar todo el entorno con un solo comando gracias a la contenerización.

Desde la raíz del proyecto, ejecuta: 
```bash
docker compose up --build
```