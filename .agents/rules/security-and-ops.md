# Reglas de Seguridad y Operaciones (Ops)

## 1. Regla de Seguridad CORS
En producción, está estrictamente prohibido usar origen comodín (`*`) con credenciales habilitadas. Se debe definir una lista explícita de orígenes permitidos por entorno.

## 2. Regla de Perfiles de Ejecución
Separar estrictamente el modo dev y prod en backend y frontend. Debugpy, reload y puertos de depuración expuestos quedan permitidos única y exclusivamente en entornos de desarrollo.

## 3. Regla de Reproducibilidad de Dependencias
Es obligatorio el uso de versionado fijo o lockfiles tanto para Python (`requirements.txt`) como para Node (`package-lock.json`). Las dependencias de desarrollo/testeo deben estar debidamente separadas de las de runtime.