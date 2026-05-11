# Resumen del proyecto `CasaOferta`

## 1. Que es este proyecto

`CasaOferta` es una aplicacion full stack para buscar videojuegos, ver detalles, explorar categorias y mostrar ofertas de tiendas.  
La arquitectura esta separada en:

- `backend/`: API REST en `Express` con `Sequelize` y `MySQL`.
- `frontend/`: cliente en `React` + `Vite`.
- `report.md`: reporte manual de incidencias y correcciones locales.

Las integraciones externas principales son:

- `RAWG API`: catalogo, busqueda, detalle, top juegos y categorias.
- `CheapShark API`: ofertas y precios.

## 2. Estructura general

### Raiz

- `.gitignore`
- `backend/`
- `frontend/`
- `report.md`
- `RESUMEN_PROYECTO.md`

### Backend

- `.env`
- `middlewares/handleErrors.js`
- `middlewares/notFound.js`
- `package.json`
- `package-lock.json`
- `src/app.js`
- `src/config/db.js`
- `src/controllers/busquedaController.js`
- `src/controllers/favoritosController.js`
- `src/controllers/gameController.js`
- `src/controllers/ofertasController.js`
- `src/models/Favorito.js`
- `src/routes/busquedaRoutes.js`
- `src/routes/favoritosRoutes.js`
- `src/routes/gameRoutes.js`
- `src/routes/ofertasRoutes.js`
- `src/services/busquedaService.js`
- `src/services/ofertasService.js`
- `src/services/rawgService.js`
- `src/utils/tiendas.js`

### Frontend

- `.env`
- `.gitignore`
- `README.md`
- `dist/index.html`
- `dist/favicon.svg`
- `dist/icons.svg`
- `dist/assets/index-BBOh-mqB.js`
- `dist/assets/index-iPgIYNx7.css`
- `eslint.config.js`
- `index.html`
- `package.json`
- `package-lock.json`
- `public/favicon.svg`
- `public/icons.svg`
- `src/App.css`
- `src/App.jsx`
- `src/assets/hero.png`
- `src/assets/react.svg`
- `src/assets/vite.svg`
- `src/components/Destacados.jsx`
- `src/components/home/Buscador.jsx`
- `src/components/home/Categorias.jsx`
- `src/components/home/Header.jsx`
- `src/components/home/MejoresJuegos.jsx`
- `src/components/home/Ofertas.jsx`
- `src/components/home/Resultados.jsx`
- `src/components/home/ResultadosGenero.jsx`
- `src/components/home/Tiendas.jsx`
- `src/components/home/TopJuegos.jsx`
- `src/components/juegos/TarjetaJuego.jsx`
- `src/components/layout/Footer.jsx`
- `src/components/layout/Header.jsx`
- `src/components/ui/Error.jsx`
- `src/components/ui/Loader.jsx`
- `src/index.css`
- `src/main.jsx`
- `src/pages/DetalleJuego.jsx`
- `src/pages/Home.jsx`
- `src/services/api.js`
- `src/utils/tiendas.js`
- `vite.config.js`

## 3. Stack y scripts

### Backend

- Framework: `express`
- ORM: `sequelize`
- Driver BD: `mysql2`
- HTTP client: `axios`
- Config: `dotenv`
- Dev server: `nodemon`

Script disponible:

- `npm run dev`: levanta `src/app.js` con `nodemon`.

### Frontend

- Framework: `react`
- Router: `react-router-dom`
- Bundler: `vite`
- Iconos: `react-icons`
- Lint: `eslint`

Scripts disponibles:

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

## 4. Backend explicado

### `backend/src/app.js`

Archivo principal del backend.

Responsabilidades:

- carga variables de entorno con `dotenv`
- crea la app `Express`
- habilita `cors`
- habilita `express.json()`
- registra rutas:
  - `/games`
  - `/ofertas`
  - `/busqueda`
  - `/favoritos`
- define `GET /` que responde `api funcionando`
- registra middlewares `notFound` y `handleErrors`
- sincroniza `Sequelize` con `sequelize.sync()`
- arranca el servidor en `process.env.PORT || 3000`

### `backend/src/config/db.js`

Configura la conexion a base de datos con `Sequelize`.

Variables soportadas:

- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_DIALECT`

Fallbacks actuales:

- base: `casaoferta`
- usuario: `root`
- password: definida en codigo
- host: `localhost`
- dialecto: `mysql`

### Controladores

#### `backend/src/controllers/gameController.js`

Funciones exportadas:

- `getGames(req, res, next)`
  - lee `req.query.buscar`
  - valida que exista
  - llama `rawgService.buscarGames(buscar)`
  - devuelve lista de juegos

- `getJuegoPorId(req, res, next)`
  - lee `req.params.id`
  - llama `rawgService.obtenerJuegoPorId(id)`
  - devuelve objeto formateado con:
    - `id`
    - `nombre`
    - `descripcion`
    - `imagen`
    - `rating`
    - `metacritic`
    - `generos`

- `getTopGames(req, res, next)`
  - llama `rawgService.obtenerJuegosTop()`
  - devuelve top de juegos

- `getTopOfertas(req, res, next)`
  - toma top juegos desde RAWG
  - para los primeros 10 busca ofertas con `ofertasService.buscarOfertas(juego.nombre)`
  - selecciona la oferta con menor `salePrice`
  - arma respuesta con:
    - `id`
    - `nombre`
    - `imagen`
    - `metacritic`
    - `precio`
    - `descuento`
    - `tienda`
  - mete una pausa de `500ms` por iteracion para evitar bloqueo externo

- `getJuegosPorGenero(req, res, next)`
  - lee `req.query.genero`
  - llama `rawgService.obtenerJuegosPorGenero(genero)`
  - devuelve juegos formateados

- `getCategorias(req, res, next)`
  - llama `rawgService.obtenerCategorias()`
  - recorta a 10 categorias
  - devuelve `id`, `nombre`, `imagen`

#### `backend/src/controllers/ofertasController.js`

Funciones exportadas:

- `getTopOfertas(req, res, next)`
  - llama `ofertasService.obtenerTopOfertas()`
  - devuelve las mejores ofertas directas desde CheapShark

#### `backend/src/controllers/busquedaController.js`

Funciones exportadas:

- `getBusquedaCompleta(req, res, next)`
  - lee `req.query.buscar`
  - valida parametro
  - llama `busquedaService.buscarCompleto(buscar)`
  - devuelve un resultado combinado de juego + ofertas

#### `backend/src/controllers/favoritosController.js`

Funciones exportadas:

- `crearFavorito(req, res)`
  - lee `req.body.juegoId`
  - evita duplicados con `Favorito.findOne`
  - crea el favorito con `Favorito.create(req.body)`

- `obtenerFavoritos(req, res)`
  - devuelve todos los favoritos con `Favorito.findAll()`

- `eliminarFavorito(req, res)`
  - borra por `req.params.id` con `Favorito.destroy`

### Rutas

#### `backend/src/routes/gameRoutes.js`

Endpoints:

- `GET /games/categorias` -> `getCategorias`
- `GET /games/por-genero?genero=<id>` -> `getJuegosPorGenero`
- `GET /games/top-ofertas` -> `getTopOfertas` del `gameController`
- `GET /games/top` -> `getTopGames`
- `GET /games?buscar=<texto>` -> `getGames`
- `GET /games/:id` -> `getJuegoPorId`

#### `backend/src/routes/ofertasRoutes.js`

Endpoints:

- `GET /ofertas/top-ofertas` -> `getTopOfertas` del `ofertasController`

#### `backend/src/routes/busquedaRoutes.js`

Endpoints:

- `GET /busqueda?buscar=<texto>` -> `getBusquedaCompleta`

#### `backend/src/routes/favoritosRoutes.js`

Endpoints:

- `GET /favoritos`
- `POST /favoritos`
- `DELETE /favoritos/:id`

### Servicios

#### `backend/src/services/rawgService.js`

Funciones:

- `filtrarJuegos(juegos)`
  - elimina juegos sin imagen
  - elimina juegos con `metacritic` nulo o <= 50
  - excluye nombres con `demo`, `fan`, `test`

- `obtenerJuegosPorGenero(generoId)`
  - consulta `https://api.rawg.io/api/games`
  - usa `genres`
  - limita a 12 resultados

- `buscarGames(query)`
  - consulta RAWG por `search`
  - usa `search_precise: true`
  - ordena por `-metacritic`
  - limita a 20
  - filtra con `filtrarJuegos`

- `obtenerJuegoPorId(id)`
  - consulta detalle por id en RAWG

- `obtenerJuegosTop()`
  - consulta RAWG ordenado por `-added`
  - limita a 20
  - filtra por plataforma padre `1`
  - devuelve cada juego ya transformado a:
    - `id`
    - `nombre`
    - `imagen`
    - `rating`
    - `metacritic`
    - `plataformas`

- `obtenerCategorias()`
  - consulta `https://api.rawg.io/api/genres`

#### `backend/src/services/ofertasService.js`

Funciones:

- `obtenerTopOfertas()`
  - consulta CheapShark para las tiendas `1`, `11`, `2`
  - aplica filtros:
    - `sortBy=DealRating`
    - `onSale=1`
    - `steamRating=80`
    - `steamRatingCount=500`
    - `metacritic=70`
    - `upperPrice=30`
  - toma 2 juegos por tienda
  - devuelve:
    - `id`
    - `nombre`
    - `imagen`
    - `precio`
    - `precioOriginal`
    - `descuento`
    - `tienda`
    - `metacritic`
    - `rating`

- `buscarOfertas(nombre)`
  - busca ofertas por titulo en CheapShark
  - limita a 5 resultados

#### `backend/src/services/busquedaService.js`

Funcion:

- `buscarCompleto(query)`
  - busca juegos con `rawgService.buscarGames(query)`
  - si no hay resultados devuelve `[]`
  - toma `juegos[4]` como juego principal
  - busca ofertas para ese juego
  - mapea hasta 3 ofertas con nombre de tienda legible
  - devuelve:
    - `nombre`
    - `imagen`
    - `rating`
    - `ofertas`

### Modelo

#### `backend/src/models/Favorito.js`

Modelo `Favorito` con campos:

- `id`: entero, PK, autoincremental
- `nombre`: string
- `imagen`: string
- `juegoId`: entero unico

### Middlewares

#### `backend/middlewares/notFound.js`

- responde `404` con `{ ok: false, error: "ruta no encontrada" }`

#### `backend/middlewares/handleErrors.js`

- registra error en consola
- trata `CastError`
- trata `ValidationError`
- devuelve `500` generico si no coincide

### Utilidades

#### `backend/src/utils/tiendas.js`

Mapa de IDs de tienda:

- `1` -> `Steam`
- `11` -> `Humble`
- `2` -> `GreenManGaming`

## 5. Frontend explicado

### Punto de entrada

#### `frontend/src/main.jsx`

- monta `App` dentro de `#root`
- envuelve la app en `StrictMode`
- importa `index.css`

#### `frontend/src/App.jsx`

- configura `BrowserRouter`
- define rutas:
  - `/` -> `Home`
  - `/juego/:id` -> `DetalleJuego`

### Paginas

#### `frontend/src/pages/Home.jsx`

Estado local:

- `busqueda`
- `categoriaSeleccionada`

Flujo:

- siempre renderiza `Header`
- si hay categoria seleccionada, muestra `ResultadosGenero`
- si no hay busqueda, muestra:
  - `Categorias`
  - `MejoresOfertas`
  - `MejoresJuegos`
- si hay busqueda, muestra `Resultados`

#### `frontend/src/pages/DetalleJuego.jsx`

Estado:

- `juego`

Flujo:

- toma `id` desde `useParams()`
- llama `obtenerJuegoPorId(id)` en `useEffect`
- muestra:
  - imagen
  - nombre
  - descripcion
  - rating
  - metacritic
  - generos

### Componentes principales usados

#### `frontend/src/components/home/Header.jsx`

- muestra logo `CazaOfertas`
- renderiza `Buscador`
- pinta una navegacion estatica con:
  - `Inicio`
  - `Destacados`
  - `Ofertas`
  - `Tiendas`

#### `frontend/src/components/home/Buscador.jsx`

- mantiene estado local `texto`
- al enviar el formulario ejecuta `onBuscar(texto)`
- evita enviar texto vacio
- tiene codigo comentado de una version con `onChange`

#### `frontend/src/components/home/Categorias.jsx`

- carga categorias desde `obtenerCategorias()`
- muestra cards clicables
- al pulsar llama `onCategoriaClick(cat)`

#### `frontend/src/components/home/MejoresJuegos.jsx`

- carga juegos desde `GET http://localhost:3000/games/top`
- guarda resultados en `juegos`
- usa `useRef` para carrusel horizontal
- usa `useNavigate` para ir a `/juego/:id`
- incluye funcion `getIcono(plataforma)` para Windows, PlayStation, Xbox y Linux
- incluye funcion `scroll(direccion)` para mover el carrusel
- muestra skeleton simple si no hay datos

#### `frontend/src/components/home/Ofertas.jsx`

- importa `obtenerTopOfertas()` desde `services/api`
- importa `obtenerNombreTienda()` desde `utils/tiendas`
- maneja estados:
  - `juegos`
  - `cargando`
  - `error`
- agrupa juegos por tienda con `agruparPorTienda(juegos)`
- limita a 2 juegos por tienda
- muestra:
  - nombre
  - metacritic
  - rating
  - precio original
  - precio oferta
  - descuento

#### `frontend/src/components/home/Resultados.jsx`

- recibe `busqueda`
- consulta `GET http://localhost:3000/games?buscar=<texto>`
- transforma resultados a un formato de UI
- navega a detalle al pulsar una card
- reutiliza `getIcono(plataforma)`

#### `frontend/src/components/home/ResultadosGenero.jsx`

- recibe `categoria`
- llama `obtenerJuegosPorGenero(categoria.id)`
- muestra resultados por genero
- navega a detalle al pulsar una card
- reutiliza `getIcono(plataforma)`

### Otros componentes

#### `frontend/src/components/Destacados.jsx`

- componente alternativo que busca `buscarJuegos("for")`
- recorta a 8 juegos
- solo renderiza imagenes
- actualmente no aparece conectado en `App.jsx` ni en `Home.jsx`

#### `frontend/src/components/juegos/TarjetaJuego.jsx`

- componente reutilizable de tarjeta de juego
- muestra:
  - imagen
  - nombre
  - metacritic
  - plataformas
  - precio
  - descuento
  - tienda
- importa `obtenerNombreTienda`
- actualmente no aparece usado desde las paginas principales

### Servicios

#### `frontend/src/services/api.js`

Lee `VITE_API_URL` desde entorno.

Funciones exportadas:

- `buscarJuegos(query)` -> `GET /games?buscar=...`
- `obtenerTopOfertas()` -> `GET /ofertas/top-ofertas`
- `obtenerCategorias()` -> `GET /games/categorias`
- `obtenerJuegosPorGenero(generoId)` -> `GET /games/por-genero?genero=...`
- `obtenerJuegoPorId(id)` -> `GET /games/:id`

### Utilidades

#### `frontend/src/utils/tiendas.js`

Funcion:

- `obtenerNombreTienda(id)`

Mapeo:

- `1` -> `Steam`
- `11` -> `Humble Store`
- `2` -> `GreenManGaming`

### Estilos y assets

#### `frontend/src/App.css`

- archivo principal de estilos de la UI
- contiene la mayor parte del layout y estilos visuales
- tiene `427` lineas, por lo que concentra casi todo el diseño

#### `frontend/src/index.css`

- estilos base minimos

#### `frontend/src/assets/`

- `hero.png`
- `react.svg`
- `vite.svg`

#### `frontend/public/`

- `favicon.svg`
- `icons.svg`

#### `frontend/dist/`

Build ya generado del frontend:

- `index.html`
- `favicon.svg`
- `icons.svg`
- bundle JS en `assets/index-BBOh-mqB.js`
- bundle CSS en `assets/index-iPgIYNx7.css`

## 6. Archivos vacios o placeholders

Los siguientes archivos existen pero actualmente estan vacios:

- `frontend/src/components/home/Tiendas.jsx`
- `frontend/src/components/home/TopJuegos.jsx`
- `frontend/src/components/layout/Footer.jsx`
- `frontend/src/components/layout/Header.jsx`
- `frontend/src/components/ui/Error.jsx`
- `frontend/src/components/ui/Loader.jsx`

## 7. Variables de entorno y configuracion

### `backend/.env`

Se usa para variables del backend. Por el codigo actual, deberian existir o ser utiles estas claves:

- `PORT`
- `RAWG_API_KEY`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_DIALECT`

### `frontend/.env`

Se usa para la URL base del backend:

- `VITE_API_URL`

Segun `report.md`, el frontend estaba apuntando a `http://localhost:3000`.

## 8. Flujo funcional de la app

1. El usuario entra a `/`.
2. `Home` muestra categorias, mejores ofertas y mejores juegos.
3. El buscador actualiza `busqueda` y muestra `Resultados`.
4. Al pulsar una categoria se muestran `ResultadosGenero`.
5. Al pulsar un juego se navega a `/juego/:id`.
6. `DetalleJuego` consulta el backend y muestra el detalle.
7. El backend consume RAWG y CheapShark para construir respuestas.

## 9. Observaciones tecnicas importantes

- Hay dos rutas de top ofertas:
  - `/games/top-ofertas`
  - `/ofertas/top-ofertas`
- El frontend mezcla dos formas de consumo:
  - algunas llamadas usan `frontend/src/services/api.js`
  - otras hacen `fetch("http://localhost:3000/...")` directo
- `busquedaService.buscarCompleto()` toma `juegos[4]`, no el primer resultado; eso parece una decision fragil o temporal.
- `backend/src/config/db.js` conserva credenciales por defecto dentro del codigo.
- Hay varios componentes creados pero sin uso o vacios.
- `report.md` documenta incidencias reales del entorno local y sirve como historial tecnico.

## 10. Resumen corto para explicar el proyecto a otra persona

`CasaOferta` es una web de videojuegos que combina catalogo y ofertas.  
El frontend esta hecho con React/Vite y permite buscar juegos, navegar por categorias, ver destacados y abrir una pantalla de detalle.  
El backend expone endpoints REST con Express, consulta RAWG para informacion de juegos y CheapShark para precios/ofertas, y guarda favoritos en MySQL mediante Sequelize.  
El proyecto ya tiene build del frontend generada, varios componentes funcionales, algunos placeholders vacios y un `report.md` con incidencias tecnicas previas.
