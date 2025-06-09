# pv_tp_integrador_grupo999

##🚀 Descripción del Proyecto 

Este proyecto es un Trabajo Práctico Integrador para la materia de Programación Visual de la carrera Analista Programador Universitario en la Facultad de Ingeniería de la Universidad Nacional de Jujuy. El objetivo principal es aplicar y consolidar los conocimientos adquiridos durante la cursada, desarrollando una Single Page Application (SPA) funcional.

La aplicación web está construida utilizando React, Vite y JavaScript, y gestiona datos de productos consumiendo una API REST externa (`https://fakestoreapi.com/products`). Permite a los usuarios visualizar un listado de productos, ver detalles ampliados de cada uno, marcar productos como favoritos, y gestionar productos a través de funcionalidades de creación y edición.

Se ha implementado un manejo de estado global (mediante Context API o Redux, según la indicación del profesor) para centralizar y compartir el estado de la aplicación entre los diferentes componentes y páginas. La navegación entre vistas se realiza utilizando React Router DOM. El proyecto busca simular un proceso de desarrollo iterativo, demostrando la capacidad de diseñar, implementar y gestionar una solución de software frontend robusta, aplicando buenas prácticas de desarrollo y aprovechando el ecosistema actual de JavaScript.

## 🛠️ Tecnologías Utilizadas

**React**: Biblioteca de JavaScript para construir interfaces de usuario.
**Vite**: Herramienta de construcción rápida para proyectos web.
**JavaScript**: Lenguaje de programación principal.
**React Router DOM**: Para el enrutamiento y la navegación dentro de la SPA.
**Redux**: Para el manejo de estado global.
**Fetch : Para el consumo de la API REST.
**JSX**: Para estructurar la interfaz.


## ✨ Funcionalidades Implementadas

**Página de Inicio (Home)**: Muestra un listado de productos en formato de tarjetas (cards) con Id, imagen, nombre, precio, descripción, categoría, un botón para ver más detalles y un ícono/checkbox para marcar como favorito.
**Página de Detalle del Producto**: Presenta información ampliada del producto (descripción, categoría, stock, etc.), accesible desde el botón "Ver más detalles" de cada tarjeta. Permite desmarcar el producto como favorito, actualizando automáticamente el estado global.
**Funcionalidad de Favoritos**: Los productos pueden ser marcados/desmarcados como favoritos, y su estado se almacena en un estado global accesible desde toda la aplicación.
**Página de Favoritos**: Muestra únicamente los productos que el usuario ha marcado como favoritos.
**Formulario de Creación y Edición**: Componente reutilizable para crear un nuevo producto desde cero o editar un producto existente con los campos precargados según su ID.
**Consumo de API Externa**: La aplicación consume productos desde la API REST `https://fakestoreapi.com/products` al cargar. Los productos obtenidos se guardan en el estado global para su disponibilidad en toda la app.

## 👥 Integrantes del Grupo

**[]** - GitHub: ``
