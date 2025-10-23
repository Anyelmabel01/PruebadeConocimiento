# Aplicacion de Registro de Personas

Aplicacion web desarrollada con React que permite registrar personas con su nombre completo, fecha de nacimiento y comentarios. Los datos se persisten en sessionStorage para evitar perdida de informacion al refrescar la pagina.

## Caracteristicas

- Formulario interactivo con validaciones en tiempo real
- Validacion de caracteres especificos para cada campo
- Calculo automatico de edad basado en fecha de nacimiento
- Visualizacion de registros en tarjetas
- Persistencia de datos usando sessionStorage
- Diseno responsivo para dispositivos moviles y desktop
- Prevencion de registros duplicados
- Interfaz de usuario moderna y accesible

## Validaciones Implementadas

### Nombre Completo
- No puede estar vacio
- Solo acepta caracteres alfabeticos (A-Z)
- Permite espacios en blanco
- Permite letras con tildes (áéíóú, ÁÉÍÓÚ, ñ, Ñ)

### Fecha de Nacimiento
- Formato tipo calendario (input date)
- Fecha minima: 01/01/1900
- Fecha maxima: Dia actual
- Validacion automatica del rango

### Comentarios
- No puede estar vacio
- Acepta caracteres alfanumericos (A-Z, 0-9)
- Acepta los siguientes caracteres especiales:
  - Punto (.)
  - Coma (,)
  - Comillas simples y dobles (' ")
  - Ampersand (&)
  - Arroba (@)
  - Signo de dolar ($)
  - Asterisco (*)
  - Parentesis ( )
  - Guion medio (-)
  - Punto y coma (;)
  - Signos de interrogacion (? ¿)
  - Espacios en blanco

## Formato de Tarjetas

Cada registro se muestra en una tarjeta con la siguiente informacion:

```
[Nombre Completo]
[dd/mm/yyyy], Edad: [##] años
Comentarios: [texto del comentario]
```

## Tecnologias Utilizadas

- React 19.2.0
- React Hooks (useState, useEffect, useMemo)
- CSS3 con diseño responsivo
- SessionStorage API
- Testing Library para pruebas unitarias
- Jest como framework de testing

## Requisitos Previos

- Node.js (version 14 o superior)
- npm (version 6 o superior)

## Instalacion

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/prueba-globalbank.git
cd prueba-globalbank
```

2. Instalar dependencias:
```bash
npm install
```

## Scripts Disponibles

### Modo Desarrollo

```bash
npm start
```

Ejecuta la aplicacion en modo desarrollo.
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

La pagina se recarga automaticamente cuando realizas cambios.
Los errores de lint se muestran en la consola.

### Ejecutar Tests

```bash
npm test
```

Lanza el test runner en modo interactivo.
Ejecuta todas las pruebas unitarias y muestra los resultados.

### Build de Produccion

```bash
npm run build
```

Construye la aplicacion para produccion en la carpeta `build`.
Optimiza el bundle para mejor rendimiento.
Los archivos estan minificados y listos para deployment.

## Estructura del Proyecto

```
prueba-globalbank/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Formulario.jsx       # Componente principal del formulario
│   │   ├── Formulario.test.js   # Tests del formulario
│   │   └── Tarjeta.jsx          # Componente de tarjeta de persona
│   ├── hooks/
│   │   ├── useSessionStorage.js      # Hook personalizado para sessionStorage
│   │   └── useSessionStorage.test.js # Tests del hook
│   ├── App.jsx                  # Componente raiz
│   ├── App.css                  # Estilos globales
│   ├── index.js                 # Punto de entrada
│   └── index.css                # Estilos base
├── package.json
└── README.md
```

## Pruebas Unitarias

El proyecto incluye pruebas unitarias exhaustivas que cubren:

- Renderizado correcto de componentes
- Validaciones de campos
- Funcionalidad de envio de formulario
- Calculo de edad
- Persistencia en sessionStorage
- Prevencion de duplicados
- Manejo de errores
- Casos extremos

Para ejecutar las pruebas:

```bash
npm test
```

Para ver el coverage:

```bash
npm test -- --coverage
```

## Diseño Responsivo

La aplicacion se adapta automaticamente a diferentes tamaños de pantalla:

- **Desktop (>768px)**: Grid de tarjetas en multiples columnas
- **Tablet (768px)**: Layout adaptado con columna unica
- **Mobile (<480px)**: Optimizacion de tamaños de fuente y espaciado

## Persistencia de Datos

Los datos se almacenan en sessionStorage del navegador:

- Los registros persisten al refrescar la pagina (F5)
- Los datos se mantienen durante la sesion del navegador
- Se limpian al cerrar la pestaña o navegador
- No se requiere backend ni base de datos

## Accesibilidad

- Labels asociados correctamente a inputs
- Roles ARIA para mensajes de error
- Navegacion por teclado funcional
- Mensajes de error descriptivos
- Botones con estados disabled apropiados

## Compatibilidad de Navegadores

- Chrome (ultima version)
- Firefox (ultima version)
- Safari (ultima version)
- Edge (ultima version)

## Mejoras Futuras

Posibles mejoras que se podrian implementar:

- Boton para eliminar registros individuales
- Opcion para editar registros existentes
- Filtros y busqueda de registros
- Exportacion de datos a CSV/JSON
- Paginacion para grandes cantidades de registros
- LocalStorage como alternativa a sessionStorage
- Animaciones mas elaboradas
- Temas claro/oscuro

## Licencia

Este proyecto fue desarrollado como prueba tecnica.

## Contacto

Para cualquier consulta o sugerencia, contactar al desarrollador.
