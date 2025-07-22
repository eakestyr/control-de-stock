# Control de Stock

Este proyecto tiene como objetivo ofrecer una solución simple, eficaz y funcional para el control de inventarios. Es un MVP (Producto Mínimo Viable) diseñado para ser intuitivo y fácil de usar, permitiendo a los usuarios gestionar sus productos de manera rápida y sin complicaciones. El sistema tiene como pilares una interfaz sencilla y un backend robusto que facilita todas las operaciones necesarias para administrar el stock de una manera eficiente. Así, con solo unos clics, puedes crear tu cuenta, ingresar al sistema y comenzar a registrar, editar y eliminar productos de tu inventario de manera inmediata.

A través de este proyecto, busqué crear una herramienta accesible que permita incluso a aquellos sin conocimientos técnicos en programación o bases de datos poder implementar un sistema de control de stock. El sistema permite gestionar productos, lo que incluye la posibilidad de agregar nuevos artículos, modificarlos según sea necesario, eliminar aquellos que ya no sean relevantes, e incluso realizar búsquedas de productos dentro del inventario. A lo largo del desarrollo de este proyecto, fue crucial que el sistema tuviera un diseño limpio y una estructura de datos bien organizada, lo que se logró con el uso de tecnologías modernas tanto en el frontend como en el backend, asegurando así un flujo de trabajo ágil y eficiente.

El proyecto está dividido en dos partes principales: el frontend y el backend. El frontend es el encargado de la interacción con el usuario, permitiendo una experiencia visual fluida y dinámica. Mientras tanto, el backend es el que se encarga de gestionar las peticiones del cliente, el almacenamiento de datos y la conexión con la base de datos. Gracias a esta arquitectura, es posible mantener la aplicación organizada y modular, lo que facilita tanto su mantenimiento como la implementación de nuevas funcionalidades en el futuro. La elección de Vue 3 para el frontend se debió a su naturaleza reactiva y sencilla, mientras que Node.js y MariaDB fueron las tecnologías elegidas para el backend, debido a la familiaridad con ellas y su capacidad para manejar grandes volúmenes de datos de manera eficiente.

## Tecnologías Utilizadas

Este proyecto hace uso de una combinación de tecnologías modernas que permiten una experiencia robusta y flexible tanto en el frontend como en el backend. En el lado del cliente, se utilizó **Vue 3**, un framework progresivo que facilita la creación de interfaces de usuario interactivas y reactivas. **TailwindCSS** se empleó para el diseño, proporcionando un enfoque altamente personalizable para la creación de interfaces visualmente atractivas y consistentes. Además, **FontAwesome CDN** se utilizó para los iconos, dándole al sistema una estética más pulida y profesional. Finalmente, **TypeScript** se eligió para garantizar la robustez del código, ofreciendo tipado estático y mejorando la mantenibilidad y escalabilidad del proyecto.

Por otro lado, el backend está compuesto por **Node.js** y **Express.js**, tecnologías altamente escalables y eficientes para gestionar las peticiones del servidor. **Prisma ORM** se utilizó como capa de acceso a la base de datos, ya que proporciona una forma sencilla y eficiente de interactuar con MariaDB, la base de datos que se utiliza en este proyecto. **MariaDB** fue seleccionado en lugar de MongoDB o PostgreSQL debido a la familiaridad con esta base de datos relacional, lo que facilitó su configuración e integración con Prisma. A lo largo del desarrollo, se priorizó el rendimiento, la escalabilidad y la facilidad de mantenimiento, lo que permitió optimizar la gestión de datos y garantizar una experiencia de usuario rápida y fluida.

## Instalación y Ejecución

Para instalar y ejecutar el proyecto en tu máquina local, sigue los pasos detallados a continuación. Primero, clona o descarga el archivo .zip del proyecto desde el repositorio de GitHub y extrae el contenido en una carpeta de tu elección. Luego, abre una terminal y navega hasta las carpetas `frontend/` y `backend/` del proyecto. Una vez dentro de cada carpeta, ejecuta el siguiente comando para instalar las dependencias necesarias:  
`npm install`.

Asegúrate de tener **Node.js** y **TypeScript** instalados en tu máquina, ya que son imprescindibles para ejecutar tanto el frontend como el backend. También necesitarás tener un servidor de base de datos MariaDB corriendo en tu máquina local o en un servidor remoto. Una vez que todo esté instalado y configurado, accede al archivo `.env` dentro de la carpeta `backend/` y ajusta las configuraciones de la base de datos y las variables de entorno necesarias para conectar el backend con la base de datos.

Una vez que hayas configurado las variables de entorno correctamente, es hora de ejecutar el sistema. En la carpeta `frontend/`, ejecuta el siguiente comando para iniciar el servidor de desarrollo:  
`npm run dev`. Este comando iniciará la aplicación frontend y abrirá un servidor local en el navegador. A continuación, en la carpeta `backend/`, ejecuta:  
`node dist/server.js`. Esto iniciará el servidor del backend y permitirá que la aplicación frontend se comunique con la base de datos a través de la API. Ahora puedes acceder al sistema y probar todas las funcionalidades de control de inventarios que ofrece.

## Capturas de Pantalla

A continuación, se muestran algunas capturas de pantalla del sistema, tanto antes como después de añadir productos al inventario. Estas imágenes ilustran cómo se ve la interfaz de usuario en distintas etapas de la gestión de stock.

**Páginas sin productos:**

- ![Página de Login](https://i.postimg.cc/G2XKJSDH/page-login.png)  
  La página de inicio de sesión permite al usuario acceder al sistema con su cuenta previamente registrada.
  
- ![Página de Registro](https://i.postimg.cc/hjYxGFxb/page-registrar.png)  
  Si el usuario aún no tiene una cuenta, puede registrarse a través de esta página de registro.
  
- ![Página del Panel de Control](https://i.postimg.cc/yd3hcY7r/page-principal.png)  
  El panel de control muestra el inventario actual, con opciones para gestionar los productos.

- ![Página de Registro de Producto](https://i.postimg.cc/x17cHGqn/page-cadastrar-produto.png)  
  Desde aquí, el usuario puede añadir nuevos productos al inventario, completando información básica como nombre y cantidad.

- ![Página de Edición de Producto](https://i.postimg.cc/wBXgvDmW/page-editar-produto.png)  
  La página de edición permite modificar los datos de los productos existentes en el inventario.

- ![Página de Eliminación de Producto](https://i.postimg.cc/K8FyWRVB/page-remover-produto.png)  
  En esta pantalla, el usuario puede eliminar productos que ya no necesite gestionar en su inventario.

**Páginas con productos registrados:**

- ![Página del Panel con Productos](https://i.postimg.cc/9QNJ7kG0/page-principal-com-produto.png)  
  El panel de control actualizado muestra los productos registrados en el inventario, con opciones para editarlos o eliminarlos.

- ![Página de Edición de Producto con Datos](https://i.postimg.cc/8P7FCnPt/page-editar-produto-com-produto.png)  
  Esta página permite editar los detalles de un producto ya existente en el inventario.

## Licencia

Copyright © 2025 @eakestyr
