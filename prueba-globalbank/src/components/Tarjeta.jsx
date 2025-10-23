export default function Tarjeta({ nombre, fechaFormateada, edad, comentarios, style }) {
  return (
    <article className="tarjeta" style={style}>
      <h3 className="tarjeta-nombre">{nombre}</h3>
      <p className="tarjeta-fecha">
        {fechaFormateada}, Edad: {edad}
      </p>
      <p className="tarjeta-comentarios">
        <span className="label">Comentarios:</span> {comentarios}
      </p>
    </article>
  );
}
