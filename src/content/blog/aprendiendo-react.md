---
title: "React desde cero: mi camino semana a semana"
description: "No tutoriales de 10 horas. No copiar y pegar sin entender. Este es mi roadmap real para aprender React con intención, semana a semana."
pubDate: "2026-04-08"
image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
tags: ["React", "Frontend", "JavaScript", "Roadmap"]
draft: false
---

# React desde cero ⚛️

Aprender React sin un plan es como construir una casa empezando por el techo. Existe mucho ruido: tutoriales infinitos, frameworks encima de frameworks, y opiniones contradictorias en cada foro. Este roadmap es mi intento de cortar ese ruido.

**La regla que me puse:** entender cada cosa antes de avanzar. Si no lo puedo explicar con mis palabras, no lo aprendí.

---

## SEMANA 1: El terreno antes de construir

Antes de ver un solo `<div>` en JSX, hay cosas que React da por sentadas. Si las ignoras, todo te parecerá magia negra.

**¿Qué necesito saber sí o sí?**

- Destructuring de objetos y arrays
- Spread operator (`...`)
- Arrow functions
- `.map()`, `.filter()`, `.reduce()`
- Módulos ES: `import` / `export`
- Promesas y `async/await` básico

```js
// Si esto te parece raro, para aquí y refuerza JS primero
const { nombre, edad } = usuario;
const numeros = [1, 2, 3];
const dobles = numeros.map((n) => n * 2); // [2, 4, 6]
```

**Meta de la semana:** poder leer código JavaScript moderno sin fruncir el ceño.

---

## SEMANA 2: Hola, componentes ⚡

React es componentes. Todo es un componente. El universo es un componente.

```jsx
// Mi primer componente de verdad
function Saludo({ nombre }) {
  return (
    <div className="saludo">
      <h1>Hola, {nombre} 👋</h1>
      <p>Bienvenido a React.</p>
    </div>
  );
}

// Así se usa
<Saludo nombre="Walter" />;
```

Lo que aprendí esta semana:

- JSX no es HTML — es JavaScript disfrazado
- Los componentes son **funciones** que retornan UI
- Las props son los argumentos de esas funciones
- `className` en lugar de `class` — el primero WTF

**Error clásico que cometí:**

```jsx
// ❌ Esto truena — JSX necesita un solo elemento raíz
return (
  <h1>Hola</h1>
  <p>Mundo</p>
);

// ✅ Solución: Fragment
return (
  <>
    <h1>Hola</h1>
    <p>Mundo</p>
  </>
);
```

**Meta de la semana:** construir una card de perfil con props dinámicas.

---

## SEMANA 3: Estado — cuando la UI necesita memoria 🧠

Las props son de solo lectura. El estado es lo que cambia. Sin `useState`, tu app es una foto fija.

```jsx
import { useState } from "react";

function Contador() {
  const [cuenta, setCuenta] = useState(0);

  return (
    <div>
      <p>Llevas {cuenta} clicks</p>
      <button onClick={() => setCuenta(cuenta + 1)}>+1</button>
      <button onClick={() => setCuenta(0)}>Reset</button>
    </div>
  );
}
```

La regla que no puedo olvidar: **nunca mutes el estado directamente.**

```jsx
// ❌ Esto no re-renderiza el componente
estado.nombre = "Walter";

// ✅ Así se hace
setEstado({ ...estado, nombre: "Walter" });
```

**Meta de la semana:** un formulario controlado que actualiza estado en tiempo real.

---

## SEMANA 4: Efectos secundarios y el ciclo de vida 🔄

`useEffect` es donde React se conecta al mundo exterior: APIs, timers, el DOM directo.

```jsx
import { useState, useEffect } from "react";

function PerfilUsuario({ id }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setCargando(true);

    fetch(`https://api.ejemplo.com/usuarios/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUsuario(data);
        setCargando(false);
      });
  }, [id]); // ← el array de dependencias importa MUCHO

  if (cargando) return <p>Cargando...</p>;
  return <h2>{usuario.nombre}</h2>;
}
```

Las tres formas del array de dependencias:

```jsx
useEffect(() => { ... });          // corre en CADA render — casi nunca quieres esto
useEffect(() => { ... }, []);      // solo al montar — como componentDidMount
useEffect(() => { ... }, [valor]); // cuando `valor` cambia
```

**Meta de la semana:** consumir una API pública y mostrar datos reales.

---

## SEMANA 5: Listas, keys, y renderizado condicional 📋

Aquí es donde React empieza a sentirse útil de verdad.

```jsx
function ListaTareas({ tareas }) {
  return (
    <ul>
      {tareas.map((tarea) => (
        <li key={tarea.id} className={tarea.completada ? "done" : ""}>
          {tarea.titulo}
        </li>
      ))}
    </ul>
  );
}
```

Por qué `key` importa: React usa las keys para saber qué cambió, qué se agregó, qué se eliminó. Sin keys únicas, React adivina — y adivina mal.

**Renderizado condicional — mis patrones favoritos:**

```jsx
// Patrón 1: cortocircuito (&&)
{
  usuario && <Perfil data={usuario} />;
}

// Patrón 2: ternario
{
  cargando ? <Spinner /> : <Contenido />;
}

// Patrón 3: early return (el más legible)
if (!datos) return <p>Sin datos</p>;
return <Dashboard datos={datos} />;
```

**Meta de la semana:** una lista de tareas con agregar, completar y eliminar.

---

## SEMANA 6: Elevando estado y comunicación entre componentes 🗣️

Los datos fluyen hacia abajo (props), los eventos hacia arriba (callbacks). Este patrón es el corazón de React.

```jsx
function App() {
  const [tareas, setTareas] = useState([]);

  const agregarTarea = (nuevaTarea) => {
    setTareas([...tareas, nuevaTarea]);
  };

  return (
    <div>
      <Formulario onAgregar={agregarTarea} />
      <Lista tareas={tareas} />
    </div>
  );
}

function Formulario({ onAgregar }) {
  const [texto, setTexto] = useState("");

  const handleSubmit = () => {
    if (!texto.trim()) return;
    onAgregar({ id: Date.now(), titulo: texto });
    setTexto("");
  };

  return (
    <div>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} />
      <button onClick={handleSubmit}>Agregar</button>
    </div>
  );
}
```

**Meta de la semana:** dos componentes hermanos que comparten estado a través del padre.

---

## SEMANA 7: React Router — múltiples páginas, una sola app 🗺️

Las SPAs (Single Page Applications) simulan navegación sin recargar el browser.

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/proyectos">Proyectos</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/proyectos/:id" element={<DetalleProyecto />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </BrowserRouter>
  );
}

// Leer parámetros de la URL
import { useParams } from "react-router-dom";

function DetalleProyecto() {
  const { id } = useParams();
  return <h1>Proyecto #{id}</h1>;
}
```

**Meta de la semana:** un portafolio de 3 páginas con navegación funcional.

---

## SEMANA 8: Custom Hooks — reutilizar lógica como un pro 🎣

Si un componente tiene demasiada lógica, extraerla a un hook personalizado. Los hooks son solo funciones que usan otros hooks.

```jsx
// Custom hook para fetch de datos
function useFetch(url) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCargando(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta");
        return res.json();
      })
      .then((data) => setDatos(data))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [url]);

  return { datos, cargando, error };
}

// Usarlo es limpio y declarativo
function Usuarios() {
  const { datos, cargando, error } = useFetch(
    "https://api.ejemplo.com/usuarios",
  );

  if (cargando) return <Spinner />;
  if (error) return <Error mensaje={error} />;
  return <ListaUsuarios usuarios={datos} />;
}
```

**Meta de la semana:** extraer toda la lógica de fetch en un hook reutilizable.

---

## SEMANA 9: Context API — estado global sin prop drilling 🌐

Cuando pasas props por 4 o 5 niveles de componentes, algo está mal. Context resuelve eso.

```jsx
import { createContext, useContext, useState } from "react";

// 1. Crear el contexto
const TemaContext = createContext();

// 2. Proveedor que envuelve la app
function TemaProvider({ children }) {
  const [tema, setTema] = useState("claro");

  const toggleTema = () => setTema((t) => (t === "claro" ? "oscuro" : "claro"));

  return (
    <TemaContext.Provider value={{ tema, toggleTema }}>
      {children}
    </TemaContext.Provider>
  );
}

// 3. Consumir desde cualquier nivel
function BotonTema() {
  const { tema, toggleTema } = useContext(TemaContext);
  return (
    <button onClick={toggleTema}>
      Cambiar a modo {tema === "claro" ? "oscuro" : "claro"}
    </button>
  );
}
```

**Regla de oro:** Context no reemplaza a Redux ni a Zustand para estado complejo. Es para estado que muchos componentes necesitan leer pero que no cambia muy frecuentemente.

**Meta de la semana:** tema claro/oscuro que persiste entre páginas.

---

## SEMANA 10: Performance — cuando las cosas se ponen lentas 🚀

React re-renderiza cuando cambia el estado o las props. A veces eso es demasiado.

```jsx
import { memo, useCallback, useMemo } from "react";

// memo — evita re-render si las props no cambiaron
const ItemLista = memo(function ItemLista({ item, onEliminar }) {
  console.log("Render:", item.nombre);
  return (
    <div>
      {item.nombre}
      <button onClick={() => onEliminar(item.id)}>Eliminar</button>
    </div>
  );
});

function App() {
  const [items, setItems] = useState(listaInicial);
  const [filtro, setFiltro] = useState("");

  // useCallback — la función no se recrea en cada render
  const handleEliminar = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  // useMemo — el cálculo solo corre cuando cambia `items` o `filtro`
  const itemsFiltrados = useMemo(
    () => items.filter((i) => i.nombre.includes(filtro)),
    [items, filtro],
  );

  return (
    <>
      <input onChange={(e) => setFiltro(e.target.value)} />
      {itemsFiltrados.map((item) => (
        <ItemLista key={item.id} item={item} onEliminar={handleEliminar} />
      ))}
    </>
  );
}
```

**Advertencia:** no optimices antes de tener un problema real. `memo`, `useCallback` y `useMemo` tienen un costo propio. Mide primero.

**Meta de la semana:** identificar re-renders innecesarios con React DevTools y eliminar uno real.

---

## SEMANA 11: Formularios avanzados con React Hook Form 📝

Los formularios controlados manuales escalan mal. React Hook Form los hace serios.

```jsx
import { useForm } from "react-hook-form";

function FormularioRegistro() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await enviarFormulario(data); // tu función de envío
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: "El email es obligatorio",
          pattern: { value: /^\S+@\S+$/, message: "Email inválido" },
        })}
        placeholder="Email"
      />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <input
        type="password"
        {...register("password", {
          required: "La contraseña es obligatoria",
          minLength: { value: 8, message: "Mínimo 8 caracteres" },
        })}
        placeholder="Contraseña"
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Registrarse"}
      </button>
    </form>
  );
}
```

**Meta de la semana:** formulario de login y registro con validación completa.

---

## SEMANA 12: Proyecto final — todo junto 🏁

No hay mejor aprendizaje que construir algo real que uses o que muestre tus skills. Mis candidatos:

- **App de notas** con CRUD completo, persistencia en localStorage, filtros y búsqueda
- **Dashboard de clima** consumiendo una API real (OpenWeatherMap), varias ciudades, gráficas
- **Mini e-commerce** con carrito, filtros por categoría, y checkout simulado

**Checklist mínimo del proyecto:**

- [ ] Al menos 8 componentes distintos
- [ ] Estado global con Context
- [ ] Al menos 2 custom hooks
- [ ] React Router con mínimo 3 rutas
- [ ] Consumo de al menos una API externa
- [ ] Manejo de estados: cargando, error, vacío
- [ ] Desplegado en Vercel o Netlify

---

## Lo que todavía tengo pendiente

- [ ] Zustand o Redux Toolkit para estado más serio
- [ ] TanStack Query para manejo avanzado de datos del servidor
- [ ] Testing con Vitest y React Testing Library
- [ ] Next.js — SSR, SSG, y el app router
- [ ] Animaciones con Framer Motion

---

## Recursos que realmente usé

- **React Docs (react.dev)** — la documentación oficial nueva es excepcional
- **Josh W. Comeau** — entiende React a un nivel diferente
- **Theo (t3.gg)** — opiniones fuertes, aprendo cuestionándolas
- **Kent C. Dodds** — todo sobre testing y patrones avanzados

---

Doce semanas. Un componente a la vez. El objetivo no es saber todo React — es saber pensar en React. ⚛️
