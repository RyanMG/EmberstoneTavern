import axios, { AxiosResponse } from 'axios';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import useStorage from '@hooks/useStorage';

const TOKEN_KEY = 'auth_token';
const API_URL = 'http://localhost:8000';

const AuthContext = createContext<{
  authState: {
    token: string | null;
    authenticated: boolean | null;
  };
  register: (email: string, password: string) => Promise<AxiosResponse<any, any> | { error: boolean; errorMessage: string; }>;
  login: (email: string, password: string) => Promise<AxiosResponse<any, any> | { error: boolean; errorMessage: string; }>;
  logout: () => Promise<void>;
}>({
  authState: {
    token: null,
    authenticated: null,
  },
  register: async (email, password) => {
    return {
      error: true,
      errorMessage: 'Registration not implemented'
    }
  },
  login: async (email, password) => {
    return {
      error: true,
      errorMessage: 'Login not implemented'
    }
  },
  logout: async () => {}
});

export default function AuthProvider({ children }: { children: ReactNode }) {

  const { getStorageItem, setStorageItem, removeStorageItem } = useStorage();

  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  /**
   * Register a user
   */
  const register = async (email: string, password: string) => {
    try {
      const resp = await axios.post(`${API_URL}/register`, {
        email,
        password
      });

      if (resp.status === 200) {
        login(email, password);
      }

      return resp;

    } catch (error) {
      return {
        error: true,
        errorMessage: (error as Error).message
      }
    }
  }
  /**
   * Set the auth token in state and for axios use
   */
  const setTokenForSession = (token: string) => {
    setAuthState({
      token: token,
      authenticated: true
    })

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Log the user in by setting their auth token
   */
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth`, {
        email,
        password
      })

      setTokenForSession(response.data.token);
      await setStorageItem(TOKEN_KEY, response.data.token);

      return response;

    } catch (error) {
      return {
        error: true,
        errorMessage: (error as Error).message
      }
    }
  }
  /**
   * Log the user out by removing their auth token
   */
  const logout = async () => {
    await removeStorageItem(TOKEN_KEY);
    axios.defaults.headers.common['Authorization'] = '';
    setAuthState({
      token: null,
      authenticated: false
    })
  }

  /**
   * Initial
   */
  useEffect(() => {
    (async () => {
      const token = await getStorageItem(TOKEN_KEY) as string | null;

      if (token) {
        setTokenForSession(token);
      }
    })()
  })

  return (
    <AuthContext.Provider value={{
      authState,
      register,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
