# 🏦 Aplicación de Registro de Personas - GlobalBank

Aplicación web moderna desarrollada con React que permite registrar personas con su nombre completo, fecha de nacimiento y comentarios. Los datos se persisten en sessionStorage para evitar pérdida de información al refrescar la página.

## ✨ Características Principales

- 🎨 **Modo Oscuro/Claro**: Switch elegante para alternar entre temas
- 📝 **Formulario interactivo** con validaciones en tiempo real
- ✅ **Validación robusta** de caracteres específicos para cada campo
- 🎂 **Cálculo automático de edad** basado en fecha de nacimiento
- 💾 **Persistencia de datos** usando sessionStorage
- 🎯 **Prevención de registros duplicados**
- 📱 **Diseño 100% responsivo** para móviles, tablets y desktop
- 🎭 **Animaciones suaves** y transiciones elegantes
- ♿ **Interfaz accesible** con soporte completo de teclado
- 🚀 **Rendimiento optimizado** con React 19

## 🎨 Interfaz de Usuario

- **Header elegante** con logo de GlobalBank y gradiente azul
- **Tarjetas flotantes** con animaciones suaves al hacer hover
- **Formulario compacto** con campos optimizados
- **Calendario mejorado** con icono personalizado
- **Switch de modo oscuro** profesional con indicadores ON/OFF
- **Colores corporativos** de GlobalBank (azul y blanco)

## 🔍 Validaciones Implementadas

### Nombre Completo
- ❌ No puede estar vacío
- ✅ Solo acepta caracteres alfabéticos (A-Z, a-z)
- ✅ Permite espacios en blanco
- ✅ Permite letras con tildes (áéíóú, ÁÉÍÓÚ, ñ, Ñ)
- 📝 Ejemplo: "Anyel Villalobos"

### Fecha de Nacimiento
- 📅 Formato tipo calendario visual (input date)
- 📌 Fecha mínima: 01/01/1900
- 📌 Fecha máxima: Día actual
- ✅ Validación automática del rango
- �� Icono de calendario personalizado con hover effect

### Comentarios
- ❌ No puede estar vacío
- ✅ Acepta caracteres alfanuméricos (A-Z, 0-9)
- ✅ Acepta los siguientes caracteres especiales:
  - Punto (.)
  - Coma (,)
  - Comillas simples y dobles (' ")
  - Ampersand (&)
  - Arroba (@)
  - Signo de dólar ($)
  - Asterisco (*)
  - Paréntesis ( )
  - Guion medio (-)
  - Punto y coma (;)
  - Signos de interrogación (? ¿)
  - Espacios en blanco

## 📋 Formato de Tarjetas

Cada registro se muestra en una tarjeta elegante con:

```
[Nombre Completo]
[dd/mm/yyyy], Edad: [##] años
Comentarios: [texto del comentario]
```

Las tarjetas incluyen:
- 🎨 Borde azul de acento en el lado izquierdo
- ✨ Animación de entrada escalonada
- 🎯 Hover effect que levanta la tarjeta
- 🌓 Adaptación automática al modo oscuro
- 📱 Diseño responsivo

## 🛠️ Tecnologías Utilizadas

- **React** 19.2.0
- **React Hooks** (useState, useEffect, useMemo)
- **CSS3** con diseño responsivo y animaciones
- **SessionStorage API** para persistencia
- **Testing Library** para pruebas unitarias
- **Jest** como framework de testing
- **Custom Hooks** (useSessionStorage)

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## 🚀 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/Anyelmabel01/PruebadeConocimiento.git
cd PruebadeConocimiento/prueba-globalbank
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm start
```

4. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📜 Scripts Disponibles

### Modo Desarrollo

```bash
npm start
```

Ejecuta la aplicación en modo desarrollo.
- La página se recarga automáticamente cuando realizas cambios
- Los errores de lint se muestran en la consola
- Hot Module Replacement habilitado

### Ejecutar Tests

```bash
npm test
```

Lanza el test runner en modo interactivo.
- Ejecuta todas las pruebas unitarias (23 tests)
- Muestra resultados en tiempo real
- Coverage incluido

### Build de Producción

```bash
npm run build
```

Construye la aplicación para producción en la carpeta `build`:
- Bundle optimizado para mejor rendimiento
- Archivos minificados
- Code splitting automático
- Listo para deployment

## 📁 Estructura del Proyecto

```
prueba-globalbank/
├── public/
│   ├── index.html
│   ├── logo.png              # Logo de GlobalBank
│   └── background.avif       # Imagen de fondo
├── src/
│   ├── components/
│   │   ├── Formulario.jsx       # Componente principal con modo oscuro
│   │   ├── Formulario.test.js   # 18 tests del formulario
│   │   └── Tarjeta.jsx          # Componente de tarjeta elegante
│   ├── hooks/
│   │   ├── useSessionStorage.js      # Hook personalizado
│   │   └── useSessionStorage.test.js # 5 tests del hook
│   ├── App.jsx                  # Componente raíz
│   ├── App.css                  # Estilos globales con animaciones
│   ├── background.avif          # Background corporativo
│   ├── index.js                 # Punto de entrada
│   └── index.css                # Estilos base
├── package.json
└── README.md
```

## 🧪 Pruebas Unitarias

El proyecto incluye **23 pruebas unitarias** exhaustivas que cubren:

✅ Renderizado correcto de componentes
✅ Validaciones de todos los campos
✅ Funcionalidad de envío de formulario
✅ Cálculo preciso de edad
✅ Persistencia en sessionStorage
✅ Prevención de duplicados
✅ Manejo de errores
✅ Casos extremos
✅ Hook personalizado useSessionStorage

Para ejecutar las pruebas:

```bash
npm test
```

Para ver el coverage completo:

```bash
npm test -- --coverage
```

**Resultado actual**: ✅ 23/23 tests passing

## 📱 Diseño Responsivo

La aplicación se adapta perfectamente a diferentes dispositivos:

| Dispositivo | Breakpoint | Características |
|------------|------------|-----------------|
| 🖥️ **Desktop** | >768px | Grid de tarjetas en múltiples columnas, switch completo |
| 📱 **Tablet** | ≤768px | Layout adaptado, switch reducido |
| 📱 **Mobile** | ≤480px | Columna única, elementos compactos |

## 💾 Persistencia de Datos

Los datos se almacenan usando **sessionStorage**:

- ✅ Los registros persisten al refrescar la página (F5)
- ✅ Los datos se mantienen durante la sesión del navegador
- ✅ Se limpian al cerrar la pestaña o navegador
- ✅ No requiere backend ni base de datos
- ✅ Sincronización automática en tiempo real

## ♿ Accesibilidad

- ✅ Labels asociados correctamente a inputs
- ✅ Roles ARIA para mensajes de error
- ✅ Navegación por teclado completamente funcional
- ✅ Mensajes de error descriptivos y claros
- ✅ Botones con estados disabled apropiados
- ✅ Contraste de colores WCAG AA compliant
- ✅ Switch de modo oscuro con aria-label

## 🌐 Compatibilidad de Navegadores

| Navegador | Versión Mínima |
|-----------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

## 🎯 Características Implementadas vs Requerimientos

| Requerimiento | Estado | Notas |
|--------------|--------|-------|
| Validación de nombre (solo letras + tildes) | ✅ | Regex implementado |
| Validación fecha (1900 - hoy) | ✅ | Con calendario visual |
| Validación comentarios (alfanumérico + especiales) | ✅ | Lista completa de caracteres |
| Mostrar tarjetas con formato específico | ✅ | dd/mm/yyyy + edad |
| Persistencia con sessionStorage | ✅ | Funcional con F5 |
| Prevenir duplicados | ✅ | Por nombre + fecha |
| Diseño responsivo | ✅ | Mobile, tablet, desktop |
| Tests unitarios | ✅ | 23 tests passing |

## 🎨 Modo Oscuro

La aplicación incluye un elegante switch de modo oscuro que:

- 🌓 Alterna entre modo claro y oscuro
- 💫 Transiciones suaves en todos los elementos
- 🎨 Colores optimizados para legibilidad en ambos modos
- 💾 Estado se mantiene durante la sesión
- 📱 Funciona perfectamente en móviles

## 🚀 Mejoras Implementadas

Además de los requerimientos base:

- ✅ Modo oscuro completo con switch elegante
- ✅ Animaciones y transiciones suaves
- ✅ Tarjetas flotantes con hover effects
- ✅ Header rediseñado con bordes redondeados
- ✅ Calendario personalizado con icono SVG
- ✅ Formulario compacto y optimizado
- ✅ Background corporativo con overlay
- ✅ Custom hooks reutilizables
- ✅ Cobertura completa de tests

## 📈 Posibles Mejoras Futuras

- 🗑️ Botón para eliminar registros individuales
- ✏️ Opción para editar registros existentes
- 🔍 Filtros y búsqueda de registros
- 📤 Exportación de datos a CSV/JSON
- 📄 Paginación para grandes cantidades de registros
- 💾 LocalStorage como alternativa a sessionStorage
- 📊 Estadísticas de registros
- 🌍 Internacionalización (i18n)

## 👨‍💻 Autor

Desarrollado como prueba técnica para **GlobalBank**

## 📄 Licencia

Este proyecto fue desarrollado como prueba de conocimiento.

---

⭐ **Si te gustó este proyecto, dale una estrella en GitHub!**
