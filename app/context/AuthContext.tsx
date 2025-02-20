import axios, { AxiosResponse } from 'axios';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import useStorage from '@hooks/useStorage';

const TOKEN_KEY = 'auth_token';

const AuthContext = createContext<{
  authState: {
    token: string | null;
    authenticated: boolean | null;
  };
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<{success: boolean, message: string}>;
  login: (email: string, password: string) => Promise<{success: boolean, message: string}>;
  logout: () => Promise<void>;
  loading: boolean;
}>({
  authState: {
    token: null,
    authenticated: null,
  },
  register: async (firstName: string, lastName: string, email: string, password: string) => {
    return {
      success: false,
      message: 'Registration not implemented'
    }
  },
  login: async (email: string, password: string) => {
    return {
      success: false,
      message: 'Login not implemented'
    }
  },
  logout: async () => {},
  loading: true
});

export default function AuthProvider({ children }: { children: ReactNode }) {

  const { getStorageItem, setStorageItem, removeStorageItem } = useStorage();
  const [loading, setLoading] = useState<boolean>(true);

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
  const register = async (firstName: string, lastName: string, email: string, password: string): Promise<{success: boolean, message: string}> => {
    try {
      const resp = await axios.post(`${process.env.EXPO_PUBLIC_API_ROOT_URL}/auth/register`, {
        firstName,
        lastName,
        email,
        password
      });

      if (resp.status === 200) {
        login(email, password);
        return {
          success: true,
          message: "User registered successfully"
        }
      }

      return {
        success: false,
        message: "Invalid username or password"
      }

    } catch (error) {
      return {
        success: false,
        message: (error as Error).message
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
  const login = async (email: string, password: string): Promise<{success: boolean, message: string}> => {
    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_ROOT_URL}/auth/login`, {
        email,
        password
      })

      if (response.data.success){
        setTokenForSession(response.data.message);
        await setStorageItem(TOKEN_KEY, response.data.message);
        return {
          success: true,
          message: "User logged in successfully"
        };
      }

      return {
        success: false,
        message: response.data.message
      };

    } catch (error) {
      return {
        success: false,
        message: (error as Error).message
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
      console.log('checking token via useEffect');
      const token = await getStorageItem(TOKEN_KEY) as string | null;

      if (token) {
        setTokenForSession(token);
      }

      setLoading(false);
    })()
  }, [])

  return (
    <AuthContext.Provider value={{
      authState,
      register,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
