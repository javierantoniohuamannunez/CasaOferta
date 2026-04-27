git# Reporte de incidencias (local)

Última actualización: 2026-04-24 (Europe/Madrid)

## (2026-04-23) Backend no accesible: `ERR_CONNECTION_REFUSED` / `Failed to fetch`

**Síntomas**
- En consola del navegador:
  - `GET http://localhost:3000/games/categorias net::ERR_CONNECTION_REFUSED`
  - `GET http://localhost:3000/ofertas/top-ofertas net::ERR_CONNECTION_REFUSED`
  - `GET http://localhost:3000/games/top net::ERR_CONNECTION_REFUSED`
  - `TypeError: Failed to fetch` (ej. en `Categorias.jsx`, `Ofertas.jsx`, `MejoresJuegos.jsx`).

**Causa**
- El frontend apunta al backend en `http://localhost:3000` (ver `frontend/.env`: `VITE_API_URL=http://localhost:3000`), pero el backend no estaba levantado en ese puerto (o el puerto no coincidía).

**Corrección**
- Levantar el backend en `http://localhost:3000` o ajustar `VITE_API_URL` al puerto real y reiniciar el frontend.
- Se alineó el endpoint de “top ofertas” para consumir la ruta de ofertas:
  - `frontend/src/services/api.js`: `obtenerTopOfertas()` usa `GET ${VITE_API_URL}/ofertas/top-ofertas`.
  - `backend/src/controllers/ofertasController.js`: `getTopOfertas` llama a `ofertasService.obtenerTopOfertas()`.

## (2026-04-24) Error: `Invalid hook call` al iniciar el frontend

**Síntomas**
- En consola del navegador:
  - `Invalid hook call. Hooks can only be called inside of the body of a function component`
  - `Cannot read properties of null (reading 'useRef')` dentro de `react-router-dom` (en `<BrowserRouter>`).

**Causa**
- `react-router-dom` se importaba en `frontend/src/App.jsx`, pero **no estaba instalado en `frontend/`**.
- Vite/Node lo resolvía desde otro `node_modules` fuera del proyecto (por ejemplo `/home/javierhuaman/node_modules`), lo que suele provocar **múltiples copias de React** y termina en `Invalid hook call`.

**Corrección**
- Se instaló `react-router-dom` dentro del `frontend/`:
  - `frontend/package.json`: se añadió `react-router-dom`.
  - Se ejecutó `npm install` en `frontend/` (actualiza también `frontend/package-lock.json`).
- Se añadió deduplicación para evitar más de una copia de React:
  - `frontend/vite.config.js`: `resolve.dedupe: ['react', 'react-dom']`.

## (2026-04-24) La app cargaba “sin estilos” (no aplicaba `App.css`)

**Síntomas**
- La página se mostraba como si no cargara estilos (aunque el servidor levantaba bien).

**Causa**
- `frontend/src/App.css` contenía la mayor parte de estilos (clases como `header`, `nav`, `grid-juegos`, etc.), pero **no se estaba importando en ningún sitio**.
- `frontend/src/main.jsx` importaba `index.css`, pero ese CSS era mínimo y no cubría la UI.

**Corrección**
- `frontend/src/App.jsx`: se añadió `import "./App.css";` para que Vite incluya esos estilos en el bundle.
