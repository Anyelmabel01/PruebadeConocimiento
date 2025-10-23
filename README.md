# Prueba de Conocimiento - GlobalBank

Aplicación web desarrollada con **React** como parte de la prueba técnica de GlobalBank.  
Permite registrar personas con su **nombre completo**, **fecha de nacimiento** y **comentarios**, validando los datos y mostrando los registros en una lista persistente.

---

## Funcionalidad

- Formulario con los campos:
  - Nombre completo  
  - Fecha de nacimiento (calendario)  
  - Comentarios
- Validaciones:
  - El nombre solo acepta letras (A–Z) y tildes.  
  - La fecha debe estar entre 1900 y el día actual.  
  - Los comentarios aceptan letras, números y signos permitidos (. , ' " & @ $ * ( ) - ; ? ¿).  
- Los datos se guardan en **sessionStorage**, por lo que no se pierden al refrescar la página.  
- Los registros se muestran en **tarjetas** con el formato:
Nombre Completo
dd/mm/yyyy, Edad: ## años
Comentarios: ...


---

## Tecnologías Utilizadas

- **React**  
- **Tailwind CSS**  
- **JavaScript (ES6+)**  
- **SessionStorage API**

---

## Instrucciones

1. Clonar el repositorio:
 ```bash
 git clone https://github.com/Anyelmabel01/PruebadeConocimiento.git
 cd prueba-globalbank


Instalar dependencias:

npm install


Ejecutar el proyecto:

npm start


Abrir en el navegador:

http://localhost:3000

Desarrollado por

Anyel Villalobos
Prueba técnica Frontend - GlobalBank
