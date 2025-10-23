import { useState } from 'react';
import './App.css';
import Formulario from './components/Formulario';
import Tarjeta from './components/Tarjeta';

function App() {
  const [datosFormulario, setDatosFormulario] = useState(null);
  const [productos] = useState([
    {
      id: 1,
      titulo: 'Producto 1',
      descripcion: 'Descripción del producto 1',
      precio: 29.99,
      imagen: 'https://via.placeholder.com/300x200'
    },
    {
      id: 2,
      titulo: 'Producto 2',
      descripcion: 'Descripción del producto 2',
      precio: 49.99,
      imagen: 'https://via.placeholder.com/300x200'
    },
    {
      id: 3,
      titulo: 'Producto 3',
      descripcion: 'Descripción del producto 3',
      precio: 19.99,
      imagen: 'https://via.placeholder.com/300x200'
    }
  ]);

  const handleFormSubmit = (datos) => {
    setDatosFormulario(datos);
    console.log('Datos del formulario:', datos);
  };

  const handleComprar = (producto) => {
    console.log('Comprando producto:', producto);
    alert(`Has comprado: ${producto.titulo} por $${producto.precio}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GlobalBank - Prueba de Conocimiento</h1>
      </header>
      
      <main className="App-main">
        <section className="formulario-section">
          <h2>Formulario de Contacto</h2>
          <Formulario onSubmit={handleFormSubmit} />
          
          {datosFormulario && (
            <div className="datos-enviados">
              <h3>Datos Enviados:</h3>
              <p><strong>Nombre:</strong> {datosFormulario.nombre}</p>
              <p><strong>Email:</strong> {datosFormulario.email}</p>
              <p><strong>Teléfono:</strong> {datosFormulario.telefono}</p>
              <p><strong>Mensaje:</strong> {datosFormulario.mensaje}</p>
            </div>
          )}
        </section>

        <section className="productos-section">
          <h2>Productos</h2>
          <div className="productos-grid">
            {productos.map(producto => (
              <Tarjeta
                key={producto.id}
                titulo={producto.titulo}
                descripcion={producto.descripcion}
                precio={producto.precio}
                imagen={producto.imagen}
                onComprar={handleComprar}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
