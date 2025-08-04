import { fetchWithAuth } from './utils/fetchWithAuth.js';

const API_URL = 'https://eriklibreria.somee.com/api/LibroMaterial';
const API_AUTORES = 'https://erikrem.somee.com/api/Autor';

// 📚 LIBROS

export async function obtenerLibros() {
  const res = await fetchWithAuth(API_URL);
  if (!res.ok) throw new Error(`Error al obtener libros: ${res.statusText}`);
  return res.json();
}

export async function obtenerLibroPorId(id) {
  const res = await fetchWithAuth(`${API_URL}/${id}`);
  if (!res.ok) throw new Error(`Error al obtener libro ${id}: ${res.statusText}`);
  return res.json();
}

export async function crearLibro(data) {
  const res = await fetchWithAuth(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Error al crear libro: ${res.statusText}`);
  return res.json();
}

export async function actualizarLibro(id, data) {
  const res = await fetchWithAuth(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Error al actualizar libro: ${res.statusText}`);
  return res.json();
}

export async function eliminarLibro(id) {
  const res = await fetchWithAuth(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Error al eliminar libro: ${res.statusText}`);
  return true;
}

// 👤 AUTORES

export async function obtenerAutores() {
  const res = await fetchWithAuth(API_AUTORES);
  if (!res.ok) throw new Error(`Error al obtener autores: ${res.statusText}`);
  return res.json();
}

export async function obtenerAutorPorId(id) {
  const res = await fetchWithAuth(`${API_AUTORES}/${id}`);
  if (!res.ok) throw new Error(`Error al obtener autor ${id}: ${res.statusText}`);
  return res.json();
}

export async function crearAutor(data) {
  const res = await fetchWithAuth(API_AUTORES, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Error al crear autor: ${res.statusText}`);
  return res.json();
}

export const actualizarAutor = async (id, datosAutor) => {
  if (!datosAutor.autorGuid) {
    datosAutor.autorGuid = id;
  }

  const res = await fetchWithAuth(`${API_AUTORES}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosAutor),
  });
  if (!res.ok) throw new Error('Error al actualizar autor');
  return res.json();
};

export const buscarAutorPorNombre = async (nombre) => {
  const res = await fetchWithAuth(`${API_AUTORES}/${nombre}`);
  if (!res.ok) throw new Error('Error al buscar autor por nombre');
  return res.json();
};

export async function eliminarAutor(id) {
  const res = await fetchWithAuth(`${API_AUTORES}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Error al eliminar autor: ${res.statusText}`);
  return true;
}
