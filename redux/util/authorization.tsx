import axios from 'axios';

export interface AxiosCall {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const setAuthorizationToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
  } else {
    delete axios.defaults.headers.common['Authorization'];
    axios.defaults.headers.common['Content-Type'] = 'application/json';
  }
};
