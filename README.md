# ecommerce-angular-node
Prueba técnica de un e-commerce utilizando el stack MEAN (MongoDB - Express - Angular - Node)

## Contenido del repositorio
Dentro del repositorio se encuentran 2 proyectos:
  1. api_ecommerce: api de los servicios back-end del e-commerce.
  2. jacobs-ecommerce: app creada en angular, este es el e-commerce, disponible para acceso público y también administradores del sitio. 

## Tecnologías y versiones utilizadas
- api_ecommerce:
    - Node.js v14.21.3
    - Express v4.18.2
    - MongoDB v7.0
- jacobs-ecommerce:
    - Node: v18.17.1
    - Angular CLI: v16.2.1

## Instrucciones
- Usa las versiones de Node.js mencionadas anteriormente para descargar los paquetes (npm install) y la ejecución de los proyectos, para evitar posibles inconvenientes.
- Por seguridad, desde el proyecto Front (jacobs-ecommerce) sólo es posible registrarse desde la interfaz gráfica como un usuario normal, para crear un usuario de tipo administrador debe ser directamente en el back, para crear un usario tipo admin tienes 2 opciones:
    1. crear un registro de usuario de tipo admin utilizando su cliente de API preferida (postman, insomnia, etc) con las siguientes indicaciones:
        -  URL: http://localhost:3000/api/users/register
        -  Form (campos requeridos): name, rol, email, password
        -  Nota: En el campo rol el value debe ser: admin
    2.  Cree un registro desde la interfaz gráfica del front (jacobs-ecommerce) ruta: http://localhost:4200/auth/login, y despues, desde un gestor de bases de datos (MongoDBCompass, Studio 3T, etc) cambia el valor del rol del registro de 'cliente' a 'admin'

## Instrucciones de instalación y ejecución 
- Ejecuta el comando 'npm install' en su consola preferida estando ubicado dentro de cada proyecto para bajar todos los paquetes necesarios para el correcto funcionamiento de las aplicaciones.
- Se utilizó MongoDB para crear el proyecto del back, por lo cual el puerto para conectarse a la base de datos es el predeterminado; el 3000. Si desea usar un puerto distinto al 3000; deberá cambiar el puerto especificado en el archivo .env ubicado en las raíces de los proyectos. 
- ejecuta el comando 'npm run start' en su consola preferida estando ubicado dentro del proyecto para ejecutar el proyecto del back-end (api_ecommerce).
- ejecuta el comando 'ng serve' en su consola preferida estando ubicado dentro del proyecto de front-end (jacobs-ecommerce) para ejecutarlo.
