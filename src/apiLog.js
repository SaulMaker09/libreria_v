const API_BASE = 'https://erickv1.somee.com/'; // Cambia esta URL por la real

// Función para refrescar el token automáticamente
const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No hay refresh token');

  const response = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) throw new Error('Error al refrescar token');

  const data = await response.json(); // { token, refreshToken }
  localStorage.setItem('token', data.token);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data.token;
};

// Función para usar el token actual y refrescar si expira
export const fetchWithAuth = async (url, options = {}, retry = true) => {
  let token = localStorage.getItem('token');

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 && retry) {
      // Token expirado, intenta refrescar
      token = await refreshToken();

      const retryHeaders = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      return await fetch(url, { ...options, headers: retryHeaders });
    }

    return response;
  } catch (err) {
    console.error('Error en fetchWithAuth:', err);
    throw err;
  }
};

// ============================
// Métodos para autenticación
// ============================

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error('Login fallido');

  return await response.json(); // { token, refreshToken }
};

export const logout = async () => {
  const token = localStorage.getItem('token');

  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.warn('Error cerrando sesión:', e);
  }

  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

export const forgotPassword = async (email) => {
  const response = await fetch(`${API_BASE}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) throw new Error('Error al enviar solicitud');

  return await response.json();
};

export const register = async (name, email, password) => {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) throw new Error('Registro fallido');

  return await response.json();
};
