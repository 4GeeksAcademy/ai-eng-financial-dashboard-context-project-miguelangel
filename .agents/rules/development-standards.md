# Estándares de Desarrollo y Calidad de Código

## 1. Regla de Estado Determinista
Evitar el uso de `random.seed` global dentro de los handlers o requests de la API, ya que introduce estado global mutable. Se debe inyectar un generador RNG local o proveedor de datos con interfaz explícita.

## 2. Regla de Contratos API
Todo nuevo endpoint desarrollado requiere obligatoriamente un response model de Pydantic y el acompañamiento de al menos una prueba positiva y una negativa de validación.

## 3. Regla de Cobertura Mínima
Se sugiere mantener una cobertura mínima de pruebas del 80% en el backend, 90% en las utilidades de frontend y contar con pruebas de integración para el flujo crítico del dashboard financiero.

## 4. Regla de Calidad en CI
El pipeline mínimo de Integración Continua debe ejecutar obligatoriamente: linting + tests + verificación de cobertura + validación de Dockerfiles y escaneo de vulnerabilidades en dependencias.