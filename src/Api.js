const API_URL = "https://microservicio-libros.onrender.com/api/LibroMaterial";
const API_AUTORES = "https://www.posterik.somee.com/api/Autor";
//https://microservicio-libros.onrender.com/api/LibroMaterial
//LIBROS:
  


export async function obtenerLibros() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Error al obtener libros: ${res.statusText}`);
  return res.json();
}

export async function obtenerLibroPorId(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error(`Error al obtener libro ${id}: ${res.statusText}`);
  return res.json();
}

export async function crearLibro(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Error al crear libro: ${res.statusText}`);
  return res.json(); // Asumo que la API devuelve el libro creado
}

export async function actualizarLibro(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Error al actualizar libro: ${res.statusText}`);
  return res.json(); // Asumo que la API devuelve el libro actualizado
}

export async function eliminarLibro(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Error al eliminar libro: ${res.statusText}`);
  return true; // O puedes devolver algo más si la API responde
}

//AUTOR:
export async function obtenerAutores() {
  const res = await fetch(API_AUTORES);
  if (!res.ok) throw new Error(`Error al obtener autores: ${res.statusText}`);
  return res.json();
}

export async function obtenerAutorPorId(id) {
  const res = await fetch(`${API_AUTORES}/${id}`);
  if (!res.ok) throw new Error(`Error al obtener autor ${id}: ${res.statusText}`);
  return res.json();
}

export async function crearAutor(data) {
  const res = await fetch(API_AUTORES, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Error al crear autor: ${res.statusText}`);
  return res.json();
}

export const actualizarAutor = async (id, datosAutor) => {
  // Asegura que el id y el AutorGuid en el cuerpo coinciden
  if (!datosAutor.autorGuid) {
    datosAutor.autorGuid = id;
  }

  const resp = await fetch(`${API_AUTORES}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosAutor),
  });
  if (!resp.ok) throw new Error("Error al actualizar autor");
  return resp.json();
};

// Agrega esta función en Api.js
export const buscarAutorPorNombre = async (nombre) => {
  const response = await fetch(`${API_AUTORES}/${nombre}`);
  if (!response.ok) {
    throw new Error("Error al buscar autor por nombre");
  }
  return await response.json();
};



export async function eliminarAutor(id) {
  const res = await fetch(`${API_AUTORES}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Error al eliminar autor: ${res.statusText}`);
  return true;
}
