import { useMemo, useState } from "react";
import Tarjeta from "./Tarjeta";
import useSessionStorage from "../hooks/useSessionStorage";

const RE_NOMBRE = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
const RE_COMENT = /^[A-Za-z0-9.,'"&@$*()-;¿?\s]+$/;

function hoyISO() {
  return new Date().toISOString().split("T")[0];
}

function ddmmyyyy(isoDate) {
  const [y, m, d] = isoDate.split("-");
  return `${d}/${m}/${y}`;
}

function edadExacta(isoDate) {
  const d = new Date(isoDate);
  const hoy = new Date();
  let edad = hoy.getFullYear() - d.getFullYear();
  const mes = hoy.getMonth() - d.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < d.getDate())) edad--;
  return edad;
}



export default function Formulario() {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [errores, setErrores] = useState({ nombre: "", fecha: "", comentarios: "" });

  
  const [personas, setPersonas] = useSessionStorage("personas", []);

 
  const minFecha = "1900-01-01";
  const maxFecha = useMemo(() => hoyISO(), []);

 
  function validarNombre(v) {
    if (!v.trim()) return "El nombre no puede estar vacío.";
    if (!RE_NOMBRE.test(v)) return "Usa solo letras (con tildes) y espacios.";
    return "";
  }
  function validarFecha(v) {
    if (!v) return "Debe seleccionar una fecha.";
    const f = new Date(v);
    if (f < new Date(minFecha) || f > new Date()) return "La fecha debe estar entre 1900 y hoy.";
    return "";
  }
  function validarComentarios(v) {
    if (!v.trim()) return "El comentario no puede estar vacío.";
    if (!RE_COMENT.test(v)) return "Solo letras, números y . , ' \" & @ $ * ( ) - ; ? ¿";
    return "";
  }

 
  function validarTodo() {
    const e = {
      nombre: validarNombre(nombre),
      fecha: validarFecha(fecha),
      comentarios: validarComentarios(comentarios),
    };
    setErrores(e);
    return !e.nombre && !e.fecha && !e.comentarios;
  }

  
  function esDuplicado(n, f) {
    return personas.some(p => p.nombre.trim() === n.trim() && p.fecha === f);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!validarTodo()) return;

    if (esDuplicado(nombre, fecha)) {
      setErrores(prev => ({ ...prev, nombre: "Ya existe este registro (nombre + fecha)." }));
      return;
    }

    const generateId = () => {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    };

    const registro = {
      id: generateId(),
      nombre: nombre.trim().replace(/\s+/g, " "),
      fecha,
      comentarios: comentarios.trim(),
      creadoEn: Date.now(),
    };

    
    setPersonas([registro, ...personas]);
    setNombre("");
    setFecha("");
    setComentarios("");
    setErrores({ nombre: "", fecha: "", comentarios: "" });
  }

  const disabled = !nombre || !fecha || !comentarios;

  return (
    <div className="container" role="main" aria-labelledby="titulo-form">
      <h2 id="titulo-form">Formulario de Registro</h2>

      <form onSubmit={onSubmit} className="formulario" noValidate>
        <div className="campo">
          <label htmlFor="nombre">Nombre completo</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              if (errores.nombre) setErrores(prev => ({ ...prev, nombre: "" }));
            }}
            placeholder="Ej: Juan Pérez"
            autoComplete="name"
          />
          {errores.nombre && <span className="error" role="alert">{errores.nombre}</span>}
        </div>

        <div className="campo">
          <label htmlFor="fecha">Fecha de nacimiento</label>
          <input
            id="fecha"
            type="date"
            value={fecha}
            min={minFecha}
            max={maxFecha}
            onChange={(e) => {
              setFecha(e.target.value);
              if (errores.fecha) setErrores(prev => ({ ...prev, fecha: "" }));
            }}
          />
          {errores.fecha && <span className="error" role="alert">{errores.fecha}</span>}
        </div>

        <div className="campo">
          <label htmlFor="comentarios">Comentarios</label>
          <textarea
            id="comentarios"
            value={comentarios}
            onChange={(e) => {
              setComentarios(e.target.value);
              if (errores.comentarios) setErrores(prev => ({ ...prev, comentarios: "" }));
            }}
            placeholder="Escriba sus comentarios aquí…"
          />
          {errores.comentarios && <span className="error" role="alert">{errores.comentarios}</span>}
        </div>

        <button type="submit" className="boton-agregar" disabled={disabled}>
          Agregar
        </button>
      </form>

      <hr />

      <h3>Lista de Personas</h3>
      <div className="lista-tarjetas">
        {personas.map((p) => (
          <Tarjeta
            key={p.id}
            nombre={p.nombre}
            fechaFormateada={`${ddmmyyyy(p.fecha)}`}
            edad={`${edadExacta(p.fecha)} años`}
            comentarios={p.comentarios}
          />
        ))}
      </div>
    </div>
  );
}

