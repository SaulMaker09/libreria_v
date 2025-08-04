// utils/fetchWithAuth.js
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  const response = await fetch('https://erickv1.somee.com/api/User/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  });

  if (!response.ok) return null;

  const data = await response.json();
  localStorage.setItem('token', data.token);
  // Si también llega un nuevo refresh token, descomenta:
  // localStorage.setItem('refreshToken', data.refreshToken);
  return data.token;
};

export const fetchWithAuth = async (url, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...(options.headers || {})
  };

  let response = await fetch(url, { ...options, headers });

  // Si token expiró, intenta refrescar y reintentar
  if (response.status === 401 || response.status === 403) {
    const newToken = await refreshToken();
    if (newToken) {
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${newToken}`
      };
      response = await fetch(url, { ...options, headers: retryHeaders });
    } else {
      throw new Error('Token expirado. Inicia sesión de nuevo.');
    }
  }

  return response;
};
