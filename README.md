# BACKEND ECOMMERCE

Este proyecto se trata de una tienda virtual o ecommerce para la venta de artículos tecnológicos.

## INSTALACIÓN

Una vez que tengas acceso al repositorio, puedes clonarlo con el comando:

> `git clone url`

Habiendo instalado, debes instalar todas las dependencias del proyecto, para ello, te ubicas dentro de la carpeta del proyecto y ejecutas el comando:

> `npm i`

## **RUTAS USUARIO**

Todas las rutas de usuario se encuentran en **/user**

Las peticiones que se pueden realizar son:

### **POST**

#### **/user/register**

Esta ruta realiza la creación de un nuevo usuario, para ello necesita la información del nuevo usuario por body:

- nombre
- usuario
- contrasena
- email
- pais
- provincia
- direccion
- telefono

Si la información entregada es correcta y se ha creado el usuario, se responderá con un status **_201_** y un json con un atributo **_token_**.

**Ejemplo:**

`{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo2fSwiaWF0IjoxNjQ0MjcxMjAzLCJleHAiOjE2NDQ2MzEyMDN9.zPTUUZuFGvXIiEhqA4i2idG---eTq_LINsOlL4d8j7g" }`

#### **/user/login**

Esta ruta realiza el login de un usuario ya existente, para ello necesita que se envíen las credenciales por body:

- contrasena
- email

Si las credenciales son correctas, devuelve un token por body, como en la ruta /user/register.

Si no hay un token me devuelve un status **_404_** y el mensaje **_Token not found_**.

Si las credenciales no son válidas, me devuelve un status **_400_** y el mensaje **_Credenciales no validas_**.

### **GET**

#### **/user**

Esta ruta es privada y solo le permite acceder al propietario de la cuenta.

_Requerimientos:_

**_Header:_**

- x-auth-token

Si el token es válido me proporciona un status la información del usua

## **RUTAS PRODUCTO**

Todas las rutas producto se encuentran en **/products**

Las peticiones que se pueden realizar son:

### **GET**

Todas las peticiones GET en cualquier ruta de producto son públicas y no requieren ningún **token**

#### **/products**

Si no ha habido ningún error nos devuelve un status **_200_** y por body un **_array_** con todos los productos que estén en la base de datos. Cada producto cuenta con los siguientes campos:

**Tipo Number**

- id
- price
- rate
- count
- cantidad

**Tipo String**

- title
- description
- image
- createdAt
- updatedAt
- category

#### **/products/_:id_**

Si no halla ningún producto con el id especificado devuelve un status **_404_** y el mensaje **_Producto no encontrado_**.

Si halla el producto devolverá toda la información del producto (la misma especificada en la ruta anterior).

#### **/products/category/_:categoryId_**

Si el **id** proporcionado en el parámetro :id se corresponde con una categoría existente y esa categoría ya cuenta con productos registrados, nos devuelve un status **_200_** y un **_array_** con todos los productos pertenecientes a la categoría especificada.

Si la categoría existe pero no tiene productos nos devuelve un status **_404_** y un mensaje **_Ningún producto pertenece a esta categoría_**.

Si la categoría no existe nos devuelve un status **_400_** y el mensaje **_No existe la categoría especificada_**.

### **POST**

#### **/products**

Esta petición es únicamente para el administrador, por lo que se requiere que se envíe por header de la peticion un atributo llamado **x-auth-token** con un string correspondiente al token (el que se sacaría de la localStorage).

_Requerimientos:_

**_Header:_**

- x-auth-token
- Content-type

**_Body:_**

- title
- price
- description
- category
- image
- rate
- count
- cantidad

Si el producto fue creado con éxito, nos devuelve un status **_201_** y por body el producto creado (con todos los campos especificados en la petición GET /products).

Si se ha enviado un title que ya existe en la base de datos, nos devolverá un status **_400_** con el mensaje **_Ya existe un producto con ese nombre (title)_**

### **PUT**

#### **/products/:id**

Esta ruta es privada y sólo permitida para el administrador nos permite actualizar un producto por el id proporcionado por params

_Requerimientos:_

**_Header:_**

- x-auth-token
- Content-type

**_Body:_**

- title
- price
- description
- category
- image
- rate
- count
- cantidad

### **DELETE**

#### **/products/:id**

Esta ruta es privada y sólo permitida para el administrador. Nos permite eliminar un producto por el id proporcionado por params

_Requerimientos:_

**_Header:_**

- x-auth-token

Si el producto se eliminó correctamente nos devuelve un status **_204_** y ningún contenido por body.

Si no se encontró el producto a eliminar, nos devuelve un status **_404_** y el mensaje **_Id no válido_**.
