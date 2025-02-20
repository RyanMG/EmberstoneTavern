import axios from 'axios';
import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import useStorage from '@hooks/useStorage';
import { useRouter } from 'expo-router';
import {
  TPerson
} from '@types/person';

const TOKEN_KEY = 'auth_token';

const AuthContext = createContext<{
  authState: {
    token: string | null;
    authenticated: boolean | null;
  };
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<{success: boolean, message: string}>;
  login: (email: string, password: string) => Promise<{success: boolean, message: string}>;
  logout: () => Promise<void>;
  getActiveUser: () => TPerson | null;
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
  getActiveUser: () => null,
  loading: true
});

export default function AuthProvider({ children }: { children: ReactNode }) {

  const { getStorageItem, setStorageItem, removeStorageItem } = useStorage();
  const [loading, setLoading] = useState<boolean>(true);
  const activeUser = useRef<TPerson | null>(null);
  const router = useRouter();

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
    axios.interceptors.response.use(response => {
      return response;
    }, (error) => {
      if (401 === error.response.status) {
        logout();
        // @TODO notification for user
        router.push('/(auth)/login');
      } else {
          return Promise.reject(error);
      }
    });
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
   * Fetch data for the active user
   */
  const fetchActiveUser = async (token: string) => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_ROOT_URL}/api/person`);

      if (response.status === 200) {
        activeUser.current = response.data;
      }

    } catch (error) {
      console.error("TODO active user fetch error");
    }
  }

  const getActiveUser = () => activeUser.current;

  /**
   * Initial
   */
  useEffect(() => {
    (async () => {
      const token = await getStorageItem(TOKEN_KEY) as string | null;

      if (token) {
        setTokenForSession(token);
        await fetchActiveUser(token);
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
      getActiveUser,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
