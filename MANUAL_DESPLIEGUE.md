# Manual de Despliegue

## Objetivo

Este documento explica como desplegar CasaOferta usando Docker y Docker Compose tanto en entorno local como en el servidor del instituto.

---

# Estructura Docker Actual

El proyecto usa tres servicios definidos en `docker-compose.yml`:

- `mysql`: base de datos MySQL 8
- `backend`: API Node.js + Express + Sequelize
- `frontend`: aplicacion React compilada y servida con `serve`

---

# Archivos Usados

- `docker-compose.yml`
- `backend/Dockerfile`
- `frontend/Dockerfile`
- `backend/.env`
- `frontend/.env`

---

# Requisitos Previos

- Docker instalado
- Docker Compose instalado

Puertos utilizados:

- `3000` → backend
- `5173` → frontend
- `3306` → MySQL

---

# Como Levantar el Proyecto

Desde la raiz del proyecto:

```bash
docker compose up --build
```

Para levantarlo en segundo plano:

```bash
docker compose up --build -d
```

---

# Servicios Esperados

## Frontend

Disponible en:

```text
http://localhost:5173
```

## Backend

Disponible en:

```text
http://localhost:3000
```

## MySQL

Disponible en:

```text
localhost:3306
```

---

# Parar el Proyecto

```bash
docker compose down
```

Si quieres eliminar tambien el volumen de MySQL:

```bash
docker compose down -v
```

Atencion:
Ese comando elimina los datos persistidos de la base de datos.

---

# Persistencia de Datos

La base de datos MySQL usa un volumen Docker:

```yaml
volumes:
  - mysql_data:/var/lib/mysql
```

Esto permite mantener los datos aunque los contenedores se apaguen, mientras no se elimine el volumen manualmente.

---

# Variables de Entorno

## Backend

El backend usa variables definidas en `docker-compose.yml`:

```env
DB_NAME=casaoferta
DB_USER=root
DB_PASSWORD=root
DB_HOST=mysql
DB_DIALECT=mysql
PORT=3000
```

Nota:
Dentro de Docker manda lo definido en `docker-compose.yml`.

---

## Frontend

En desarrollo local:

```env
VITE_API_URL=http://localhost:3000
```

Para despliegue remoto en el servidor del instituto:

```env
VITE_API_URL=http://172.20.2.211:3000
```

---

# Flujo de Arranque del Backend

Cuando el backend arranca:

1. Conecta a MySQL.
2. Ejecuta `sequelize.sync({ force: false })`.
3. Genera cache inicial si es necesario.
4. Inicia los cron jobs.
5. Expone la API REST.

---

# Cache y Cron Jobs

El backend usa cache persistente en MySQL para evitar llamadas constantes a APIs externas.

Tablas cacheadas:

- `OfertaHome`
- `OfertaTienda`
- `CategoriaHome`
- `JuegoDestacado`

Cron jobs activos:

- actualizacion de ofertas
- actualizacion de categorias
- actualizacion de destacados
- comprobacion de alertas

---

# Validacion Docker Compose

Se puede validar la configuracion con:

```bash
docker compose config
```

---

# Comandos Utiles

## Ver logs

```bash
docker compose logs -f
```

## Logs del backend

```bash
docker compose logs -f backend
```

## Reconstruir contenedores

```bash
docker compose up --build --force-recreate
```

## Ver contenedores activos

```bash
docker ps
```

## Entrar a un contenedor

```bash
docker exec -it nombre_contenedor sh
```

---

# Despliegue Local

Levantar proyecto:

```bash
docker compose up --build
```

Abrir en navegador:

```text
http://localhost:5173
```

---

# Despliegue en el Servidor 

## Datos del Servidor

Servidor 

- Usuario: `proj11`
- IP: `172.20.2.211`

---

# Conexion SSH

Desde Linux

```bash
ssh proj11@172.20.2.211
```

Desde Windows se puede usar:

- PowerShell
- Git Bash
- PuTTY

---

# Clonar el Proyecto

Una vez conectado al servidor:

```bash
git clone https://github.com/javierantoniohuamannunez/CasaOferta.git
```

Entrar al proyecto:

```bash
cd CasaOferta
```

---

# Configurar Variables de Entorno

## Frontend

Modificar:

```env
frontend/.env
```

Contenido:

```env
VITE_API_URL=http://172.20.2.211:3000
```

---

# Levantar Docker Compose

Ejecutar:

```bash
docker compose up --build -d
```

Esto levantara:

- frontend
- backend
- mysql

---

# Verificar Estado

```bash
docker ps
```

---

# Ver Logs

Logs generales:

```bash
docker compose logs -f
```

Logs del backend:

```bash
docker compose logs -f backend
```

---

# Acceso a la Aplicacion

Frontend:

```text
http://172.20.2.211:5173
```

Backend:

```text
http://172.20.2.211:3000
```

---

# Actualizar Proyecto

Si hay cambios nuevos:

```bash
git pull
docker compose up --build -d
```

---

# Posibles Problemas

## Puerto ocupado

Comprobar puertos:

```bash
sudo lsof -i :3000
```

```bash
sudo lsof -i :5173
```

---

## Docker detenido

Iniciar Docker:

```bash
sudo systemctl start docker
```

---

## Error permisos Docker

Ejecutar:

```bash
sudo docker compose up --build
```


# Conclusion

CasaOferta utiliza una arquitectura basada en Docker compuesta por:

- frontend React
- backend Node.js + Express
- MySQL
- cache persistente
- cron jobs automaticos

La aplicacion puede desplegarse tanto en local como en el servidor remoto del instituto usando Docker Compose.