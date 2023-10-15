// auth.js
 import axios from 'axios';
export function getToken() {
    return localStorage.getItem('jwt_token');
  }
  
  export function makeAuthenticatedRequest(url, method = 'get', data = null) {
    const token = getToken();
    if (!token) {
      // Gérer l'absence de token (déconnexion, expiration, etc.)
      return Promise.reject(new Error('Token absent ou expiré'));
    }
  
    // Inclure le token dans les en-têtes de la demande
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    if (method === 'get') {
      return axios.get(url, { headers });
    } else if (method === 'post') {
      return axios.post(url, data, { headers });
    }
   
  }
  