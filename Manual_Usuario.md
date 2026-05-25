# Manual de Usuario

## Descripcion

CasaOferta es una pagina para buscar videojuegos ver ofertas por tienda, revisar historial de precios y gestionar favoritos y lista de deseo.

## Requisitos

- Tener acceso al frontend y backend configurados.
- Tener una cuenta si quieres usar favoritos, alertas y perfil.

## Inicio

1. Abre la aplicacion en el navegador.
2. En la pantalla principal veras:
   - Categorias
   - Ofertas destacadas
   - Juegos destacados
   - Buscador

## Navegacion 

### Buscador

- Buscar por nombre del juego
- Puedes ver el detalle de cualquier juego haciendo clic al card del resultado

### Categorias

- En la seccion `Categorias` puedes filtrar juegos por su genero
- Al entrar veras los juegos relacionados

### Ofertas Destacadas

- En `Ofertas destacadas` se muestran tiendas con sus mejores descuentos.
- Puedes entrar:
  - al detalle de una tienda,
  - o al detalle de una oferta concreta.

### Juegos Destacados

- En `Juegos destacados` se muestran juegos mas populares o mejores valorados
- Desde ahi puedes abrir el detalle completo del juego.

## Detalle de Juego

En la vista de detalle de juego puedes:

- Ver la imagen principal del juego.
- Consultar el mejor precio disponible.
- Revisar el descuento actual.
- Ver plataformas disponibles.
- Ver generos relacionados.
- Consultar el historial de precios.
- Revisar todas las ofertas disponibles.

### Acciones disponibles

- `Corazon`: agrega o quita el juego de favoritos.
- `Campana`: agrega o quita el juego de tu lista de deseo.
- `Ver oferta`: abre la mejor oferta disponible.

## Detalle de Oferta

En la vista de detalle de oferta puedes:

- Ver la oferta principal de una tienda.
- Consultar precio actual, precio anterior y descuento.
- Ver historial de precios.
- Revisar otras ofertas disponibles para el mismo juego.
- Abrir la oferta en la tienda externa.

## Login y Registro

### Registro

1. Entra en `Register`.
2. Completa los datos solicitados.
3. Crea tu cuenta.

### Login

1. Entra en `Login`.
2. Introduce tus credenciales.
3. Accede a tu perfil y funciones guardadas.

## Perfil

En `Perfil` puedes ver:

- Tu correo o informacion basica.
- Cantidad de favoritos.
- Cantidad de juegos en lista de deseo.
- Lista de juegos favoritos.
- Lista de deseo.

### Desde el perfil puedes

- Abrir un juego favorito.
- Entrar al detalle de un juego guardado en wishlist.
- Eliminar juegos de la lista de deseo.

## Favoritos

Los favoritos sirven para guardar juegos que quieres revisar mas tarde.

### Como usar favoritos

1. Inicia sesion.
2. Abre el detalle de un juego o una oferta.
3. Pulsa el icono del corazon.
4. El juego se guardara en tu perfil si el backend lo registra correctamente.

## Lista de Deseo y Alertas

La lista de deseo sirve para guardar juegos u ofertas para seguimiento de precio.

### Como usar alertas

1. Inicia sesion.
2. Abre el detalle de un juego o una oferta.
3. Pulsa el icono de la campana.
4. El elemento quedara guardado en tu lista de deseo.

## Historial de Preciose

- En detalles de juego y oferta puedes consultar la evolucion del precio.
- Si el proveedor externo no devuelve historial, se mostrara un mensaje

## Posibles Problemas

### No puedo guardar favoritos o alertas

- Revisar que has iniciado sesion
- Comprueba que el backend esta en ejecucion
- Revisa que el token de autenticacion siga siendo valido

### No aparecen ofertas

- Puede que no haya datos disponibles desde la API
- Puede que el juego o la tienda no tengan ofertas activas en ese momento.

### No aparece el historial de precios

- Algunos juegos u ofertas no devuelven historial desde el servicio externo.

## Recomendaciones

- Usa el buscador para encontrar juegos rapidamente.
- Revisa `Ofertas destacadas` para ver descuentos recientes.
- Guarda juegos en favoritos si quieres volver a ellos luego.
- Usa la campana para hacer seguimiento de precios.

## Flujo de Uso

1. Buscar o explorar un juego.
2. Abrir su detalle.
3. Revisar precio e historial.
4. Guardar en favoritos o lista de deseo.
5. Consultar luego desde el perfil.
