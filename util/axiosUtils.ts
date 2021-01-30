import { RefreshTokenUrl } from '../api/account/auth';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
 
export const handleAuthenticationTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('refreshToken', refreshToken);
    setAuthorizationToken(accessToken);
}
  
export const setAuthorizationToken = (token: string | null) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.defaults.headers.common['Content-Type'] = 'application/json';
    } else {
      delete axios.defaults.headers.common['Authorization'];
      axios.defaults.headers.common['Content-Type'] = 'application/json';
    }
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = "http://localhost:3000";
  };
  